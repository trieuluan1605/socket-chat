"use client";

import io from "socket.io-client";
import { useState } from "react";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { Button } from "@nextui-org/button";

import { title, subtitle } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_API_POINT}`);

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<string[]>([]);

  socket.on("chat message", function (msg) {
    setMessageList([msg, ...messageList]);
  });

  function submit(e: any) {
    e.preventDefault();
    if (message) {
      socket.emit("chat message", message);
      setMessage("");
    }
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ color: "violet" })}>Socket </h1>
        <h1 className={title()}>Chat</h1>
      </div>

      <form onSubmit={submit}>
        <Input
          type="text"
          label="Message"
          className="w-[300px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="mt-4" onClick={submit}>
          Enter
        </Button>
        <Button className="mt-4 float-right" onClick={() => setMessageList([])}>
          Clean messages
        </Button>
      </form>

      <div>
        {messageList.map((msg, index) => (
          <Card key={index} className="mt-4" radius="sm">
            <CardBody
              className={`text-sm px-6 py-2 w-[300px] ${index % 2 && "bg-blue-100"}`}
            >
              <p>
                <b>Name:</b> {msg}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
