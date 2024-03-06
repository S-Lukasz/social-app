/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEvent, useContext } from "react";
import { NavContext, PostContext, UserContext } from "./ContextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faS } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const { loggedUser } = useContext(UserContext);
  const { isPostSelected } = useContext(PostContext);
  const {
    isNavOpen,
    usersSearch,
    setUsersSearch,
    setIsUsersListOpen,
    setIsNavOpen,
    setScrollBlocked,
    setIsMultimediaView,
  } = useContext(NavContext);

  function onMainPageClick() {
    setIsMultimediaView(false);
    setIsNavOpen(false);
    router.push("/");
    window.scrollTo(0, 0);
  }

  function onSearchChanges(e: FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setUsersSearch(target.value);
  }

  function onInputSelect() {
    setIsUsersListOpen(true);
    setScrollBlocked(true);
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

      <div className="xl:hidden flex flex-col gap-4 m-auto">
        <div className="flex justify-start items-center relative">
          <FontAwesomeIcon
            className="text-my-text-light w-4 h-4 left-3 absolute"
            icon={faMagnifyingGlass}
          />
          <input
            value={usersSearch}
            onSelect={() => onInputSelect()}
            onInput={(e) => onSearchChanges(e)}
            className="bg-my-very-light rounded-md max-w-56 pl-10 py-1"
            placeholder="search for users.."
            type="text"
          />
        </div>
      </div>

      <button
        onClick={() => onMainPageClick()}
        className=" xl:m-auto mr-4 items-center justify-center flex text-center gap-2 "
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
