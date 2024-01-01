import pool from "../config/db";
import type { RegisterUserHashedPass } from "../types/user.type";


async function createUser(user: RegisterUserHashedPass) {
  const { fullname, username, email, password } = user;

  const query = `
    INSERT INTO users(fullname, username, email, password)
    VALUES($1, $2, $3, $4)
    returning id, fullname, username, email`;

  const {rows: users} = await pool.query(
    query,
    [fullname, username, email, password]
  );

  return users[0];

};


export default {
  createUser
};
