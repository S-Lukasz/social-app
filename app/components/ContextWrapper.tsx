"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import {
  CurrentUser,
  USERS,
  USER_POST_ITEMS,
  User,
  UserPostItem,
} from "../consts";

export interface IUserContext {
  users: User[];
  loggedUser: User;
  onUserUpdated: (updatedUser: User) => void;
  setUsers: Dispatch<SetStateAction<User[]>>;
  setloggedUser: Dispatch<SetStateAction<User>>;
}

export interface INavContext {
  isNavOpen: boolean;
  isMultimediaView: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
  setIsMultimediaView: Dispatch<SetStateAction<boolean>>;
}

export interface IPostContext {
  isPostSelected: boolean;
  isNewPostActive: boolean;
  posts: UserPostItem[];
  onPostUpdated: (updatedPost: UserPostItem) => void;
  onNewPostAdded: (updatedPost: UserPostItem) => void;
  onPostRemoved: (updatedPost: UserPostItem) => void;
  setIsNewPostActive: Dispatch<SetStateAction<boolean>>;
  setIsPostSelected: Dispatch<SetStateAction<boolean>>;
  setPosts: Dispatch<SetStateAction<UserPostItem[]>>;
}

export const UserContext = createContext<IUserContext>({
  users: USERS,
  loggedUser: CurrentUser,
  onUserUpdated: () => {},
  setloggedUser: () => {},
  setUsers: () => {},
});

export const NavContext = createContext<INavContext>({
  isNavOpen: false,
  isMultimediaView: false,
  setIsNavOpen: () => {},
  setIsMultimediaView: () => {},
});

export const PostContext = createContext<IPostContext>({
  isPostSelected: false,
  isNewPostActive: false,
  posts: [],
  onPostUpdated: () => {},
  onNewPostAdded: () => {},
  onPostRemoved: () => {},
  setIsNewPostActive: () => {},
  setIsPostSelected: () => {},
  setPosts: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMultimediaView, setIsMultimediaView] = useState(false);
  const [isNewPostActive, setIsNewPostActive] = useState(false);
  const [isPostSelected, setIsPostSelected] = useState(false);
  const [loggedUser, setloggedUser] = useState(CurrentUser);
  const [users, setUsers] = useState<User[]>(USERS);
  const [posts, setPosts] = useState<UserPostItem[]>(USER_POST_ITEMS);

  function onNewPostAdded(newPost: UserPostItem) {
    const postsUpdated = [newPost, ...posts];
    setPosts(postsUpdated);
  }

  function onPostRemoved(removedPost: UserPostItem) {
    setPosts(posts.filter((post) => post.id !== removedPost.id));
  }

  function onPostUpdated(updatedPost: UserPostItem) {
    const postsUpdated = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(postsUpdated);
  }

  function onUserUpdated(updatedUser: User) {
    const usersUpdated = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    if (updatedUser.id === loggedUser.id) setloggedUser(updatedUser);

    setUsers(usersUpdated);
  }

  return (
    <UserContext.Provider
      value={{
        users,
        loggedUser,
        setUsers,
        setloggedUser,
        onUserUpdated,
      }}
    >
      <PostContext.Provider
        value={{
          isNewPostActive,
          isPostSelected,
          posts,
          onPostUpdated,
          onNewPostAdded,
          onPostRemoved,
          setIsNewPostActive,
          setIsPostSelected,
          setPosts,
        }}
      >
        <NavContext.Provider
          value={{
            isNavOpen,
            isMultimediaView,
            setIsNavOpen,
            setIsMultimediaView,
          }}
        >
          {children}
        </NavContext.Provider>
      </PostContext.Provider>
    </UserContext.Provider>
  );
}
