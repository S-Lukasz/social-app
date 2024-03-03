"use client";

import { useContext } from "react";
import { CurrentUser, NavItemType, USER_NAV_ITEMS } from "../consts";
import { NavContext } from "./ContextWrapper";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const { isNavOpen } = useContext(NavContext);

  function onNavItemClick(navType: NavItemType) {
    if (navType === NavItemType.UserProfile) {
    }
  }

  return (
    <div
      className={
        (isNavOpen ? "translate-x" : "-translate-x-60") +
        " w-1/6 top-14 bottom-0 bg-my-very-dark fixed flex flex-col shadow-md transition-all duration-500 ease-in-out"
      }
    >
      <ul>
        {USER_NAV_ITEMS.map((item, i) => {
          return (
            <button
              onClick={() => onNavItemClick(item.type)}
              key={"user_nav_item_key_" + i}
              className="group"
            >
              <div className={item.hasBreakLine ? "flex" : "hidden"}>
                <div
                  className={
                    (isNavOpen ? "w-5/6 ml-auto mr-5" : "w-3 ml-auto mr-8") +
                    " h-3 bg-my-text-medium rounded-full mb-2 transition-all duration-500 ease-in-out"
                  }
                />
              </div>
              <li className="flex flex-col p-4 text-left ">
                <span
                  className={
                    (isNavOpen ? "w-full" : "w-1/6 overflow-hidden") +
                    "  text-my-text-light font-bold transition-all duration-500 ease-in-out"
                  }
                >
                  <p
                    className={
                      "whitespace-normal line-clamp-1 h-[1lh] group-hover:text-my-accent duration-300 transition-colors"
                    }
                  >
                    {item.name}
                  </p>

                  <div
                    className={
                      (isNavOpen ? "left-5" : "left-[16.7rem]") +
                      " mt-3 absolute transition-all duration-500 ease-in-out"
                    }
                  >
                    <FontAwesomeIcon
                      className={
                        (isNavOpen
                          ? " text-my-text-medium "
                          : " text-my-text-light ") +
                        " group-hover:text-my-accent w-6 h-6 duration-300 transition-colors"
                      }
                      icon={item.icon}
                    ></FontAwesomeIcon>
                  </div>
                </span>
                <span
                  className={
                    (isNavOpen ? "w-full" : "w-1/6 overflow-hidden") +
                    " text-my-text-medium transition-all duration-500 ease-in-out"
                  }
                >
                  <p
                    className={
                      "ml-12 whitespace-normal line-clamp-2 h-[2lh] group-hover:text-my-text-light duration-300 transition-colors"
                    }
                  >
                    {item.description}
                  </p>
                </span>
              </li>
            </button>
          );
        })}
      </ul>
    </div>
  );
}
