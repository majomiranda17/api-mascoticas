import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secretito";

export const generateToken = (username: string) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
};