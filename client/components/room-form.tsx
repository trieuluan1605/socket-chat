import React, { useState, FormEvent } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import io from "socket.io-client";

// Make sure the socket connection is accessible
const socket = io(process.env.NEXT_PUBLIC_SERVER_API_POINT!);

interface RoomFormProps {
  onRoomChange: (room: Room, messages: Message[]) => void;
}

interface Message {
  userId: string;
  name: string;
  username: string;
  content: string;
  createTime: number;
}

interface Room {
  id: string;
  name: string;
}

const RoomForm: React.FC<RoomFormProps> = ({ onRoomChange }) => {
  const [room, setRoom] = useState<Room>({ id: "", name: "" });

  const handleCreateRoom = (event: FormEvent) => {
    event.preventDefault();
    if (room.name.trim()) {
      socket.emit("create room", room.name);
      socket.on("room created", (room) => {
        onRoomChange(room, []);
      });
    }
  };

  const handleJoinRoom = (event: FormEvent) => {
    event.preventDefault();
    if (room.name.trim()) {
      socket.emit("join room", room.name);
      socket.on("room joined", (room, messages) => {
        if (room) return onRoomChange(room, messages);
        alert("Room id is not found!!!");
      });
    }
  };

  return (
    <Card style={{ maxWidth: "400px", padding: "20px", margin: "20px auto" }}>
      <p style={{ marginBottom: "10px" }}>Enter Room Name</p>
      <form onSubmit={handleCreateRoom}>
        <Input
          fullWidth
          required
          autoComplete="off"
          color="primary"
          placeholder="Type room name..."
          size="md"
          value={room.name}
          onChange={(e) => setRoom({ id: "", name: e.target.value })}
        />
        <Button className="mt-4" color="primary" onClick={handleCreateRoom}>
          Create Room
        </Button>
        <Button
          className="mt-4 ml-2"
          color="secondary"
          onClick={handleJoinRoom}
        >
          Join Room
        </Button>
      </form>
    </Card>
  );
};

export default RoomForm;
