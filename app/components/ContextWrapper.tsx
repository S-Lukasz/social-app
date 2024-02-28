"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface INavContext {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const NavContext = createContext<INavContext>({
  isNavOpen: false,
  setIsNavOpen: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <NavContext.Provider
      value={{
        isNavOpen,
        setIsNavOpen,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}
