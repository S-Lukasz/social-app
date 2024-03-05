/* eslint-disable @next/next/no-img-element */
"use client";

import { PostContext, UserContext } from "@/app/components/ContextWrapper";
import NewPostPopup from "@/app/components/NewPostPopup";
import Post from "@/app/components/Post";
import PostSelected from "@/app/components/PostSelected";
import { UserPostItem, UserProfileData } from "@/app/consts";
import useDisableScroll from "@/app/hooks/useDisableScroll";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext, useEffect, useMemo, useRef, useState } from "react";

export default function UserPage({ params }: { params: { id: number } }) {
  const { loggedUser, users, setloggedUser, onUserUpdated } =
    useContext(UserContext);
  const { posts, onPostUpdated, setIsPostSelected, setIsNewPostActive } =
    useContext(PostContext);

  const { setScrollBlocked } = useDisableScroll();

  const loadOffset = 9;
  const maxScrollHeight = 520;

  const userData = users[params.id];
  const commentsScrollListRef = useRef<HTMLDivElement>(null);

  const [loadLimit, setLoadLimit] = useState(9);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [userPosts, setUserPosts] = useState<UserPostItem[]>([]);
  const [postSelectedId, setPostSelectedId] = useState<number>();
  const [userActionButtonText, setUserActionButtonText] =
    useState<string>("Send invite");

  const postSelected = useMemo(
    () => userPosts.find((post) => post.id === postSelectedId),
    [userPosts, postSelectedId]
  );

  function onUserActionButton() {
    if (userData.id === loggedUser.id) {
    } else if (loggedUser.friends.includes(userData.id)) {
      removeFriend(userData.id);
    } else {
      addFriend(userData.id);
    }
  }

  function addFriend(userID: number) {
    if (loggedUser.friends.includes(userID)) return;

    const userClone = {
      ...loggedUser,
      friends: [...loggedUser.friends, userID],
    };

    onUserUpdated(userClone);
  }

  function removeFriend(userID: number) {
    if (!loggedUser.friends.includes(userID)) return;

    const index = loggedUser.friends.indexOf(userID);
    if (index > -1) {
      const userClone = {
        ...loggedUser,
        friends: loggedUser.friends.filter((friend) => friend !== userID),
      };
      onUserUpdated(userClone);
    }
  }

  function onPostSelected(post: UserPostItem) {
    setPostSelectedId(post.id);
    setIsPostSelected(true);
    setScrollBlocked(true);
  }

  useEffect(() => {
    setScrollHeight(commentsScrollListRef?.current?.scrollHeight ?? 0);
  }, [userData.friends, commentsScrollListRef]);

  useEffect(() => {
    const userPosts = posts.filter((post) => post.userId === userData.id);
    setUserPosts(userPosts);
  }, [userData, posts]);

  useEffect(() => {
    console.log(
      "(friends: ",
      loggedUser.friends,
      "includes: ",
      loggedUser.friends.includes(userData.id)
    );

    if (userData.id === loggedUser.id) {
      setUserActionButtonText("Edit profile");
    } else if (loggedUser.friends.includes(userData.id)) {
      setUserActionButtonText("Remove friend");
    } else {
      setUserActionButtonText("Send invite");
    }
  }, [userData, loggedUser]);

  return (
    <div className="bg-my-front-items flex w-full min-h-screen relative">
      <NewPostPopup setScrollBlocked={setScrollBlocked}></NewPostPopup>

      <PostSelected
        setScrollBlocked={setScrollBlocked}
        onPostUpdated={onPostUpdated}
        post={postSelected}
      ></PostSelected>

      <div className="flex flex-col pb-4 mx-auto w-2/3">
        <div className="flex rounded-md bg-my-light p-4 m-4 h-full">
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

            <button
              onClick={() => onUserActionButton()}
              className="px-6 h-8 font-medium text-lg text-center rounded-md bg-my-accent hover:bg-my-very-light duration-300 transition-colors"
            >
              {userActionButtonText}
            </button>
          </div>
        </div>

        <div className="flex px-4  gap-4">
          <div className="flex flex-col rounded-md bg-my-light  w-1/3">
            <div className="flex flex-col gap-2">
              <div className="text-center mt-4 font-semibold text-lg  mx-4 rounded-md">
                About
              </div>
              {UserProfileData.map((data, i) => (
                <div
                  key={"user_profile_data_info_" + i}
                  className="bg-my-very-light p-2 mx-4 rounded-md flex items-center gap-2 pl-4"
                >
                  <FontAwesomeIcon
                    className="text-my-text-light"
                    icon={data.icon}
                  ></FontAwesomeIcon>
                  <p></p>
                  <p>{data.info}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="text-center mt-4 mx-4 rounded-md font-semibold text-lg ">
                Friends ({userData.friends.length})
              </div>
              <div
                ref={commentsScrollListRef}
                className={
                  (scrollHeight >= maxScrollHeight ? "overflow-y-scroll" : "") +
                  " grid grid-cols-3 mx-3 pb-10 min-h-[32rem] max-h-[32rem] relative"
                }
              >
                {userData.friends.slice(0, loadLimit).map((friendId) => {
                  const friendData = users[friendId];
                  return (
                    <Link
                      key={"user_friend_item_key_" + friendId}
                      href={`/users/${friendId}`}
                      className="items-center text-center group"
                    >
                      <img
                        className="w-28 h-28 rounded-md mt-2 ml-2 mr-4 hover:border-2 border-my-accent cursor-pointer duration-200 transition-all scale:110 hover:scale-100"
                        src={friendData.avatarUrl}
                        alt={"avatar_user_" + friendData.id}
                      />
                      <span className="font-semibold mt-1 flex flex-col group-hover:text-my-accent duration-300 transition-all">
                        <p>{friendData.name}</p>
                        <p>{friendData.surname}</p>
                      </span>
                    </Link>
                  );
                })}
                <button
                  onClick={() => setLoadLimit(loadLimit + loadOffset)}
                  className={
                    loadLimit >= userData.friends.length
                      ? "hidden"
                      : "cursor-pointer text-my-accent absolute -bottom-10 right-4 w-full items-center justify-end flex gap-2 hover:text-[white] transition-all duration-300"
                  }
                >
                  <p>show more</p>
                  <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                </button>
              </div>
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
                loggedUser.id !== userData.id
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
    </div>
  );
}
