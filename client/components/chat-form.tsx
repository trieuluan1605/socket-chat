import React, {
  useState,
  FormEvent,
  useEffect,
  useRef,
  ChangeEvent,
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

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_API_POINT}`);

const ChatForm: React.FC<{
  user: {
    id: number;
    name: string;
    username: string;
  };
}> = ({ user }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    {
      userId: string;
      name: string;
      username: string;
      message: string;
      createTime: number;
      updateTime: number;
    }[]
  >([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    socket.on(
      "chat history",
      (
        histories: {
          userId: string;
          name: string;
          username: string;
          message: string;
          createTime: number;
          updateTime: number;
        }[],
      ) => {
        setMessages(histories);
      },
    );

    socket.on("chat message", ({ user, message, createTime, updateTime }) => {
      setMessages((prevMessages) => [
        {
          userId: user.id,
          name: user.name,
          username: user.username,
          message,
          createTime,
          updateTime,
        },
        ...prevMessages,
      ]);
      if (audioRef.current) {
        audioRef.current.play();
      }
    });

    return () => {
      socket.off("chat history");
      socket.off("chat message");
    };
  }, []);

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    if (message.trim()) {
      const data = { user, message };

      socket.emit("chat message", data);
      setMessage("");
    }
  };

  return (
    <Card style={{ width: "400px", padding: "20px", margin: "20px auto" }}>
      <p style={{ marginBottom: "10px" }}>Send a Message</p>
      <form onSubmit={handleSendMessage}>
        <Input
          fullWidth
          required
          autoComplete="off"
          color="primary"
          placeholder="Type your message..."
          size="md"
          value={message}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />
        <Button className="mt-4" color="primary" onClick={handleSendMessage}>
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
            <span className="whitespace-normal">{msg.message}</span>
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
