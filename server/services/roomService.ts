import Room from "../models/Room";

const addRoom = async (name: string) => {
  return Room.create(name);
};

const listRooms = async () => {
  return Room.getAll();
};

export default { addRoom, listRooms };
