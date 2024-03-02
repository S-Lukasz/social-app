"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface INavContext {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IPostContext {
  isPostSelected: boolean;
  isNewPostActive: boolean;
  setIsNewPostActive: Dispatch<SetStateAction<boolean>>;
  setIsPostSelected: Dispatch<SetStateAction<boolean>>;
}

export const NavContext = createContext<INavContext>({
  isNavOpen: false,
  setIsNavOpen: () => {},
});

export const PostContext = createContext<IPostContext>({
  isPostSelected: false,
  isNewPostActive: false,
  setIsNewPostActive: () => {},
  setIsPostSelected: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNewPostActive, setIsNewPostActive] = useState(false);
  const [isPostSelected, setIsPostSelected] = useState(false);

  return (
    <PostContext.Provider
      value={{
        isNewPostActive,
        isPostSelected,
        setIsNewPostActive,
        setIsPostSelected,
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
