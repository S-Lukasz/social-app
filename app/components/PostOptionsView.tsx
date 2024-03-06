import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { PostContext, UserContext } from "./ContextWrapper";
import {
  PostOptionData,
  PostOptionType,
  PostOptionUserType,
  PostOptions,
  UserPostItem,
} from "../consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import useClickOutside from "../hooks/useClickOutside";

interface PostOptionsProps {
  post: UserPostItem;
}

export default function PostOptionsView({ post }: PostOptionsProps) {
  const {
    ref: optionsRef,
    isOpen: showOptionsView,
    setIsOpen: setShowOptionsView,
  } = useClickOutside();

  const { loggedUser, onUserUpdated } = useContext(UserContext);
  const { onPostRemoved } = useContext(PostContext);
  const [isLoggedUserPost, setIsLoggedUserPost] = useState(false);

  const showOption = (option: PostOptionData): boolean => {
    if (
      loggedUser.hiddenPosts.includes(post.id) &&
      option.type === PostOptionType.Hide
    ) {
      return false;
    }

    if (
      !loggedUser.hiddenPosts.includes(post.id) &&
      option.type === PostOptionType.RemoveFromHidden
    ) {
      return false;
    }

    if (
      loggedUser.savedPosts.includes(post.id) &&
      option.type === PostOptionType.Save
    ) {
      return false;
    }

    if (
      !loggedUser.savedPosts.includes(post.id) &&
      option.type === PostOptionType.RemoveFromSaved
    ) {
      return false;
    }

    if (
      option.type === PostOptionType.RemoveFriend &&
      !loggedUser.friends.includes(post.userId)
    )
      return false;

    if (option.userOptionType === PostOptionUserType.IsDefaultOption)
      return true;
    else if (
      option.userOptionType === PostOptionUserType.IsLoggedUserOption &&
      isLoggedUserPost
    )
      return true;
    else if (
      option.userOptionType === PostOptionUserType.IsOtherUserOption &&
      !isLoggedUserPost
    )
      return true;

    return false;
  };

  function onPostOptionSelect(option: PostOptionData) {
    if (option.type === PostOptionType.RemoveFriend) {
      removeFriend(post.userId);
    } else if (option.type === PostOptionType.RemovePost) {
      onPostRemoved(post);
    } else if (option.type === PostOptionType.Save) {
      savePost();
    } else if (option.type === PostOptionType.Hide) {
      hidePost();
    } else if (option.type === PostOptionType.RemoveFromSaved) {
      removeSavedPost();
    } else if (option.type === PostOptionType.RemoveFromHidden) {
      removeHiddenPost();
    }

    setShowOptionsView(false);
  }

  function removeHiddenPost() {
    const userClone = {
      ...loggedUser,
      hiddenPosts: loggedUser.hiddenPosts.filter((p) => p !== post.id),
    };

    onUserUpdated(userClone);
  }

  function removeSavedPost() {
    const userClone = {
      ...loggedUser,
      savedPosts: loggedUser.savedPosts.filter((p) => p !== post.id),
    };
    onUserUpdated(userClone);
  }

  function savePost() {
    const userClone = {
      ...loggedUser,
      savedPosts: [post.id, ...loggedUser.savedPosts],
    };

    onUserUpdated(userClone);
  }

  function hidePost() {
    const userClone = {
      ...loggedUser,
      hiddenPosts: [post.id, ...loggedUser.hiddenPosts],
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

  useEffect(() => {
    setIsLoggedUserPost(post.userId === loggedUser.id);
  }, [loggedUser, post]);

  return (
    <div ref={optionsRef} className="absolute top-4 right-6 ">
      <button onClick={() => setShowOptionsView(!showOptionsView)}>
        <FontAwesomeIcon
          className="h-5 w-5 text-my-text-light hover:text-[white] "
          icon={faEllipsis}
        />
      </button>

      <div
        className={
          (showOptionsView ? "h-auto w-72 max-h-60 p-4 z-10" : "h-0 w-0") +
          " absolute right-4 top-6 bg-my-very-light rounded-md flex shadow-[#00000049] shadow-lg"
        }
      >
        <ul
          className={showOptionsView ? " w-full flex flex-col gap-2" : "hidden"}
        >
          {PostOptions.map((option, index) => {
            return (
              <li
                key={"post_option_key_" + index}
                className={showOption(option) ? "group" : "hidden"}
              >
                <div
                  className={
                    option.hasBreakLineTop
                      ? "border-b border-my-text-medium w-full mb-2"
                      : "hidden"
                  }
                ></div>
                <button
                  onClick={() => onPostOptionSelect(option)}
                  className="group-hover:bg-my-light rounded-md p-2 flex w-full gap-4 items-center transition-color duration-300"
                >
                  <FontAwesomeIcon
                    icon={option.icon}
                    className="text-my-text-light h-5 w-5 group-hover:text-my-accent transition-color duration-300"
                  ></FontAwesomeIcon>
                  <p>{option.info}</p>
                </button>
                <div
                  className={
                    option.hasBreakLineBottom
                      ? "border-b border-my-text-medium w-full mt-2"
                      : "hidden"
                  }
                ></div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
