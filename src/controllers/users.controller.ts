import { Request, Response, NextFunction } from "express";
import * as userService from "../services/users.service";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const newUser = await userService.register(username, password);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
