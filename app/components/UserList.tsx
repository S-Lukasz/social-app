"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ActiveUser from "./ActiveUser";
import { FormEvent, useContext, useEffect, useState } from "react";
import { NavContext, UserContext } from "./ContextWrapper";
import { User } from "../consts";

export default function UserList() {
  const { users, loggedUser } = useContext(UserContext);
  const [usersList, setUsersList] = useState<User[]>([]);
  const {
    isUsersListOpen,
    setIsUsersListOpen,
    usersSearch,
    setUsersSearch,
    setScrollBlocked,
  } = useContext(NavContext);

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
              ).includes(usersSearch.toLowerCase())
            )
              return user;
          });
    setUsersList(usersSearched);
  }, [users, usersSearch]);

  return (
    <div
      className={
        (isUsersListOpen ? "flex " : "hidden") +
        " 2xl:w-1/6 xl:flex flex-col  xl:w-1/5 w-full h-full bg-my-very-dark fixed top-0 bottom-0 right-0"
      }
    >
      <div className=" text-center w-full text-xl mt-16 relative">
        <button
          onClick={() => {
            setScrollBlocked(false);
            setIsUsersListOpen(false);
          }}
          className={
            " xl:hidden flex text-my-text-medium hover:text-[white] absolute right-5"
          }
        >
          <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
        </button>
        <p>Users</p>
        <div className="border-b border-my-text-dark mx-4 mt-2"></div>
      </div>
      <div className="flex flex-col mt-4 gap-4 mx-4 overflow-hidden">
        <div className={"xl:flex hidden justify-start items-center relative"}>
          <FontAwesomeIcon
            className="text-my-text-light w-4 h-4 left-3 absolute"
            icon={faMagnifyingGlass}
          />
          <input
            value={usersSearch}
            onInput={(e) => onSearchChanges(e)}
            className="bg-my-light rounded-md w-full min-w-44 pl-10 py-1"
            placeholder="search for users.."
            type="text"
          />
        </div>

        <div className="flex flex-col h-full gap-2 overflow-y-auto pr-4 mb-4">
          {usersList
            .filter((user) => user.id !== loggedUser.id)
            .map((user, i) => (
              <ActiveUser key={"active_user_key_" + i} user={user}></ActiveUser>
            ))}
          <div className="min-h-2"></div>
        </div>
      </div>
    </div>
  );
}
