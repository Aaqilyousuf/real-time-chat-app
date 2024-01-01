import React, { useContext } from "react";
import { IoVideocam } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import Messages from "./Messages";
import Input from "./Input";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <IoVideocam className="icon" />
          <IoPersonAddSharp className="icon" />
          <HiDotsHorizontal className="icon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
