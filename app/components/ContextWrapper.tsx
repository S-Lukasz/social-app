"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface INavContext {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IPostContext {
  isNewPostActive: boolean;
  setIsNewPostActive: Dispatch<SetStateAction<boolean>>;
}

export const NavContext = createContext<INavContext>({
  isNavOpen: false,
  setIsNavOpen: () => {},
});

export const PostContext = createContext<IPostContext>({
  isNewPostActive: false,
  setIsNewPostActive: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNewPostActive, setIsNewPostActive] = useState(false);

  return (
    <PostContext.Provider
      value={{
        isNewPostActive,
        setIsNewPostActive,
      }}
    >
      <NavContext.Provider
        value={{
          isNavOpen,
          setIsNavOpen,
        }}
      >
        {children}
      </NavContext.Provider>
    </PostContext.Provider>
  );
}
