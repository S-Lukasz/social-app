/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext } from "react";
import { NavContext, PostContext, UserContext } from "./ContextWrapper";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faS } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { loggedUser } = useContext(UserContext);
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
          src={loggedUser.avatarUrl}
          alt={"avatar_user_" + loggedUser.id}
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
        className=" m-auto items-center justify-center flex text-center gap-2 "
      >
        <FontAwesomeIcon
          className="bg-my-accent rounded-md px-3 py-1 text-xl font-semibold hover:bg-my-very-light transition-colors duration-300"
          icon={faS}
        ></FontAwesomeIcon>
        {/* <span className="bg-my-accent rounded-md px-4 py-1 font-semibold hover:bg-my-very-light transition-colors duration-300">
          Social-App
        </span> */}
      </Link>
      <div className="absolute w-full h-full border-b border-my-text-dark pointer-events-none"></div>
    </header>
  );
}
