import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBookmark,
  faCake,
  faCalendar,
  faClose,
  faEdit,
  faEye,
  faEyeSlash,
  faGear,
  faGlobe,
  faHouse,
  faPhotoFilm,
  faRightFromBracket,
  faSuitcase,
  faTrash,
  faUser,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";

export enum NavItemType {
  UserProfile,
  UserSettings,
  Multimedia,
  Other,
  LogOut,
}

export enum UserProfileInfoType {
  Date,
  Birthday,
  Job,
  Place,
  Website,
}

export enum PostOptionType {
  RemovePost,
  Save,
  Hide,
  RemoveFriend,
  RemoveFromSaved,
  RemoveFromHidden,
}

export enum PostOptionUserType {
  IsLoggedUserOption,
  IsDefaultOption,
  IsOtherUserOption,
}

export enum CommentOptionType {
  Remove,
  Edit,
}

export interface User {
  id: number;
  isActive: boolean;
  age?: number;
  name: string;
  surname: string;
  description: string;
  avatarUrl: string;
  friends: number[];
  savedPosts: number[];
  hiddenPosts: number[];
}

export interface UserNavItem {
  name: string;
  icon: IconDefinition;
  description: string;
  hasBreakLine: boolean;
  type: NavItemType;
}

export interface UserPostItem {
  id: number;
  userId: number;
  likes: number[];
  date: Date;
  imageUrl?: string;
  description: string;
  comments: PostComment[];
}

export interface PostComment {
  id: number;
  userId: number;
  likes: number[];
  date: Date;
  imageUrl?: string;
  description: string;
}

export interface UserProfileData {
  info?: string;
  type: UserProfileInfoType;
  icon: IconDefinition;
}

export interface PostOptionData {
  info?: string;
  type: PostOptionType;
  icon: IconDefinition;
  userOptionType: PostOptionUserType;
  hasBreakLineTop: boolean;
  hasBreakLineBottom: boolean;
}

export interface CommentOptionData {
  info?: string;
  icon: IconDefinition;
  isUserOption: boolean;
  type: CommentOptionType;
}

export const UserProfileData: UserProfileData[] = [
  {
    info: new Date().toDateString(),
    type: UserProfileInfoType.Date,
    icon: faCalendar,
  },
  {
    info: new Date().toDateString(),
    type: UserProfileInfoType.Birthday,
    icon: faCake,
  },
  {
    info: "DHL Express",
    type: UserProfileInfoType.Job,
    icon: faSuitcase,
  },
  {
    info: "Warsaw",
    type: UserProfileInfoType.Place,
    icon: faHouse,
  },
  {
    info: "www.about-me.com",
    type: UserProfileInfoType.Website,
    icon: faGlobe,
  },
];

export const CommentOptions: CommentOptionData[] = [
  {
    info: "Remove comment",
    icon: faTrash,
    isUserOption: true,
    type: CommentOptionType.Remove,
  },
  {
    info: "Edit comment",
    icon: faEdit,
    isUserOption: true,
    type: CommentOptionType.Edit,
  },
];

export const PostOptions: PostOptionData[] = [
  {
    info: "Remove Post",
    type: PostOptionType.RemovePost,
    icon: faTrash,
    userOptionType: PostOptionUserType.IsLoggedUserOption,
    hasBreakLineTop: false,
    hasBreakLineBottom: true,
  },
  {
    info: "Save Post",
    type: PostOptionType.Save,
    icon: faBookmark,
    userOptionType: PostOptionUserType.IsDefaultOption,
    hasBreakLineTop: false,
    hasBreakLineBottom: false,
  },
  {
    info: "Remove from saved",
    type: PostOptionType.RemoveFromSaved,
    icon: faClose,
    userOptionType: PostOptionUserType.IsDefaultOption,
    hasBreakLineTop: false,
    hasBreakLineBottom: false,
  },
  {
    info: "Hide Post",
    type: PostOptionType.Hide,
    icon: faEyeSlash,
    userOptionType: PostOptionUserType.IsDefaultOption,
    hasBreakLineTop: false,
    hasBreakLineBottom: false,
  },
  {
    info: "Remove from hidden",
    type: PostOptionType.RemoveFromHidden,
    icon: faEye,
    userOptionType: PostOptionUserType.IsDefaultOption,
    hasBreakLineTop: false,
    hasBreakLineBottom: false,
  },
  {
    info: "Remove Friend",
    type: PostOptionType.RemoveFriend,
    icon: faUserMinus,
    userOptionType: PostOptionUserType.IsOtherUserOption,
    hasBreakLineTop: true,
    hasBreakLineBottom: false,
  },
];

export const CurrentUser: User = {
  id: 0,
  age: 16,
  isActive: true,
  name: "Grzegorz",
  surname: "Wiejniecki",
  description: "Make today so awesome that yesterday becomes jealous.",
  avatarUrl: "/avatars/avatar_temp.png",
  friends: [1, 3],
  savedPosts: [],
  hiddenPosts: [],
};

