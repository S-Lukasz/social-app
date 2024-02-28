/* eslint-disable @next/next/no-img-element */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { USERS, UserPostItem } from "../consts";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

interface Props {
  post: UserPostItem;
}

export default function Post({ post }: Props) {
  const userData = USERS[post.userId];

  const showImg = () => {};

  return (
    <div className="bg-my-light rounded-md relative">
      <FontAwesomeIcon
        className="h-5 w-5 absolute top-4 right-6 text-my-text-light hover:text-[white] cursor-pointer"
        icon={faEllipsis}
      />
      <div className="flex">
        <img
          className="w-10 h-10 rounded-full mt-6 ml-6 mr-4 hover:border-2 border-my-accent cursor-pointer duration-100 transition-all scale:110 hover:scale-100"
          src={userData.avatarUrl}
          alt={"avatar_user_" + userData.id}
        />
        <div className=" mt-5 flex flex-col">
          <p className="text-my-accent hover:text-my-text-light cursor-pointer duration-300 transition-colors">
            {userData.name} {userData.surname}
          </p>
          <p className="text-my-text-light text-sm">
            {post.date.toDateString()}
          </p>
        </div>
      </div>
      <div className="bg-my-front-items m-4 rounded-md">
        <p className="p-4">{post.description}</p>
        <button
          onClick={() => showImg()}
          className={!post.imageUrl ? "hidden" : "w-full h-full "}
        >
          <img
            className="w-full h-full rounded-b-md hover:rounded-md hover:shadow-lg hover:scale-[0.96] duration-300 transition-all"
            src={post.imageUrl}
            alt={"post_image"}
          />
        </button>
      </div>
    </div>
  );
}
