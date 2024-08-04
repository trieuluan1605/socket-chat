import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const register = async (username: string, password: string) => {
  const existingUser = await User.findByUsername(username);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create(username, hashedPassword);
};

const login = async (
  username: string,
  password: string
): Promise<{ user: any; token: string }> => {
  const user = await User.findByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  return { user, token };
};

export default { register, login };
