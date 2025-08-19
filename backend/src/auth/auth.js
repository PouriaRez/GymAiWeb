import * as db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const result = await db.createAccount(username, hashedPass);
  if (!result) {
    return res.status(400).send();
  }

  res.status(201).send();
};

export const Login = async (req, res) => {};
