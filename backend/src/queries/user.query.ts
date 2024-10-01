import pool from "../config/db";
import type { RegisterUserHashedPass, ResRegisterUser, SomeUserColumns, User, UserLocationCamel } from "../types/user.type";
import { convertSnakeToCameCase } from "../utils/converters";


function sanitizeTableColumns(colsToReturn:SomeUserColumns):string|'id' {
  if (colsToReturn.length === 0) return 'id';
  const snakeWithCamelArr = colsToReturn.map((col) => {
    if (!col) return '';
    const colCamel = convertSnakeToCameCase(col);
    return `${col} AS "${colCamel}"`;
  })

  const colsString = snakeWithCamelArr.join(', ');
  return colsString as keyof User;
};

async function createUser(user: RegisterUserHashedPass):Promise<ResRegisterUser> {
  const { fullname, username, email, password, authMethod } = user;

  const query = `
    INSERT INTO users(fullname, username, email, password, auth_method)
    VALUES($1, $2, $3, $4, $5)
    RETURNING id, fullname, username, email, auth_method AS authMethod
  `;

  const {rows: users} = await pool.query(
    query,
    [fullname, username, email, password, authMethod]
  );

  return users[0];

};

// TODO: remove getUserByEmail() and use getUserById()
// In controller: use email to get Id then use id to get user
async function getUserByEmail(colsToReturn:SomeUserColumns, email: string):Promise<User> {

  const tableColumns = sanitizeTableColumns(colsToReturn);

  const query = `
    SELECT ${tableColumns} FROM users
    WHERE lower(email) = lower($1)
    LIMIT 1;
  `;
  const { rows: users } = await pool.query(
    query,
    [email]
  );

  return users[0];

};

async function getUserById(reqUserId: string, colsToReturn: SomeUserColumns)
 : Promise<SomeUserColumns|UserLocationCamel>
{

  const tableColumns = sanitizeTableColumns(colsToReturn);

  const query = `
    SELECT ${tableColumns} FROM users
    WHERE id = $1
    LIMIT 1;
  `;

  const { rows: users } = await pool.query(
    query,
    [reqUserId]
  );

  return users[0];
};

// TODO: write this
// RegisterUserHashedPass
async function updateUserDetails(reqUserId: string, reqBody: UserLocationCamel) {
  console.log(`reqUserId: `, reqUserId);
  const {
    houseNoAndStreetName, city, state, country, zipCode, phoneNumber
  }: UserLocationCamel = reqBody;

  const query = `
    UPDATE users
    SET
      house_no_and_street_name=$2, city=$3, state=$4, country=$5,
      zip_code=$6, phone_number=$7
    WHERE id=$1
    RETURNING house_no_and_street_name, city, state, country, zip_code, phone_number;
  `;

  const { rows: users } = await pool.query(
    query,
    [reqUserId, houseNoAndStreetName, city, state, country, zipCode, phoneNumber]
  );

  return users[0];

};


export default {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserDetails
};
