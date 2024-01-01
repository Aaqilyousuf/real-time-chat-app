import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="logo">Cap Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="userImg"></img>
        <span>{currentUser.displayName}</span>
        <button onClick={async () => await signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
