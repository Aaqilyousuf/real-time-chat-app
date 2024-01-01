import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = async (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // if (!currentUser && !user) {
    //   console.log("Crrent user and user are not defined");
    // } else {
    //   console.log("Its defined: ", currentUser, "\n", user);
    // }
    // Check whether group (chats in firestore) exists; if not, create

    const combinedId =
      currentUser.uid > user.uid
        ? user.uid + currentUser.uid
        : currentUser.uid + user.uid;

    try {
      const chatsDocRef = doc(db, "chats", combinedId);
      const chatsDoc = await getDoc(chatsDocRef);

      if (!chatsDoc.exists()) {
        // Create Chats only if it doesn't exist
        await setDoc(chatsDocRef, { message: [] });
      }

      // Create userChats
      const currentUserInfo = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      const UserInfo = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      };
      console.log(currentUserInfo);
      console.log(UserInfo);

      const currentUserChatsRef = doc(db, "userChats", currentUser.uid);
      const userChatsRef = doc(db, "userChats", user.uid);
      // currentUserChatsRef
      //   ? console.log("It exist")
      //   : console.log("Its not exist");
      // userChatsRef ? console.log("It exist") : console.log("Its not exist");

      await updateDoc(currentUserChatsRef, {
        [combinedId]: {
          userInfo: currentUserInfo,
          date: serverTimestamp(),
        },
        // new: {
        //   userInfo: currentUserInfo,
        //   uid: user.uid,
        //   date: serverTimestamp(),
        // },
      });

      await updateDoc(userChatsRef, {
        [combinedId]: {
          userInfo: UserInfo,
          date: serverTimestamp(),
        },
        // new: {
        //   userInfo: UserInfo,
        //   uid: currentUser.uid,
        //   date: serverTimestamp(),
        // },
      });
    } catch (err) {
      console.log("ERROR: ", err);
    }
    setUser(null);
    setUserName("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      {err && <p>User Not Found!</p>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="userPhoto" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
            <p>Hello</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
