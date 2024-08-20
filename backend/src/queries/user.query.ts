import pool from "../config/db";
import type { RegisterUserHashedPass, ResRegisterUser, SomeUserColumns, User } from "../types/user.type";


async function createUser(user: RegisterUserHashedPass):Promise<ResRegisterUser> {
  const { fullname, username, email, password, authMethod } = user;

  const query = `
    INSERT INTO users(fullname, username, email, password, auth_method)
    VALUES($1, $2, $3, $4, $5)
    returning id, fullname, username, email, auth_method AS authMethod
  `;

  const {rows: users} = await pool.query(
    query,
    [fullname, username, email, password, authMethod]
  );

  return users[0];

};

async function getUserByEmail(colsToReturn:SomeUserColumns, email: string):Promise<User> {

  function sanitizeTableColumns(colsToReturn:SomeUserColumns):string|'*' {
    if (colsToReturn.length === 0) return '*';
    return colsToReturn.join(',') as keyof User;
  };

  const tableColumns = sanitizeTableColumns(colsToReturn);

  const query = `
    SELECT ${tableColumns} FROM users
    WHERE lower(email) = lower($1)
    LIMIT 1
  `;
  const { rows: users } = await pool.query(
    query,
    [email]
  );

  return users[0];

};

// TODO: write this
// RegisterUserHashedPass
async function updateUserDetails(user: Record<string, string>) {
  return;

};


export default {
  createUser,
  getUserByEmail,
  updateUserDetails
};
