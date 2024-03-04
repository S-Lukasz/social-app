"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ActiveUser from "./ActiveUser";
import { useContext } from "react";
import { UserContext } from "./ContextWrapper";

export default function UserList() {
  const { users } = useContext(UserContext);

  return (
    <div className="w-1/6 bg-my-very-dark fixed top-0 bottom-0 right-0">
      <div className=" text-center w-full text-xl mt-4 ">
        Users
        <div className="border-b border-my-text-dark mx-4 mt-2"></div>
      </div>
      <div className="flex flex-col my-1 gap-4 p-4">
        <div className="flex items-center bg-my-light p-4 rounded-md w-full text-base px-4 py-1 relative">
          <input
            // onInput={(e) => onMinPriceChanged(e)}
            className="bg-my-light rounded-md ml-8"
            placeholder="search for users.."
            type="text"
          />
          <FontAwesomeIcon
            className="text-my-text-light absolute left-4"
            icon={faMagnifyingGlass}
          />
        </div>

        {users.map((user, i) => (
          <ActiveUser key={"active_user_key_" + i} user={user}></ActiveUser>
        ))}
      </div>
    </div>
  );
}
