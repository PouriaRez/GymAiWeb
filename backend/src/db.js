import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export const createAccount = async (username, password) => {
  const select = `SELECT * FROM account
                    WHERE data->>'username' = $1;`;
  let values = [username];
  const { rows } = await pool.query(select, values);
  if (rows.length > 0) {
    return false;
  }
  const insert = `INSERT INTO account(data)
  VALUES(
    jsonb_build_object(
        'username', $1::text,
        'password', $2::text
        )
        );`;
  values = [username, password];
  await pool.query(insert, values);
  return true;
};

export const loginAccount = async (username, password) => {
  const select = `SELECT id, data->>'username' as username,
                  data->>'password' as password
                  FROM account
                  WHERE data->>'username' = $1;
                  `;
  const values = [username];
  const { rows } = await pool.query(select, values);

  if (rows.length <= 0) {
    return false;
  }

  const passCheck = await bcrypt.compare(password, rows[0].password);
  if (!passCheck) {
    return false;
  }
  return [rows[0].id, username];
};
