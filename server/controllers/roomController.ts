import { Request, Response } from "express";
import roomService from "../services/roomService";

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const room = await roomService.addRoom(name);
    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await roomService.listRooms();
    res.status(200).json(rooms);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
