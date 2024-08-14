"use client";

import { initialFormServerActionData } from "@/utils";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserState({ children }) {
  const [showPopup, setShowPopup] = useState(false);
  const [addNewuserFormData, setAddNewuserFormData] = useState(
    initialFormServerActionData
  );
  const [editebleId, setEditebleId] = useState(null);

  return (
    <UserContext.Provider
      value={{
        editebleId,
        setEditebleId,
        showPopup,
        setShowPopup,
        addNewuserFormData,
        setAddNewuserFormData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
