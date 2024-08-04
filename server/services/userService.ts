import bcrypt from "bcryptjs";
import User from "../models/User";

const getUserById = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

const updateUser = async (id: string, updateData: Partial<User>) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  // Assume we can update username and password for simplicity
  const { username, password } = updateData;

  if (username) {
    user.username = username;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  return user.save(); // This assumes you have a save method to update the database
};

const deleteUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  return user.delete(); // This assumes you have a delete method to remove the user from the database
};

export default { getUserById, updateUser, deleteUser };
