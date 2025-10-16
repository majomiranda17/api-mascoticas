import * as userModel from "../models/users.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const register = async (username: string, password: string) => {
  const existingUser = await userModel.findByUsername(username);
  if (existingUser) throw new Error("Usuario ya existe");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({ username, password: hashedPassword });
  return newUser;
};

export const login = async (username: string, password: string) => {
  const user = await userModel.findByUsername(username);
  if (!user) throw new Error("Usuario no encontrado");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Contraseña incorrecta");

  const token = generateToken(user.username);
  return token;
};
