/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext } from "react";
import { NavContext, PostContext } from "./ContextWrapper";
import Link from "next/link";
import { CurrentUser } from "../consts";

export default function Header() {
  const { isNavOpen, setIsNavOpen } = useContext(NavContext);
  const { isPostSelected } = useContext(PostContext);

  return (
    <header
      className={
        isPostSelected
          ? "hidden"
          : "bg-my-front-items sticky top-0 z-10 flex items-center justify-between shadow-md w-full py-2"
      }
    >
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="bg-my-dark relative flex items-center ml-4 p-1 rounded-full duration-300 transition-all hover:bg-my-accent text-my-accent hover:text-my-text-light"
      >
        <img
          className="w-8 h-8 rounded-full"
          src={CurrentUser.avatarUrl}
          alt={"avatar_user_" + CurrentUser.id}
        />
      </button>

      {/* <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="bg-my-text-dark px-2 ml-4 py-1 text-center text-nowrap rounded-md hover:bg-my-accent transition-colors duration-300"
      >
        <div>show nav</div>
      </button> */}
      <Link
        href={"/"}
        className=" m-auto text-center bg-my-accent rounded-md px-4 py-1 font-medium hover:bg-my-very-light transition-colors duration-300"
      >
        Social App
      </Link>
      <div className="absolute w-full h-full border-b border-my-text-dark pointer-events-none"></div>
    </header>
  );
}
