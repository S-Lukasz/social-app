/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { User } from "../consts";
import { useContext } from "react";
import { NavContext } from "./ContextWrapper";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

export default function ActiveUser({ user }: Props) {
  const router = useRouter();
  const { setIsUsersListOpen } = useContext(NavContext);

  function onUserSelect() {
    router.push(`/users/${user.id}`);
    setIsUsersListOpen(false);
  }

  return (
    <button
      onClick={() => onUserSelect()}
      className="bg-my-light relative flex items-center p-4 rounded-md w-full duration-300 transition-all hover:bg-my-front-items text-my-accent hover:text-my-text-light"
    >
      <img
        className="w-10 h-10 rounded-full mr-4"
        src={user.avatarUrl}
        alt={"avatar_user_" + user.id}
      />
      <div
        className={
          (user.isActive ? "bg-[#3bce4e]" : "bg-my-text-dark") +
          " left-11 top-10 absolute h-4 w-4 rounded-full shadow-md border-2  border-my-light "
        }
      ></div>
      <p className="mb-3">
        {user.name} {user.surname}
      </p>
    </button>
  );
}
