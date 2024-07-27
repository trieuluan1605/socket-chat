"use client";

import io from "socket.io-client";
import { useState } from "react";

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_API_POINT}`);

export default function Home() {
  const [msg, setMsg] = useState<string>("");
  const [msgList, setMsgList] = useState<string[]>([]);

  socket.on("chat message", function (msg) {
    setMsgList([...msgList, msg]);
  });

  function submit(e: any) {
    e.preventDefault();
    if (msg) {
      socket.emit("chat message", msg);
      setMsg("");
    }
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Socket Chat
          </p>
        </div>

        <div className="messages__history">
          {msgList.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </div>

        <form className="message_form">
          <input
            type="text"
            className="message_form__input"
            placeholder="Type a message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className="message_form__button" onClick={submit}>
            Enter
          </button>
        </form>
      </main>
    </>
  );
}
