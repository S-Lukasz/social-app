"use client";

import Post from "./components/Post";
import NewPostPopup from "./components/NewPostPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "./components/ContextWrapper";
import { USER_POST_ITEMS, UserPostItem } from "./consts";

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

      <div className="flex flex-col my-10 gap-10 w-1/3 m-auto">
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
    </main>
  );
}