export const USERS: User[] = [
  CurrentUser,
  {
    id: 1,
    age: 28,
    isActive: true,
    name: "Andrzej",
    surname: "Brochmucki",
    description:
      "Description of the user, can be a little bit longer than name..",
    avatarUrl: "/avatars/avatar_temp.png",
    friends: [0, 1],
    savedPosts: [],
    hiddenPosts: [],
  },
  {
    id: 2,
    age: 42,
    isActive: true,
    name: "Anna",
    surname: "Starzec",
    description:
      "Description of the user, can be a little bit longer than name..",
    avatarUrl: "/avatars/avatar_temp.png",
    friends: [1, 3, 2],
    savedPosts: [],
    hiddenPosts: [],
  },
  {
    id: 3,
    age: 17,
    isActive: true,
    name: "Paulina",
    surname: "Grzebień",
    description:
      "Description of the user, can be a little bit longer than name..",
    avatarUrl: "/avatars/avatar_temp.png",
    friends: [0, 2],
    savedPosts: [],
    hiddenPosts: [],
  },
  {
    id: 4,
    age: 22,
    isActive: false,
    name: "Benedykt",
    surname: "Wieniec",
    description:
      "Description of the user, can be a little bit longer than name..",
    avatarUrl: "/avatars/avatar_temp.png",
    friends: [],
    savedPosts: [],
    hiddenPosts: [],
  },
  {
    id: 5,
    age: 38,
    isActive: false,
    name: "Wojciech",
    surname: "Sardyniec",
    description:
      "Description of the user, can be a little bit longer than name..",
    avatarUrl: "/avatars/avatar_temp.png",
    friends: [2, 3, 4],
    savedPosts: [],
    hiddenPosts: [],
  },
];

export const USER_NAV_ITEMS: UserNavItem[] = [
  {
    name: "My profile",
    description: "Edit photos, manage friends and create new posts.",
    hasBreakLine: false,
    type: NavItemType.UserProfile,
    icon: faUser,
  },
  {
    name: "Settings",
    description: "Setup your privacy, manage preferences and more.",
    hasBreakLine: true,
    type: NavItemType.UserSettings,
    icon: faGear,
  },
  {
    name: "Multimedia",
    description: "Manage your saved posts and other multimedia features.",
    hasBreakLine: false,
    type: NavItemType.Multimedia,
    icon: faPhotoFilm,
  },
  {
    name: "Log Out",
    description:
      "Ends the access to your profile on a website. Come back soon!",
    hasBreakLine: true,
    type: NavItemType.LogOut,
    icon: faRightFromBracket,
  },
];

export const USER_POST_ITEMS: UserPostItem[] = [
  {
    id: 0,
    userId: 0,
    likes: [1, 2, 0, 3],
    date: new Date(),
    imageUrl: "/posts/post_image_temp_1.png",
    description: "Great view and memories!",
    comments: [
      {
        id: 0,
        userId: 1,
        likes: [0, 1, 2],
        date: new Date(),
        description: "Really nice 😍!",
      },
      {
        id: 1,
        userId: 2,
        likes: [1, 2],
        date: new Date(),
        description: "Next time we will go there together 😜",
      },
    ],
  },
  {
    id: 1,
    userId: 0,
    likes: [1],
    date: new Date(),
    description: "User post item description 2.",
    comments: [
      {
        id: 0,
        userId: 1,

        likes: [1, 2],
        date: new Date(),
        description: "comment description 1 lorem ipsum",
      },
      {
        id: 1,
        userId: 2,

        likes: [1],
        date: new Date(),
        description: "comment description 2 lorem ipsum",
      },
      {
        id: 2,
        userId: 1,
        likes: [],
        date: new Date(),
        description: "comment description 3 lorem ipsum",
      },
      {
        id: 3,
        userId: 3,
        likes: [0, 2],
        date: new Date(),
        description: "comment description 4 lorem ipsum",
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    likes: [1, 0, 3, 2],
    date: new Date(),
    imageUrl: "/posts/post_image_temp_2.png",
    description: "Yesterday I took some Yoga classes, it was really fun!",
    comments: [
      {
        id: 0,
        userId: 1,
        likes: [1, 2],
        date: new Date(),
        description: "Wow! Really nice 😄.",
      },
    ],
  },
  {
    id: 3,
    userId: 1,
    likes: [1, 2, 3],
    date: new Date(),
    description: "User post item description 4.",
    comments: [
      {
        id: 0,
        userId: 1,
        likes: [1, 2],
        date: new Date(),
        description: "comment description 1",
      },
      {
        id: 1,
        userId: 2,
        likes: [1, 2],
        date: new Date(),
        description: "comment description 2",
      },
      {
        id: 2,
        userId: 1,
        likes: [1, 2],
        date: new Date(),
        description: "comment description 3",
      },
      {
        id: 3,
        userId: 0,
        likes: [1, 2, 3],
        date: new Date(),
        description: "comment description 4",
      },
    ],
  },
  {
    id: 4,
    userId: 4,
    likes: [1, 2, 3],
    date: new Date(),
    description: "Last year was really nice!",
    imageUrl: "/posts/post_image_temp_3.png",
    comments: [
      {
        id: 0,
        userId: 1,
        likes: [1, 2],
        date: new Date(),
        description: "Yeah 😊",
      },
      {
        id: 1,
        userId: 2,
        likes: [1, 2],
        date: new Date(),
        description: "Wow! Really nice 😄.",
      },
    ],
  },
];
