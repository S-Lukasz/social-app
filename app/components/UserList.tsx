"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ActiveUser from "./ActiveUser";
import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "./ContextWrapper";
import { User } from "../consts";

export default function UserList() {
  const { users, loggedUser } = useContext(UserContext);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [usersSearch, setUsersSearch] = useState("");

  function onSearchChanges(e: FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setUsersSearch(target.value);
  }

  useEffect(() => {
    const usersSearched =
      usersSearch === ""
        ? users
        : users.filter((user) => {
            if (
              (
                user.name.toLocaleLowerCase() +
                " " +
                user.surname.toLocaleLowerCase()
              ).includes(usersSearch)
            )
              return user;
          });
    setUsersList(usersSearched);
  }, [users, usersSearch]);

  return (
    <div className="w-1/6 bg-my-very-dark fixed top-0 bottom-0 right-0">
      <div className=" text-center w-full text-xl mt-12 ">
        <div className="border-b border-my-text-dark mx-4 mt-2"></div>
      </div>
      <div className="flex flex-col my-1 gap-4 p-4">
        <div className="flex items-center bg-my-light p-4 rounded-md w-full text-base px-4 py-1 relative">
          <input
            value={usersSearch}
            onInput={(e) => onSearchChanges(e)}
            className="bg-my-light rounded-md ml-8"
            placeholder="search for users.."
            type="text"
          />

          <FontAwesomeIcon
            className="text-my-text-light absolute left-4"
            icon={faMagnifyingGlass}
          />
        </div>
        {usersList
          .filter((user) => user.id !== loggedUser.id)
          .map((user, i) => (
            <ActiveUser key={"active_user_key_" + i} user={user}></ActiveUser>
          ))}
      </div>
    </div>
  );
}
