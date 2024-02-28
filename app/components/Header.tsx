"use client";

import { useContext } from "react";
import { NavContext } from "./ContextWrapper";

export default function Header() {
  const { isNavOpen, setIsNavOpen } = useContext(NavContext);

  return (
    <header className=" bg-my-front-items sticky top-0 z-10 flex items-center justify-between shadow-md w-full py-3">
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="bg-my-text-dark px-2 ml-4 py-1 text-center text-nowrap rounded-md hover:bg-my-accent transition-colors duration-300"
      >
        <p>show nav</p>
      </button>
      <p className="w-full text-center">Header</p>
      <div className=" border-b border-my-text-dark "></div>
    </header>
  );
}
