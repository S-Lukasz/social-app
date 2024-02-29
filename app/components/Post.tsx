/* eslint-disable @next/next/no-img-element */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CurrentUser, USERS, UserPostItem, PostComment } from "../consts";
import {
  faChevronDown,
  faClose,
  faComment,
  faEllipsis,
  faHeart,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";

interface Props {
  post: UserPostItem;
}

export default function Post({ post }: Props) {
  const [commentDescription, setCommentDescription] = useState("");
  const [showUserComment, setShowUserComment] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [loadLimit, setLoadLimit] = useState(3);
  const [postLikes, setPostLikes] = useState(post.likes.length);

  const loadOffset = 3;

  const userData = USERS[post.userId];
  const showImg = () => {};

  function createComment() {
    const comment: PostComment = {
      userId: CurrentUser.id,
      likes: 0,
      date: new Date(),
      description: commentDescription,
    };

    post.comments.push(comment);
    setShowUserComment(false);
  }

  function onLikeAdd() {
    console.log("likes1: ", post.likes);

    if (!post.likes.includes(CurrentUser.id)) post.likes.push(CurrentUser.id);
    else {
      const index = post.likes.indexOf(CurrentUser.id);
      if (index > -1) post.likes.splice(index, 1);
    }

    console.log("likes2: ", post.likes);

    setPostLikes(post.likes.length);
  }

  function onDescriptionChange(e: FormEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    setCommentDescription(target.value);
  }

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
          <p className="text-my-accent hover:text-my-text-light cursor-pointer duration-300 transition-colors font-medium">
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
      <div className="flex justify-between">
        <div className="flex pl-6 pb-3 items-center gap-2 ">
          <button onClick={() => onLikeAdd()}>
            <FontAwesomeIcon
              className={
                (post.likes.includes(CurrentUser.id)
                  ? "text-[#e45858] hover:text-[white]"
                  : "text-[white] hover:text-[#e45858]") +
                " duration-300 transition-all hover:scale-[0.95] hover:rotate-12"
              }
              icon={faHeart}
            ></FontAwesomeIcon>
          </button>
          <button className="hover:text-my-accent duration-300 transition-all">
            {postLikes}
          </button>
        </div>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex pr-6 pb-3 items-center gap-2"
        >
          {post.comments.length}
          <FontAwesomeIcon
            className="hover:text-my-accent duration-300 transition-all hover:scale-[0.95] hover:rotate-12 cursor-pointer"
            icon={faComment}
          ></FontAwesomeIcon>
        </button>
      </div>
      <div
        className={
          (showComments ? "flex flex-col bg-my-light gap-2 mb-4" : " h-0") +
          " transition-all duration-300"
        }
      >
        {post.comments.slice(0, loadLimit).map((comment, i) => {
          const commentUserData = USERS[comment.userId];
          return (
            <div
              key={"comment_key_" + i + "_on_post_" + comment.userId}
              className={
                (showComments
                  ? "bg-my-very-light p-2 rounded-md mx-4 h-full"
                  : "h-0") + " transition-all duration-300"
              }
            >
              <div className={showComments ? "flex flex-col" : "hidden"}>
                <div className="flex">
                  <img
                    className="w-10 h-10 rounded-full mt-2 ml-2 mr-4 hover:border-2 border-my-accent cursor-pointer duration-100 transition-all scale:110 hover:scale-100"
                    src={commentUserData.avatarUrl}
                    alt={"avatar_user_" + commentUserData.id}
                  />
                  <div className=" mt-1 flex flex-col">
                    <p className="text-my-accent hover:text-my-text-light cursor-pointer duration-300 transition-colors font-medium">
                      {commentUserData.name} {commentUserData.surname}
                    </p>
                    <p className="text-my-text-light text-sm">
                      {post.date.toDateString()}
                    </p>
                  </div>
                </div>

                <div className=" ml-16 p-2 ">{comment.description}</div>
              </div>
            </div>
          );
        })}

        <button
          onClick={() => setLoadLimit(loadLimit + loadOffset)}
          className={
            loadLimit >= post.comments.length || !showComments
              ? "hidden"
              : " cursor-pointer text-my-accent ml-auto mr-10 mt-2 flex items-center gap-2 hover:text-[white] transition-all duration-300"
          }
        >
          <p>show more</p>
          <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
        </button>
      </div>

      <div
        className={
          showUserComment
            ? "bg-my-very-light p-2 relative rounded-md mx-4 transition-all duration-300 mb-4"
            : "hidden"
        }
      >
        <button
          onClick={() => setShowUserComment(false)}
          className="absolute top-3 right-3 h-5 w-5 text-my-text-light hover:text-my-accent duration-300 transition-colors"
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faClose}></FontAwesomeIcon>
        </button>

        <div className={"flex flex-col gap-4"}>
          <div className="flex">
            <img
              className="w-10 h-10 rounded-full mt-2 ml-2 mr-4 hover:border-2 border-my-accent cursor-pointer duration-100 transition-all scale:110 hover:scale-100"
              src={CurrentUser.avatarUrl}
              alt={"avatar_user_" + CurrentUser.id}
            />
            <div className=" mt-1 flex flex-col">
              <p className="text-my-accent hover:text-my-text-light cursor-pointer duration-300 transition-colors font-medium">
                {CurrentUser.name} {CurrentUser.surname}
              </p>
              <p className="text-my-text-light text-sm">
                {post.date.toDateString()}
              </p>
            </div>
          </div>

          <textarea
            value={commentDescription}
            onInput={(e) => onDescriptionChange(e)}
            className="m-auto w-11/12 min-h-32 max-h-40 rounded-md p-3 bg-my-light"
            placeholder="Write your comment here!"
          ></textarea>

          <button
            disabled={commentDescription === ""}
            onClick={() => createComment()}
            className={
              (commentDescription === ""
                ? "pointer-events-none bg-my-light text-my-text-medium"
                : "pointer-events-auto text-my-accent hover:text-[white] transition-all duration-300 hover:bg-my-dark bg-my-light") +
              " flex ml-auto mr-2 mb-2 px-4 py-1 rounded-md items-center"
            }
          >
            <p>Submit</p>
          </button>
        </div>
      </div>

      <div className={showUserComment ? "hidden" : "flex w-full"}>
        <button
          onClick={() => {
            setCommentDescription("");
            setShowUserComment(true);
          }}
          className="bg-my-very-light p-2 w-full mx-4 rounded-md transition-all duration-300 mb-4 hover:bg-my-front-items hover:text-my-accent"
        >
          Add comment
        </button>
      </div>
    </div>
  );
}
