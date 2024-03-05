"use client";

import { useContext, useState, useMemo, useEffect } from "react";
import { NavContext, PostContext, UserContext } from "./ContextWrapper";
import Post from "./Post";
import { UserPostItem } from "../consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface Props {
  onPostSelected: (post: UserPostItem) => void;
}

export default function Multimedia({ onPostSelected }: Props) {
  const { isMultimediaView } = useContext(NavContext);
  const { loggedUser } = useContext(UserContext);
  const { posts } = useContext(PostContext);

  const [showSavedPosts, setShowSavedPosts] = useState<boolean>(true);
  const [multimediaPosts, setMultimediaPosts] = useState<UserPostItem[]>(posts);

  useEffect(() => {
    const postsToShow = posts.filter((post) =>
      showSavedPosts
        ? loggedUser.savedPosts.includes(post.id)
        : loggedUser.hiddenPosts.includes(post.id)
    );
    setMultimediaPosts(postsToShow);
  }, [loggedUser, posts, showSavedPosts]);

  return (
    <div
      className={
        !isMultimediaView ? "hidden" : "flex flex-col my-10 gap-10 w-1/3 m-auto"
      }
    >
      <div className="flex justify-center gap-10">
        <button
          disabled={showSavedPosts}
          onClick={() => setShowSavedPosts(true)}
          className={
            (showSavedPosts
              ? "bg-my-accent"
              : "bg-my-light hover:bg-my-very-light") +
            " rounded-md px-6 py-1 font-semibold text-lg flex items-center gap-2 "
          }
        >
          <FontAwesomeIcon
            className={
              (showSavedPosts ? "text-[white]" : "text-my-text-light") +
              " w-4 h-4"
            }
            icon={faBookmark}
          ></FontAwesomeIcon>
          <p>Saved Posts</p>
        </button>
        <button
          disabled={!showSavedPosts}
          onClick={() => setShowSavedPosts(false)}
          className={
            (!showSavedPosts
              ? "bg-my-accent"
              : "bg-my-light hover:bg-my-very-light") +
            " rounded-md px-6 py-1 font-semibold text-lg flex items-center gap-2 "
          }
        >
          <FontAwesomeIcon
            className={
              (!showSavedPosts ? "text-[white]" : "text-my-text-light") +
              " w-4 h-4"
            }
            icon={faEyeSlash}
          ></FontAwesomeIcon>
          <p>Hidden Posts</p>
        </button>
      </div>
      <div
        className={
          multimediaPosts.length > 0
            ? "hidden"
            : "bg-my-light rounded-md text-center py-2 text-lg"
        }
      >
        Here you will see all your {showSavedPosts ? "saved" : "hidden"} posts.
      </div>
      {multimediaPosts.map((post, i) => (
        <Post
          key={"post_key_" + i}
          post={post}
          onPostSelected={onPostSelected}
        ></Post>
      ))}
    </div>
  );
}
