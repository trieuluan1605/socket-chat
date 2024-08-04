import { Request, Response } from "express";
import messageService from "../services/messageService";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { roomId, content } = req.body;
    const userId = req.user?.id; // Assume user ID is added to the request by authentication middleware
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const message = await messageService.sendMessage(roomId, userId, content);
    res.status(201).json({ msg: "Message sent successfully", message });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const messages = await messageService.listMessages(roomId);
    res.status(200).json(messages);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
