"use client";

import { useContext } from "react";
import { USER_NAV_ITEMS } from "../consts";
import { NavContext } from "./ContextWrapper";

export default function Nav() {
  const { isNavOpen } = useContext(NavContext);

  return (
    <div
      className={
        (isNavOpen ? "translate-x" : "-translate-x-60") +
        " w-1/6 top-14 bottom-0 bg-my-very-dark fixed flex flex-col shadow-md transition-all duration-500 ease-in-out"
      }
    >
      <ul>
        <li
          className={
            (isNavOpen ? " w-5/6 ml-auto mr-5 " : "w-3 ml-auto mr-8 ") +
            "  h-3 bg-my-text-medium rounded-full mt-6 transition-all duration-500 ease-in-out"
          }
        ></li>
        {USER_NAV_ITEMS.map((item, i) => {
          return (
            <li key={"user_nav_item_key_" + i} className="flex flex-col p-4 ">
              <span
                className={
                  (isNavOpen ? "w-full" : "w-1/6 overflow-hidden") +
                  "  text-my-text-light font-bold transition-all duration-500 ease-in-out"
                }
              >
                <p className="whitespace-normal line-clamp-1 h-[1lh]">
                  {item.name}
                </p>
              </span>
              <span
                className={
                  (isNavOpen ? "w-full" : "w-1/6 overflow-hidden") +
                  " text-my-text-medium transition-all duration-500 ease-in-out"
                }
              >
                <p className={" whitespace-normal line-clamp-2 h-[2lh]"}>
                  {item.description}
                </p>
              </span>
            </li>
          );
        })}
        <li
          className={
            (isNavOpen ? " w-5/6 ml-auto mr-5 " : "w-3 ml-auto mr-8 ") +
            "  h-3 bg-my-text-medium rounded-full mt-4 transition-all duration-500 ease-in-out"
          }
        ></li>
        {USER_NAV_ITEMS.map((item, i) => {
          return (
            <li key={"user_nav_item_key_" + i} className="flex flex-col p-4 ">
              <span
                className={
                  (isNavOpen ? "w-full" : "w-1/6 overflow-hidden") +
                  "  text-my-text-light font-bold transition-all duration-500 ease-in-out"
                }
              >
                <p className="whitespace-normal line-clamp-1 h-[1lh]">
                  {item.name}
                </p>
              </span>
              <span
                className={
                  (isNavOpen ? "w-full" : "w-1/6 overflow-hidden") +
                  " text-my-text-medium transition-all duration-500 ease-in-out"
                }
              >
                <p className={" whitespace-normal line-clamp-2 h-[2lh]"}>
                  {item.description}
                </p>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
