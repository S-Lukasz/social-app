/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CommentOptionData,
  CommentOptionType,
  CommentOptions,
  PostComment,
  User,
  UserPostItem,
} from "../consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faClose,
  faEllipsis,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { PostContext, UserContext } from "./ContextWrapper";
import useClickOutside from "../hooks/useClickOutside";
import LikesAndUsers from "./LikesAndUsers";

interface CommentsProps {
  showComments: boolean;
  post: UserPostItem;
  users: User[];
}

interface CommentItemProps {
  comment: PostComment;
  showComments: boolean;
  commentUserData: User;
  post: UserPostItem;
  editedComment: number;
  commentDescription: string;
  setCommentDescription: Dispatch<SetStateAction<string>>;
  onCommentEdited: (comment: PostComment) => void;
}

interface CommentOptionsProps {
  setEditedComment: Dispatch<SetStateAction<number>>;
  setCommentDescription: Dispatch<SetStateAction<string>>;
  editedComment: number;
  comment: PostComment;
  post: UserPostItem;
}

export default function PostComments({
  showComments,
  post,
  users,
}: CommentsProps) {
  const { onPostUpdated } = useContext(PostContext);

  const [commentDescription, setCommentDescription] = useState("");
  const [editedComment, setEditedComment] = useState(-1);
  const [loadLimit, setLoadLimit] = useState(3);

  const loadOffset = 3;

  function onCommentEdited(comment: PostComment) {
    const updatedComment: PostComment = {
      id: comment.id,
      userId: comment.userId,
      likes: comment.likes,
      date: comment.date,
      description: commentDescription,
    };

    const updatedComments = post.comments.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );

    const postClone = { ...post, comments: updatedComments };

    onPostUpdated(postClone);
    setEditedComment(-1);
  }

  return (
    <div
      className={
        (showComments ? "flex flex-col bg-my-light gap-3 mb-4" : " h-0") +
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
                ? "bg-my-very-light p-2 rounded-2xl mx-4 h-full"
                : "h-0") + " transition-all duration-300 relative"
            }
          >
            <CommentOptionsView
              editedComment={editedComment}
              setEditedComment={setEditedComment}
              setCommentDescription={setCommentDescription}
              comment={comment}
              post={post}
            ></CommentOptionsView>

            <CommentItem
              comment={comment}
              showComments={showComments}
              commentUserData={commentUserData}
              post={post}
              editedComment={editedComment}
              commentDescription={commentDescription}
              setCommentDescription={setCommentDescription}
              onCommentEdited={onCommentEdited}
            ></CommentItem>
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

