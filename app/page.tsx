"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActiveUser from "./components/ActiveUser";
import Nav from "./components/Nav";
import Post from "./components/Post";
import { USERS, USER_POST_ITEMS, UserPostItem } from "./consts";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import NewPostPopup from "./components/NewPostPopup";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "./components/ContextWrapper";

export default function Home() {
  const { setIsNewPostActive } = useContext(PostContext);

  const [posts, setPosts] = useState<UserPostItem[]>([]);

  useEffect(() => {
    setPosts(USER_POST_ITEMS);
  }, []);

  function onNewPostAdded(newPost: UserPostItem) {
    posts.unshift(newPost);
  }

  return (
    <main className=" bg-my-dark flex min-h-screen justify-between">
      <NewPostPopup onNewPostAdded={onNewPostAdded}></NewPostPopup>
      <Nav></Nav>
      <div className="flex flex-col my-20 gap-10 w-1/3">
        <button
          onClick={() => setIsNewPostActive(true)}
          className="flex items-center bg-my-light rounded-md p-4 hover:bg-my-front-items duration-300 transition-colors hover:text-my-accent "
        >
          <div className="flex items-center m-auto gap-2 font-medium text-lg">
            <FontAwesomeIcon icon={faPlus} /> <div>Add new post</div>
          </div>
        </button>
        {USER_POST_ITEMS.map((post, i) => (
          <Post key={"post_key_" + i} post={post}></Post>
        ))}
      </div>
      <div className="w-1/6 bg-my-very-dark">
        <div className=" text-center w-full text-xl mt-4 ">
          Users
          <div className="border-b border-my-text-dark mx-4 mt-2"></div>
        </div>
        <div className="flex flex-col my-1 gap-4 p-4">
          <div className="flex items-center bg-my-light p-4 rounded-md w-full text-base px-4 py-1 relative">
            <input
              // onInput={(e) => onMinPriceChanged(e)}
              className="bg-my-light rounded-md ml-8"
              placeholder="search for users.."
              type="text"
            />
            <FontAwesomeIcon
              className="text-my-text-light absolute left-4"
              icon={faMagnifyingGlass}
            />
          </div>

          {USERS.map((user, i) => (
            <ActiveUser key={"active_user_key_" + i} user={user}></ActiveUser>
          ))}
        </div>
      </div>
    </main>
  );
}
