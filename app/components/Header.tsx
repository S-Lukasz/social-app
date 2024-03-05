/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext } from "react";
import { NavContext, PostContext, UserContext } from "./ContextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { loggedUser } = useContext(UserContext);
  const { isNavOpen, setIsNavOpen, setIsMultimediaView } =
    useContext(NavContext);
  const { isPostSelected } = useContext(PostContext);

  function onMainPageClick() {
    setIsMultimediaView(false);
    router.push("/");
  }

  return (
    <header
      className={
        isPostSelected
          ? "hidden"
          : "bg-my-front-items sticky top-0 z-50 flex items-center justify-between shadow-md w-full py-2"
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

      <button
        onClick={() => onMainPageClick()}
        className=" m-auto items-center justify-center flex text-center gap-2 "
      >
        <FontAwesomeIcon
          className="bg-my-accent rounded-md px-3 py-1 text-xl font-semibold hover:bg-my-very-light transition-colors duration-300"
          icon={faS}
        ></FontAwesomeIcon>
      </button>
      <div className="absolute w-full h-full border-b border-my-text-dark pointer-events-none"></div>
    </header>
  );
}
