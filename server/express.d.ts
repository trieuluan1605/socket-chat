// express.d.ts
import { JwtPayload } from "jsonwebtoken"; // Import if you're using a specific payload type

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; username: string } | JwtPayload; // Adjust the type based on your JWT payload
    }
  }
}
