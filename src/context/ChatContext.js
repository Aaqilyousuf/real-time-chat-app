import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth } from "../config/firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext({});
export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };
  try {
    const chatReducer = (state, action) => {
      console.log(currentUser.uid);

      switch (action.type) {
        case "CHANGE_USER":
          return {
            user: action.payload,
            chatId:
              currentUser.uid > action.payload.uid
                ? action.payload.uid + currentUser.uid
                : currentUser.uid + action.payload.uid,
          };
        default:
          return state;
      }
    };
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    return (
      <ChatContext.Provider value={{ data: state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  } catch (err) {
    console.log(err);
  }
};
