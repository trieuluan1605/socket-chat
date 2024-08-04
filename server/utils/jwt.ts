import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = verified as { id: string }; // Assuming the payload contains the user ID
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export const tokenDecoded = (token: string) => {
  const verified = jwt.verify(token, process.env.JWT_SECRET!);
  return verified as { id: string };
};
