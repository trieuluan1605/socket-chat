import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import io from "socket.io-client";
import {
  Input,
  Button,
  Card,
  Listbox,
  ListboxItem,
  Divider,
  Link,
} from "@nextui-org/react";

// Ensure the socket connection is initialized
const socket = io(process.env.NEXT_PUBLIC_SERVER_API_POINT!);

interface Message {
  name: string;
  username: string;
  content: string;
  createTime: number;
}

interface ChatFormProps {
  user: {
    id: string;
    name: string;
    username: string;
  };
  room: {
    id: string;
    name: string;
  };
  oldMessages: Message[];
}

const ChatForm: React.FC<ChatFormProps> = ({ user, room, oldMessages }) => {
  const [content, setContent] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(oldMessages);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Listen for chat history of the room
    socket.emit("join room", room.id);
    setMessages(oldMessages);

    // Listen for new chat messages in the room
    socket.on("chat message", (data: Message) => {
      setMessages((prevMessages) => [data, ...prevMessages]);
      if (audioRef.current) {
        audioRef.current.play();
      }
    });

    // Clean up socket events on component unmount
    return () => {
      socket.off("chat history");
      socket.off("chat message");
    };
  }, [room]);

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    if (content.trim()) {
      const data = { room, user, content };

      socket.emit("chat message", data);
      setContent("");
    }
  };

  return (
    <Card style={{ width: "400px", padding: "20px", margin: "20px auto" }}>
      <p style={{ marginBottom: "10px" }}>
        [{room.name}#{room.id}] Send a Message
      </p>
      <form onSubmit={handleSendMessage}>
        <Input
          fullWidth
          required
          autoComplete="off"
          color="primary"
          placeholder="Type your message..."
          size="md"
          value={content}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContent(e.target.value)
          }
        />
        <Button className="mt-4" color="primary" type="submit">
          Send
        </Button>
      </form>

      <Divider className="my-5" />
      <h4 style={{ marginBottom: "10px" }}>Chat History</h4>
      <Listbox label="Message list">
        {messages.map((msg, index) => (
          <ListboxItem key={index} textValue="Message">
            <b>
              <Link href={`/users/${msg.username}`}>{msg.name}:</Link>
            </b>{" "}
            <span className="whitespace-normal">{msg.content}</span>
          </ListboxItem>
        ))}
      </Listbox>
      <audio ref={audioRef}>
        <source src="/notification.mp3" type="audio/mp3" />
        <track kind="captions" />
      </audio>
    </Card>
  );
};

export default ChatForm;
