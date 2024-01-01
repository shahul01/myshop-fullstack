import pool from "../config/db";
import type { RegisterUserHashedPass } from "../types/user.type";


async function createUser(user: RegisterUserHashedPass) {
  const { fullname, username, email, password, authMethod } = user;

  const query = `
    INSERT INTO users(fullname, username, email, password, auth_method)
    VALUES($1, $2, $3, $4, $5)
    returning id, fullname, username, email, auth_method`;

  const {rows: users} = await pool.query(
    query,
    [fullname, username, email, password, authMethod]
  );

  return users[0];

};


export default {
  createUser
};
