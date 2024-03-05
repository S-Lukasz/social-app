/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { PostComment, User, UserPostItem } from "../consts";
import Link from "next/link";
import { PostContext, UserContext } from "./ContextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface LikesProps {
  setShowLikesView: Dispatch<SetStateAction<boolean>>;
  showLikesView: boolean;
  post: UserPostItem;
  comment?: PostComment;
  refToSet: any;
}

export default function LikesAndUsers({
  setShowLikesView,
  refToSet,
  showLikesView,
  post,
  comment,
}: LikesProps) {
  const { users, loggedUser } = useContext(UserContext);
  const { onPostUpdated } = useContext(PostContext);
  const [likesToDisplay, setLikesToDisplay] = useState<number[]>([]);

  const maxLikeItemCount = 3;

  useEffect(() => {
    if (comment) setLikesToDisplay(comment.likes);
    else setLikesToDisplay(post.likes);
  }, [comment, post]);

  function onLikeAdd() {
    if (comment) {
      if (!comment.likes.includes(loggedUser.id)) {
        const newLike = loggedUser.id;
        const updatedComment: PostComment = {
          ...comment,
          likes: [...comment.likes, newLike],
        };

        const updatedComments = post.comments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment
        );

        const postClone = { ...post, comments: updatedComments };

        onPostUpdated(postClone);
      } else {
        const index = comment.likes.indexOf(loggedUser.id);
        if (index > -1) {
          const updatedComment: PostComment = {
            ...comment,
            likes: comment.likes.filter((likeId) => likeId !== loggedUser.id),
          };

          const updatedComments = post.comments.map((comment) =>
            comment.id === updatedComment.id ? updatedComment : comment
          );
          const postClone = { ...post, comments: updatedComments };
          onPostUpdated(postClone);
        }
      }
    } else {
      if (!likesToDisplay.includes(loggedUser.id)) {
        const newLike = loggedUser.id;
        const postClone = { ...post };
        postClone.likes = [...postClone.likes, newLike];

        onPostUpdated(postClone);
      } else {
        const index = likesToDisplay.indexOf(loggedUser.id);
        if (index > -1) likesToDisplay.splice(index, 1);

        onPostUpdated(post);
      }
    }
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => onLikeAdd()}>
        <FontAwesomeIcon
          className={
            (likesToDisplay.includes(loggedUser.id)
              ? "text-[#e45858] hover:text-[white]"
              : "text-[white] hover:text-[#e45858]") +
            " duration-300 transition-all hover:scale-[0.95] hover:rotate-12"
          }
          icon={faHeart}
        ></FontAwesomeIcon>
      </button>

      <div ref={refToSet} className="flex relative ">
        <button
          onClick={() => setShowLikesView(!showLikesView)}
          className="hover:text-my-accent duration-300 transition-all"
        >
          {likesToDisplay.length}
        </button>

        <div
          className={
            (showLikesView ? "h-auto w-72 max-h-60 p-4" : "h-0 w-0") +
            " absolute left-4 bottom-6 bg-my-very-light rounded-md flex overflow-y-auto transition-all duration-300 shadow-[#00000048] shadow-md"
          }
        >
          <div
            className={
              likesToDisplay.length !== 0 || !showLikesView
                ? "hidden"
                : "basis-full shrink-0"
            }
          >
            No likes yet
          </div>

          <ul
            className={showLikesView ? " w-full flex flex-col gap-2" : "hidden"}
          >
            {likesToDisplay.map((like, index) => {
              const userData = users[like];
              return (
                <li key={index}>
                  <Link
                    href={`/users/${userData.id}`}
                    className="w-full h-full p-4 flex gap-3 items-center rounded-md bg-my-light hover:bg-my-front-items transition-colors duration-300 text-my-accent hover:text-my-text-light"
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={userData.avatarUrl}
                      alt={"avatar_user_" + userData.id}
                    />
                    <div className="flex flex-col">
                      <p className="font-medium">
                        {userData.name} {userData.surname}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
            <div
              className={
                likesToDisplay.length <= maxLikeItemCount
                  ? "hidden"
                  : "min-h-1 w-full flex"
              }
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
