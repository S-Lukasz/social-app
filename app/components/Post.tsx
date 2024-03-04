/* eslint-disable @next/next/no-img-element */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserPostItem, PostComment, User } from "../consts";
import {
  faChevronDown,
  faClose,
  faComment,
  faEllipsis,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import useClickOutside from "../hooks/useClickOutside";
import Link from "next/link";
import { PostContext, UserContext } from "./ContextWrapper";

interface Props {
  onPostSelected: (post: UserPostItem) => void;
  post: UserPostItem;
}

interface LikesProps {
  setShowLikesView: Dispatch<SetStateAction<boolean>>;
  showLikesView: boolean;
  post: UserPostItem;
  users: User[];
  refToSet: any;
}

interface UserCommentProps {
  createComment: (newDescription: string) => void;
  loggedUser: User;
  post: UserPostItem;
}

interface CommentsProps {
  showComments: boolean;
  post: UserPostItem;
  users: User[];
}

export default function Post({ onPostSelected, post }: Props) {
  const {
    ref,
    isOpen: showLikesView,
    setIsOpen: setShowLikesView,
  } = useClickOutside();

  const [showComments, setShowComments] = useState(false);

  const { onPostUpdated } = useContext(PostContext);
  const { loggedUser, users } = useContext(UserContext);

  const userData = users[post.userId];

  function onLikeAdd() {
    if (!post) return;

    console.log("onLikeAdd", post.likes);

    if (!post.likes.includes(loggedUser.id)) {
      const newLike = loggedUser.id;
      const postClone = { ...post };
      postClone.likes = [...postClone.likes, newLike];

      onPostUpdated(postClone);
    } else {
      const index = post.likes.indexOf(loggedUser.id);
      if (index > -1) post.likes.splice(index, 1);

      onPostUpdated(post);
    }
  }

  function createComment(newDescription: string) {
    if (!post) return;

    const newComment: PostComment = {
      userId: loggedUser.id,
      likes: 0,
      date: new Date(),
      description: newDescription,
    };

    const postClone = { ...post, comments: [...post.comments, newComment] };
    onPostUpdated(postClone);
  }

  return (
    <div className="bg-my-light rounded-md relative">
      <FontAwesomeIcon
        className="h-5 w-5 absolute top-4 right-6 text-my-text-light hover:text-[white] cursor-pointer"
        icon={faEllipsis}
      />
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
        <div className="flex pl-6 pb-3 items-center gap-2 ">
          <button onClick={() => onLikeAdd()}>
            <FontAwesomeIcon
              className={
                (post.likes.includes(loggedUser.id)
                  ? "text-[#e45858] hover:text-[white]"
                  : "text-[white] hover:text-[#e45858]") +
                " duration-300 transition-all hover:scale-[0.95] hover:rotate-12"
              }
              icon={faHeart}
            ></FontAwesomeIcon>
          </button>

          <LikesAndUsers
            setShowLikesView={setShowLikesView}
            showLikesView={showLikesView}
            refToSet={ref}
            users={users}
            post={post}
          ></LikesAndUsers>
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
      <Comments
        showComments={showComments}
        post={post}
        users={users}
      ></Comments>
      <UserComment
        loggedUser={loggedUser}
        createComment={createComment}
        post={post}
      ></UserComment>
    </div>
  );
}

function Comments({ showComments, post, users }: CommentsProps) {
  const [loadLimit, setLoadLimit] = useState(3);
  const loadOffset = 3;

  return (
    <div
      className={
        (showComments ? "flex flex-col bg-my-light gap-2 mb-4" : " h-0") +
        " transition-all duration-300"
      }
    >
      {post.comments.slice(0, loadLimit).map((comment, i) => {
        const commentUserData = users[comment.userId];
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
                <Link href={`/users/${commentUserData.id}`} className="">
                  <img
                    className="w-10 h-10 rounded-full mt-2 ml-2 mr-4 hover:border-2 border-my-accent cursor-pointer duration-100 transition-all scale:110 hover:scale-100"
                    src={commentUserData.avatarUrl}
                    alt={"avatar_user_" + commentUserData.id}
                  />
                </Link>

                <div className=" mt-1 flex flex-col">
                  <p className="text-my-accent hover:text-my-text-light cursor-pointer duration-300 transition-colors font-medium">
                    {commentUserData.name} {commentUserData.surname}
                  </p>
                  <p className="text-my-text-light text-sm">
                    {post.date.toDateString()}
                  </p>
                </div>
              </div>

              <div className=" ml-16 p-2 break-words">
                {comment.description}
              </div>
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
  );
}

function UserComment({ loggedUser, post, createComment }: UserCommentProps) {
  const [commentDescription, setCommentDescription] = useState("");
  const [showUserComment, setShowUserComment] = useState(false);

  function onDescriptionChange(e: FormEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    setCommentDescription(target.value);
  }

  return (
    <div>
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
              src={loggedUser.avatarUrl}
              alt={"avatar_user_" + loggedUser.id}
            />
            <div className=" mt-1 flex flex-col">
              <p className="text-my-accent hover:text-my-text-light cursor-pointer duration-300 transition-colors font-medium">
                {loggedUser.name} {loggedUser.surname}
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
            onClick={() => {
              setShowUserComment(false);
              createComment(commentDescription);
            }}
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

function LikesAndUsers({
  setShowLikesView,
  refToSet,
  showLikesView,
  users,
  post,
}: LikesProps) {
  const maxLikeItemCount = 3;

  return (
    <div ref={refToSet}>
      <div className="flex relative ">
        <button
          onClick={() => setShowLikesView(!showLikesView)}
          className="hover:text-my-accent duration-300 transition-all"
        >
          {post.likes.length}
        </button>

        <div
          className={
            (showLikesView ? "h-auto w-72 max-h-60 p-4" : "h-0 w-0") +
            " absolute left-4 bottom-6 bg-my-very-light rounded-md flex overflow-y-auto transition-all duration-300"
          }
        >
          <div
            className={
              post.likes.length !== 0 || !showLikesView
                ? "hidden"
                : "basis-full shrink-0"
            }
          >
            No likes yet
          </div>

          <ul
            className={showLikesView ? " w-full flex flex-col gap-2" : "hidden"}
          >
            {post.likes.map((like, index) => {
              const userData = users[like];
              return (
                <li key={index}>
                  <button className="w-full h-full p-4 flex gap-3 items-center rounded-md bg-my-light hover:bg-my-front-items transition-colors duration-300 text-my-accent hover:text-my-text-light">
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
                  </button>
                </li>
              );
            })}
            <div
              className={
                post.likes.length <= maxLikeItemCount
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
