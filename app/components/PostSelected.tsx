/* eslint-disable @next/next/no-img-element */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  useEffect,
  useRef,
  useState,
} from "react";
import { PostContext, UserContext } from "./ContextWrapper";
import { PostComment, User, UserPostItem } from "../consts";
import PostOptionsView from "./PostOptionsView";
import useClickOutside from "../hooks/useClickOutside";
import Link from "next/link";
import PostComments from "./PostComments";

interface Props {
  post: UserPostItem | undefined;
  onPostUpdated: (updatedPost: UserPostItem) => void;
  setScrollBlocked: Dispatch<SetStateAction<boolean>>;
}

interface UserCommentProps {
  onPostUpdated: (updatedPost: UserPostItem) => void;
  loggedUser: User;
  post: UserPostItem;
}

interface LikesProps {
  setShowLikesView: Dispatch<SetStateAction<boolean>>;
  showLikesView: boolean;
  postLikes?: number;
  post: UserPostItem;
  refToSet: any;
  users: User[];
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
  const { loggedUser, users } = useContext(UserContext);

  const commentsScrollListRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const maxScrollHeight = 450;

  useEffect(() => {
    setScrollHeight(commentsScrollListRef?.current?.scrollHeight ?? 0);
  }, [post, commentsScrollListRef]);

  useEffect(() => {
    return () => {
      setScrollBlocked(false);
      setIsPostSelected(false);
    };
  }, []);

  if (!post) return <></>;

  const userData = users[post.userId];

  function onLikeAdd() {
    if (!post) return;

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

  return (
    <div
      className={
        (isPostSelected ? "w-full h-full z-30 bg-my-front-items" : "hidden") +
        " fixed transition-all duration-300 flex justify-between xl:flex-row flex-col xl:overflow-hidden overflow-y-scroll"
      }
    >
      <div className="flex xl:w-3/4 relative bg-my-very-dark justify-between">
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
          className="rounded-md p-12 object-cover mx-auto"
          src={post?.imageUrl}
          alt={"post_image"}
        />
      </div>

      <div className="flex xl:w-1/4 bg-my-front-items relative ">
        <UserComment
          loggedUser={loggedUser}
          post={post}
          onPostUpdated={onPostUpdated}
        ></UserComment>
        <div
          className={
            (scrollHeight >= maxScrollHeight ? "xl:overflow-y-scroll" : "") +
            " bg-my-light relative w-full mb-64"
          }
        >
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
                className="text-my-accent hover:text-my-text-light cursor-pointer duration-300 transition-colors font-medium"
              >
                {userData.name} {userData.surname}
              </Link>
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
                    (post?.likes.includes(loggedUser.id)
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
                users={users}
              ></LikesAndUsers>
            </div>
            <div className="flex pr-6 pb-3 items-center gap-2">
              {post.comments.length}
              <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
            </div>
          </div>
          <PostComments
            showComments={true}
            users={users}
            scrollRef={commentsScrollListRef}
            post={post}
          ></PostComments>
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
  users,
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

function UserComment({ loggedUser, post, onPostUpdated }: UserCommentProps) {
  const [commentDescription, setCommentDescription] = useState("");
  const maxCharCount = 300;

  useEffect(() => {
    if (post) {
      setCommentDescription("");
    }
  }, [post]);

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

  function onDescriptionChange(e: FormEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    setCommentDescription(target.value);
  }

  return (
    <div>
      <div
        className={
          "bg-my-very-light z-10 p-2 absolute bottom-0 w-11/12 rounded-md xl:mx-4 ml-5 transition-all duration-300 xl:mb-4 mb-3"
        }
      >
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
            className="m-auto w-11/12 min-h-24 max-h-40 rounded-md p-3 bg-my-light"
            placeholder="Write your comment here!"
          ></textarea>

          <div className="flex ml-auto mr-2 ">
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
                {
                  setCommentDescription("");
                  createComment(commentDescription);
                }
              }}
              className={
                (commentDescription === "" ||
                commentDescription.length > maxCharCount
                  ? "pointer-events-none bg-my-light text-my-text-medium"
                  : "pointer-events-auto text-my-accent hover:text-[white] transition-all duration-300 hover:bg-my-dark bg-my-light") +
                " mb-2 px-4 py-1 rounded-md items-center"
              }
            >
              <p>Submit</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
