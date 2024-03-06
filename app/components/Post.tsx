/* eslint-disable @next/next/no-img-element */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserPostItem, PostComment, User } from "../consts";
import { faClose, faComment } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useContext, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import Link from "next/link";
import { PostContext, UserContext } from "./ContextWrapper";
import PostComments from "./PostComments";
import LikesAndUsers from "./LikesAndUsers";
import PostOptionsView from "./PostOptionsView";

interface Props {
  onPostSelected: (post: UserPostItem) => void;
  post: UserPostItem;
}

interface UserCommentProps {
  createComment: (newDescription: string) => void;
  loggedUser: User;
  post: UserPostItem;
}

export default function Post({ onPostSelected, post }: Props) {
  const {
    ref: likesRef,
    isOpen: showLikesView,
    setIsOpen: setShowLikesView,
  } = useClickOutside();

  const [showComments, setShowComments] = useState(false);

  const { onPostUpdated } = useContext(PostContext);
  const { loggedUser, users } = useContext(UserContext);

  const userData = users[post.userId];

  function createComment(newDescription: string) {
    if (!post) return;

    const newComment: PostComment = {
      id: post.comments.length,
      userId: loggedUser.id,
      likes: [],
      date: new Date(),
      description: newDescription,
    };

    const postClone = { ...post, comments: [...post.comments, newComment] };
    onPostUpdated(postClone);
  }

  return (
    <div className="bg-my-light rounded-md relative">
      <PostOptionsView post={post}></PostOptionsView>
      <div className="flex">
        <Link href={`/users/${userData.id}`} className="">
          <img
            className="w-10 h-10 rounded-full mt-6 ml-6 mr-4 hover:border-2 border-my-accent cursor-pointer duration-100 transition-all scale:110 hover:scale-100"
            src={userData.avatarUrl}
            alt={"avatar_user_" + userData.id}
          />
        </Link>

        <div className=" mt-5 flex flex-col">
          <Link
            href={`/users/${userData.id}`}
            className="text-my-accent hover:text-my-text-light duration-300 transition-colors font-medium"
          >
            {userData.name} {userData.surname}
          </Link>
          <p className="text-my-text-light text-sm">
            {post.date.toDateString()}
          </p>
        </div>
      </div>
      <div className="bg-my-front-items m-4 rounded-md flex flex-col">
        <p className="p-4 break-words">{post.description}</p>
        <button
          onClick={() => onPostSelected(post)}
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
        <div className="flex pl-6 pb-3 items-center">
          <LikesAndUsers
            setShowLikesView={setShowLikesView}
            showLikesView={showLikesView}
            isDropDownLeft={false}
            refToSet={likesRef}
            post={post}
          ></LikesAndUsers>
        </div>
        <button
          disabled={post.comments.length === 0}
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
      <PostComments
        showComments={showComments}
        post={post}
        users={users}
      ></PostComments>
      <UserComment
        loggedUser={loggedUser}
        createComment={createComment}
        post={post}
      ></UserComment>
    </div>
  );
}

function UserComment({ loggedUser, post, createComment }: UserCommentProps) {
  const [commentDescription, setCommentDescription] = useState("");
  const [showUserComment, setShowUserComment] = useState(false);
  const maxCharCount = 300;

  function onDescriptionChange(e: FormEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    setCommentDescription(target.value);
  }

  return (
    <div>
      <div
        className={
          showUserComment
            ? "bg-my-very-light p-2 relative rounded-xl mx-4 transition-all duration-300 mb-4"
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
            <Link href={`/users/${loggedUser.id}`}>
              <img
                className="w-10 h-10 rounded-full mt-2 ml-2 mr-4 hover:border-2 border-my-accent cursor-pointer duration-100 transition-all scale:110 hover:scale-100"
                src={loggedUser.avatarUrl}
                alt={"avatar_user_" + loggedUser.id}
              />
            </Link>
            <div className=" mt-1 flex flex-col">
              <Link
                href={`/users/${loggedUser.id}`}
                className="text-my-accent hover:text-my-text-light cursor-pointer duration-300 transition-colors font-medium"
              >
                {loggedUser.name} {loggedUser.surname}
              </Link>
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

          <div className="flex ml-auto mr-2 mb-2">
            <p
              className={
                (commentDescription.length > maxCharCount
                  ? "text-[#e43e3e]"
                  : "text-my-text-light") + "  pt-1 pr-4"
              }
            >
              {commentDescription.length} / {maxCharCount}
            </p>

            <button
              disabled={
                commentDescription === "" ||
                commentDescription.length > maxCharCount
              }
              onClick={() => {
                setShowUserComment(false);
                createComment(commentDescription);
              }}
              className={
                (commentDescription === "" ||
                commentDescription.length > maxCharCount
                  ? "pointer-events-none bg-my-light text-my-text-medium"
                  : "pointer-events-auto text-my-accent hover:text-[white] transition-all duration-300 hover:bg-my-dark bg-my-light") +
                " px-4 py-1 rounded-md items-center"
              }
            >
              <p>Submit</p>
            </button>
          </div>
        </div>
      </div>

      <div className={showUserComment ? "hidden" : "flex w-full"}>
        <button
          onClick={() => {
            setCommentDescription("");
            setShowUserComment(true);
          }}
          className="bg-my-very-light p-2 w-full mx-4 rounded-xl transition-all duration-300 mb-4 hover:bg-my-front-items hover:text-my-accent"
        >
          Add comment
        </button>
      </div>
    </div>
  );
}
