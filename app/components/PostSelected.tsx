/* eslint-disable @next/next/no-img-element */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faClose,
  faComment,
  faEllipsis,
  faHeart,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PostContext } from "./ContextWrapper";
import { CurrentUser, PostComment, USERS, UserPostItem } from "../consts";
import useClickOutside from "../hooks/useClickOutside";

interface Props {
  post: UserPostItem | undefined;
  onPostUpdated: (updatedPost: UserPostItem) => void;
  setScrollBlocked: Dispatch<SetStateAction<boolean>>;
}

interface CommentsProps {
  commentsRef: RefObject<HTMLDivElement>;
  post: UserPostItem;
}

interface UserCommentProps {
  onPostUpdated: (updatedPost: UserPostItem) => void;
  post: UserPostItem;
}

interface LikesProps {
  setShowLikesView: Dispatch<SetStateAction<boolean>>;
  showLikesView: boolean;
  postLikes?: number;
  post: UserPostItem;
  refToSet: any;
}

export default function PostSelected({
  onPostUpdated,
  setScrollBlocked,
  post,
}: Props) {
  const {
    ref,
    isOpen: showLikesView,
    setIsOpen: setShowLikesView,
  } = useClickOutside();

  const { isPostSelected, setIsPostSelected } = useContext(PostContext);

  const commentsScrollListRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const maxScrollHeight = 500;

  useEffect(() => {
    setScrollHeight(commentsScrollListRef?.current?.scrollHeight ?? 0);
  }, [post, commentsScrollListRef]);

  if (!post) return <></>;

  const userData = USERS[post.userId];

  function onLikeAdd() {
    if (!post) return;

    if (!post.likes.includes(CurrentUser.id)) {
      const newLike = CurrentUser.id;
      const postClone = { ...post };
      postClone.likes = [...postClone.likes, newLike];

      onPostUpdated(postClone);
    } else {
      const index = post.likes.indexOf(CurrentUser.id);
      if (index > -1) post.likes.splice(index, 1);

      onPostUpdated(post);
    }
  }

  return (
    <div
      className={
        (isPostSelected ? "w-full h-full z-30 bg-my-front-items" : "hidden") +
        " fixed transition-all duration-300 flex justify-between"
      }
    >
      <div className="flex w-3/4 relative bg-my-very-dark justify-between">
        <button
          onClick={() => {
            setScrollBlocked(false);
            setIsPostSelected(false);
          }}
          className="absolute left-3 top-3 flex w-6 h-6  text-my-text-medium hover:text-my-accent transition-colors duration-300 items-center justify-center"
        >
          <FontAwesomeIcon
            className="w-6 h-6 p-2"
            icon={faClose}
          ></FontAwesomeIcon>
        </button>

        <img
          className="rounded-md p-12 object-cover m-auto"
          src={post?.imageUrl}
          alt={"post_image"}
        />
      </div>

      <div className="flex w-1/4 bg-my-front-items relative ">
        <UserComment post={post} onPostUpdated={onPostUpdated}></UserComment>

        <div
          className={
            (scrollHeight >= maxScrollHeight ? "overflow-y-scroll" : "") +
            " bg-my-light rounded-md relative w-full  mb-64"
          }
        >
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
                {post?.date.toDateString()}
              </p>
            </div>
          </div>
          <div className="bg-my-front-items m-4 rounded-md flex flex-col">
            <p className="p-4 break-words">{post?.description}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex pl-6 pb-3 items-center gap-2 ">
              <button onClick={() => onLikeAdd()}>
                <FontAwesomeIcon
                  className={
                    (post?.likes.includes(CurrentUser.id)
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
                post={post}
              ></LikesAndUsers>
            </div>
            <div className="flex pr-6 pb-3 items-center gap-2">
              {post.comments.length}
              <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
            </div>
          </div>
          <Comments commentsRef={commentsScrollListRef} post={post}></Comments>
        </div>
      </div>
    </div>
  );
}

function LikesAndUsers({
  setShowLikesView,
  refToSet,
  showLikesView,
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
            " absolute left-4 top-6 z-30 bg-my-very-light rounded-md flex overflow-y-auto transition-all duration-300"
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
              const userData = USERS[like];
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

function Comments({ commentsRef, post }: CommentsProps) {
  const [loadLimit, setLoadLimit] = useState(3);
  const loadOffset = 3;

  return (
    <div className="flex flex-col relative items-center">
      <div
        ref={commentsRef}
        className="flex flex-col bg-my-light gap-2 mb-4 mt-2 w-full transition-all duration-300"
      >
        {post.comments.slice(0, loadLimit).map((comment, i) => {
          const commentUserData = USERS[comment.userId];
          return (
            <div
              key={"comment_key_" + i + "_on_post_" + comment.userId}
              className={
                "bg-my-very-light p-2 rounded-md mx-4 h-full transition-all duration-300"
              }
            >
              <div className={"flex flex-col"}>
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
            loadLimit >= post.comments.length
              ? "hidden"
              : " cursor-pointer text-my-accent ml-auto mr-10 mb-2 mt-1 flex items-center gap-2 hover:text-[white] transition-all duration-300"
          }
        >
          <p>show more</p>
          <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
        </button>
        <div className="min-h-[1px]"></div>
      </div>
    </div>
  );
}

function UserComment({ post, onPostUpdated }: UserCommentProps) {
  const [commentDescription, setCommentDescription] = useState("");

  useEffect(() => {
    if (post) {
      setCommentDescription("");
    }
  }, [post]);

  function createComment(newDescription: string) {
    if (!post) return;

    const newComment: PostComment = {
      userId: CurrentUser.id,
      likes: 0,
      date: new Date(),
      description: newDescription,
    };

    const postClone = { ...post, comments: [...post.comments, newComment] };
    console.log(
      "newComment: ",
      newComment,
      "postClone.comments ",
      postClone.comments
    );

    onPostUpdated(postClone);
  }

  function onDescriptionChange(e: FormEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    setCommentDescription(target.value);
  }

  return (
    <div>
      <div
        className={
          "bg-my-very-light z-40 p-2 absolute bottom-0 w-11/12 rounded-md mx-4 transition-all duration-300 mb-4"
        }
      >
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
            className="m-auto w-11/12 min-h-24 max-h-40 rounded-md p-3 bg-my-light"
            placeholder="Write your comment here!"
          ></textarea>

          <button
            disabled={commentDescription === ""}
            onClick={() => {
              {
                setCommentDescription("");
                createComment(commentDescription);
              }
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
    </div>
  );
}
