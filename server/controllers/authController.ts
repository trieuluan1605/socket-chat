import { Request, Response } from "express";
import authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await authService.register(username, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    // Type narrowing using instanceof Error
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await authService.login(username, password);
    res.status(200).json({
      message: "Login successful",
      user: { token, ...user },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(401).json({ error: "An unknown error occurred" });
    }
  }
};
