/* eslint-disable @next/next/no-img-element */
"use client";

import { PostContext } from "@/app/components/ContextWrapper";
import NewPostPopup from "@/app/components/NewPostPopup";
import Post from "@/app/components/Post";
import PostSelected from "@/app/components/PostSelected";
import {
  CurrentUser,
  USERS,
  USER_POST_ITEMS,
  UserPostItem,
} from "@/app/consts";
import useDisableScroll from "@/app/hooks/useDisableScroll";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useMemo, useState } from "react";

interface UserPostProps {
  post: UserPostItem;
}

export default function UserPage({ params }: { params: { id: number } }) {
  const { setIsNewPostActive } = useContext(PostContext);
  const [postSelectedId, setPostSelectedId] = useState<number>();
  const { setIsPostSelected } = useContext(PostContext);
  const { setScrollBlocked } = useDisableScroll();

  const [userActionButtonText, setUserActionButtonText] =
    useState<string>("Send invite");
  [, "Edit profile", "Remove friend"];

  const [userPosts, setUserPosts] = useState<UserPostItem[]>([]);
  const userData = USERS[params.id];

  const postSelected = useMemo(
    () => userPosts.find((post) => post.id === postSelectedId),
    [userPosts, postSelectedId]
  );

  // IMPORTANT IT HAS TO BE FUNCTION FROM MAIN POST, SO GET IT FROM CONTEXT OR SMTH TO MAKE IT WORK
  function onNewPostAdded(updatedPost: UserPostItem) {
    // const postsUpdated = posts.map((post) =>
    //   post.id === updatedPost.id ? updatedPost : post
    // );
    // setPosts(postsUpdated);
  }

  // IMPORTANT IT HAS TO BE FUNCTION FROM MAIN POST, SO GET IT FROM CONTEXT OR SMTH TO MAKE IT WORK
  function onPostUpdated(updatedPost: UserPostItem) {
    // const postsUpdated = posts.map((post) =>
    //   post.id === updatedPost.id ? updatedPost : post
    // );
    // setPosts(postsUpdated);
  }

  // IMPORTANT IT HAS TO BE FUNCTION FROM MAIN POST, SO GET IT FROM CONTEXT OR SMTH TO MAKE IT WORK
  function onPostSelected(post: UserPostItem) {
    // setPostSelectedId(post.id);
    // setIsPostSelected(true);
    // setScrollBlocked(true);
  }

  useEffect(() => {
    const posts = USER_POST_ITEMS.filter((post) => post.userId === userData.id);
    setUserPosts(posts);
  }, [userData]);

  useEffect(() => {
    if (userData.id === CurrentUser.id) {
      setUserActionButtonText("Edit profile");
    } else if (CurrentUser.friends.includes(userData.id)) {
      setUserActionButtonText("Remove friend");
    } else {
      setUserActionButtonText("Send invite");
    }
  }, [userData]);

  return (
    <div className="bg-my-front-items  pb-4 flex flex-col w-2/3 mx-auto min-h-screen">
      <NewPostPopup
        setScrollBlocked={setScrollBlocked}
        onNewPostAdded={onNewPostAdded}
      ></NewPostPopup>

      <PostSelected
        setScrollBlocked={setScrollBlocked}
        onPostUpdated={onPostUpdated}
        post={postSelected}
      ></PostSelected>

      <div className="flex rounded-md bg-my-light p-4 m-4  h-full">
        <img
          className="w-32 h-32 rounded-full mt-2 ml-2 mr-4 cursor-pointer duration-100 transition-all scale:110 hover:scale-100"
          src={userData.avatarUrl}
          alt={"avatar_user_" + userData.id}
        />
        <div className="flex w-full justify-between">
          <div className="flex flex-col m-4">
            <span className="font-semibold text-2xl">
              {userData.name} {userData.surname}
            </span>
            <span className="font-medium text-lg text-my-text-light">
              {userData.description}
            </span>
          </div>

          <button className="px-6 h-8 font-medium text-lg text-center rounded-md bg-my-accent hover:bg-my-very-light duration-300 transition-colors">
            {userActionButtonText}
          </button>
        </div>
      </div>

      <div className="flex px-4  gap-4">
        <div className="flex flex-col rounded-md bg-my-light  w-1/3">
          <div className="flex flex-col gap-2">
            <div className="text-center p-2 mx-4 rounded-md">User data</div>
            {userData.friends.map((friendId) => (
              <div
                key={"user_friend_item_key_" + friendId}
                className="bg-my-very-light p-2 mx-4 rounded-md"
              >
                {USERS[friendId].name} {USERS[friendId].surname}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-center p-2 mx-4 rounded-md">Friends</div>
            {userData.friends.map((friendId) => (
              <div
                key={"user_friend_item_key_" + friendId}
                className="bg-my-very-light p-2 mx-4 rounded-md"
              >
                {USERS[friendId].name} {USERS[friendId].surname}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-2/3 gap-4">
          <div className="bg-my-light rounded-md w-full text-center text-xl font-medium py-2">
            Posts
          </div>
          <button
            onClick={() => {
              setScrollBlocked(true);
              setIsNewPostActive(true);
            }}
            className={
              CurrentUser.id !== userData.id
                ? "hidden"
                : " flex items-center bg-my-light rounded-md p-4 hover:bg-my-front-items duration-300 transition-colors hover:text-my-accent "
            }
          >
            <div className="flex items-center m-auto gap-2 font-medium text-lg">
              <FontAwesomeIcon icon={faPlus} /> <div>Add new post</div>
            </div>
          </button>
          {userPosts.map((post, i) => (
            <Post
              key={"user_post_key_" + i}
              onPostSelected={onPostSelected}
              post={post}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function UserPost({ post }: UserPostProps) {
  return <div></div>;
}