function CommentItem({
  comment,
  showComments,
  commentUserData,
  post,
  editedComment,
  commentDescription,
  setCommentDescription,
  onCommentEdited,
}: CommentItemProps) {
  const maxCharCount = 300;

  function onDescriptionChange(e: FormEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    setCommentDescription(target.value);
  }

  const {
    ref: likesRef,
    isOpen: showLikesView,
    setIsOpen: setShowLikesView,
  } = useClickOutside();

  return (
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
          <Link
            href={`/users/${commentUserData.id}`}
            className="text-my-accent hover:text-my-text-light cursor-pointer duration-300 transition-colors font-medium"
          >
            {commentUserData.name} {commentUserData.surname}
          </Link>
          <p className="text-my-text-light text-sm">
            {post.date.toDateString()}
          </p>
        </div>
      </div>

      <div
        className={
          editedComment === comment.id && editedComment !== -1
            ? "hidden"
            : "ml-16 p-2 break-words"
        }
      >
        {comment.description}

        <div className="flex items-center absolute bottom-2 right-3">
          <LikesAndUsers
            setShowLikesView={setShowLikesView}
            showLikesView={showLikesView}
            comment={comment}
            refToSet={likesRef}
            post={post}
          ></LikesAndUsers>
        </div>
      </div>

      <div
        className={
          editedComment === comment.id && editedComment !== -1
            ? "ml-16 px-2 pt-2 break-words items-end flex flex-col gap-2"
            : "hidden"
        }
      >
        <textarea
          value={commentDescription}
          onInput={(e) => onDescriptionChange(e)}
          className="bg-my-light m-auto w-full min-h-28 max-h-28 rounded-md p-3"
          placeholder="Write your post description here!"
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
              commentDescription.length === 0 ||
              commentDescription.length > maxCharCount
            }
            onClick={() => onCommentEdited(comment)}
            className={
              (commentDescription.length === 0 ||
              commentDescription.length > maxCharCount
                ? "bg-my-text-dark text-my-text-medium"
                : "bg-my-light hover:bg-my-front-items") +
              " rounded-md px-4 py-1 transition-colors duration-300"
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentOptionsView({
  setCommentDescription,
  setEditedComment,
  editedComment,
  comment,
  post,
}: CommentOptionsProps) {
  const { loggedUser } = useContext(UserContext);
  const { onPostUpdated } = useContext(PostContext);
  const [isLoggedUserComment, setIsLoggedUserComment] = useState(false);

  const {
    ref: optionsRef,
    isOpen: showOptionsView,
    setIsOpen: setShowOptionsView,
  } = useClickOutside();

  const showOption = (option: CommentOptionData): boolean => {
    if (option.type === CommentOptionType.Edit) {
      return true;
    } else if (option.type === CommentOptionType.Remove) {
      return true;
    }

    return false;
  };

  function onPostOptionSelect(option: CommentOptionData) {
    if (option.type === CommentOptionType.Edit) {
      onCommentEdit();
    } else if (option.type === CommentOptionType.Remove) {
      removeComment();
    }

    setShowOptionsView(false);
  }

  function removeComment() {
    const postClone = {
      ...post,
      comments: post.comments.filter((c) => c.id !== comment.id),
    };
    onPostUpdated(postClone);
  }

  function onCommentEdit() {
    setCommentDescription(comment.description);
    setEditedComment(comment.id);
  }

  function cancelCommentEdit() {
    setCommentDescription("");
    setEditedComment(-1);
  }

  useEffect(() => {
    setIsLoggedUserComment(comment.userId === loggedUser.id);
  }, [loggedUser, comment]);

  return (
    <div
      ref={optionsRef}
      className={isLoggedUserComment ? "absolute top-4 right-6 " : "hidden"}
    >
      <button
        className={editedComment !== -1 ? "hidden" : ""}
        onClick={() => setShowOptionsView(!showOptionsView)}
      >
        <FontAwesomeIcon
          className="h-5 w-5 text-my-text-light hover:text-[white] "
          icon={faEllipsis}
        />
      </button>
      <button
        className={editedComment !== -1 ? "" : "hidden"}
        onClick={() => cancelCommentEdit()}
      >
        <FontAwesomeIcon
          className="h-5 w-5 text-my-text-light hover:text-[white] "
          icon={faClose}
        />
      </button>
      <div
        className={
          (showOptionsView ? "h-auto w-72 max-h-60 p-4 z-10" : "h-0 w-0") +
          " absolute right-4 top-6 bg-my-light rounded-md flex shadow-[#00000049] shadow-lg"
        }
      >
        <ul
          className={showOptionsView ? " w-full flex flex-col gap-2" : "hidden"}
        >
          {CommentOptions.map((option, index) => {
            return (
              <li
                key={"post_option_key_" + index}
                className={showOption(option) ? "group" : "hidden"}
              >
                <button
                  onClick={() => onPostOptionSelect(option)}
                  className="group-hover:bg-my-very-light rounded-md p-1 text-base flex w-full gap-3 items-center transition-color duration-300"
                >
                  <FontAwesomeIcon
                    icon={option.icon}
                    className="text-my-text-light ml-2 h-4 w-4 group-hover:text-my-accent transition-color duration-300"
                  ></FontAwesomeIcon>
                  <p>{option.info}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
