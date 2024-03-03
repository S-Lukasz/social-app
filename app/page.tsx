"use client";

import Post from "./components/Post";
import NewPostPopup from "./components/NewPostPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useMemo, useState } from "react";
import { PostContext } from "./components/ContextWrapper";
import { USER_POST_ITEMS, UserPostItem } from "./consts";
import PostSelected from "./components/PostSelected";
import useDisableScroll from "./hooks/useDisableScroll";

export default function Home() {
  const { setIsNewPostActive } = useContext(PostContext);

  const [posts, setPosts] = useState<UserPostItem[]>(USER_POST_ITEMS);
  const [postSelectedId, setPostSelectedId] = useState<number>();

  const { setIsPostSelected } = useContext(PostContext);
  const { setScrollBlocked } = useDisableScroll();

  function onNewPostAdded(newPost: UserPostItem) {
    const postsUpdated = [newPost, ...posts];
    setPosts(postsUpdated);
  }

  function onPostUpdated(updatedPost: UserPostItem) {
    const postsUpdated = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(postsUpdated);
  }

  function onPostSelected(post: UserPostItem) {
    setPostSelectedId(post.id);
    setIsPostSelected(true);
    setScrollBlocked(true);
  }

  const postSelected = useMemo(
    () => posts.find((post) => post.id === postSelectedId),
    [posts, postSelectedId]
  );

  return (
    <main className=" bg-my-dark flex min-h-screen justify-between">
      <NewPostPopup
        setScrollBlocked={setScrollBlocked}
        onNewPostAdded={onNewPostAdded}
      ></NewPostPopup>

      <PostSelected
        setScrollBlocked={setScrollBlocked}
        onPostUpdated={onPostUpdated}
        post={postSelected}
      ></PostSelected>

      <div className="flex flex-col my-10 gap-10 w-1/3 m-auto">
        <button
          onClick={() => {
            setScrollBlocked(true);
            setIsNewPostActive(true);
          }}
          className="flex items-center bg-my-light rounded-md p-4 hover:bg-my-front-items duration-300 transition-colors hover:text-my-accent "
        >
          <div className="flex items-center m-auto gap-2 font-medium text-lg">
            <FontAwesomeIcon icon={faPlus} /> <div>Add new post</div>
          </div>
        </button>

        {posts.map((post, i) => (
          <Post
            key={"post_key_" + i}
            post={post}
            onPostSelected={onPostSelected}
          ></Post>
        ))}
      </div>
    </main>
  );
}
