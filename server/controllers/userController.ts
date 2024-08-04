import { Request, Response } from "express";
import userService from "../services/userService";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assume user ID is added to the request by authentication middleware
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(404).json({ error: "An unknown error occurred" });
    }
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const updatedUser = await userService.updateUser(userId, req.body);
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const deleteUserAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await userService.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(404).json({ error: "An unknown error occurred" });
    }
  }
};
