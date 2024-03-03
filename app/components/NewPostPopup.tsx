/* eslint-disable @next/next/no-img-element */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faUpload } from "@fortawesome/free-solid-svg-icons";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { PostContext } from "./ContextWrapper";
import { CurrentUser, USER_POST_ITEMS, UserPostItem } from "../consts";

interface Props {
  setScrollBlocked: Dispatch<SetStateAction<boolean>>;
  onNewPostAdded: (user: UserPostItem) => void;
}

export default function NewPostPopup({
  setScrollBlocked,
  onNewPostAdded,
}: Props) {
  const { isNewPostActive, setIsNewPostActive } = useContext(PostContext);

  const [show, setShow] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [postDescription, setPostDescription] = useState("");

  useEffect(() => {
    if (isNewPostActive) {
      setPostDescription("");
      setTimeout(() => {
        setShow(true);
      });
      setTimeout(() => {
        setShowItems(true);
      }, 100);
    }
  }, [isNewPostActive]);

  function createPost() {
    const post: UserPostItem = {
      id: USER_POST_ITEMS.length,
      userId: CurrentUser.id,
      likes: [],
      date: new Date(),
      description: postDescription,
      comments: [],
    };

    setScrollBlocked(false);
    onNewPostAdded(post);
    setIsNewPostActive(false);
  }

  function onDescriptionChange(e: FormEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    setPostDescription(target.value);
  }

  return (
    <div
      className={
        (isNewPostActive ? "w-full h-full z-30 bg-[#0000008c]" : "hidden") +
        " absolute transition-all duration-300"
      }
    >
      <div
        className={
          (show ? "w-1/3 h-2/6" : "w-0 h-0") +
          " bg-my-front-items rounded-md m-auto mt-20 items-center p-6 flex flex-col relative transition-all duration-300"
        }
      >
        <div className={showItems ? "flex flex-col w-full h-full" : "hidden"}>
          <button
            className="absolute top-4 right-4 hover:scale-110 transition-all duration-300 cursor-pointer text-my-text-light  hover:text-my-accent"
            onClick={() => {
              setShow(false);
              setShowItems(false);
              setScrollBlocked(false);
              setIsNewPostActive(false);
            }}
          >
            <FontAwesomeIcon
              className="w-5 h-5"
              icon={faClose}
            ></FontAwesomeIcon>
          </button>

          <p className="font-medium text-xl text-my-text-light text-center">
            New post creation
          </p>
          <textarea
            value={postDescription}
            onInput={(e) => onDescriptionChange(e)}
            className="bg-my-dark m-auto w-full min-h-36 max-h-40 rounded-md p-3"
            placeholder="Write your post description here!"
          ></textarea>
          <div className="flex justify-between w-full">
            <button className="flex bg-my-very-light px-4 py-1 rounded-md gap-2 items-center text-my-accent hover:text-[white] transition-all duration-300 hover:bg-my-dark">
              <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
              <p>Upload image</p>
            </button>
            <button
              disabled={postDescription === ""}
              onClick={() => createPost()}
              className={
                (postDescription === ""
                  ? "pointer-events-none bg-my-light text-my-text-medium"
                  : "pointer-events-auto text-my-accent hover:text-[white] transition-all duration-300 hover:bg-my-dark bg-my-very-light") +
                " flex  px-4 py-1 rounded-md gap-2 items-center"
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
