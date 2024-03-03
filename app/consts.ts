import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBars, faGear, faUser } from "@fortawesome/free-solid-svg-icons";

export enum NavItemType {
  UserProfile,
  UserSettings,
  Other,
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
  userId: number;
  likes: number;
  date: Date;
  imageUrl?: string;
  description: string;
}

export const CurrentUser: User = {
  id: 0,
  age: 16,
  isActive: true,
  name: "Grzegorz",
  surname: "Wiejniecki",
  description:
    "Description of the user, can be a little bit longer than name..",
  avatarUrl: "/avatars/avatar_temp.png",
  friends: [],
};

export const USERS: User[] = [
  {
    id: 0,
    age: 16,
    isActive: true,
    name: "Grzegorz",
    surname: "Wiejniecki",
    description:
      "Description of the user, can be a little bit longer than name..",
    avatarUrl: "/avatars/avatar_temp.png",
    friends: [1, 2],
  },
  {
    id: 1,
    age: 28,
    isActive: true,
    name: "Andrzej",
    surname: "Brochmucki",
    description:
      "Description of the user, can be a little bit longer than name..",
    avatarUrl: "/avatars/avatar_temp.png",
    friends: [0],
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
    friends: [1],
  },
  {
    id: 3,
    age: 22,
    isActive: false,
    name: "Benedykt",
    surname: "Wieniec",
    description:
      "Description of the user, can be a little bit longer than name..",
    avatarUrl: "/avatars/avatar_temp.png",
    friends: [],
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
    name: "User item 2",
    description: "User nav item description, so can be longer",
    hasBreakLine: true,
    type: NavItemType.UserSettings,
    icon: faGear,
  },
  {
    name: "User item 3",
    description: "User nav item description, so can be longer",
    hasBreakLine: false,
    type: NavItemType.Other,
    icon: faBars,
  },
  {
    name: "User item 4",
    description: "User nav item description, so can be longer",
    hasBreakLine: false,
    type: NavItemType.Other,
    icon: faBars,
  },
  {
    name: "User item 3",
    description: "User nav item description, so can be longer",
    hasBreakLine: true,
    type: NavItemType.Other,
    icon: faBars,
  },
  {
    name: "User item 4",
    description: "User nav item description, so can be longer",
    hasBreakLine: false,
    type: NavItemType.Other,
    icon: faBars,
  },
];

export const USER_POST_ITEMS: UserPostItem[] = [
  {
    id: 0,
    userId: 0,
    likes: [1, 2, 0, 3],
    date: new Date(),
    imageUrl: "/posts/post_image_temp_1.png",
    description:
      "User post item description 1, so can be long, lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsum ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    comments: [
      {
        userId: 1,
        likes: 20,
        date: new Date(),
        description:
          "comment description 1 lorem ipsum comment description 1 lorem ipsum comment description 1 lorem ipsumcomment description 1 lorem ipsum comment description 1 lorem ipsum",
      },
      {
        userId: 2,
        likes: 4,
        date: new Date(),
        description:
          "comment description 2 lorem ipsum comment description 2 lorem ipsumcomment description 2 lorem ipsum comment description 2 lorem ipsum",
      },
      {
        userId: 1,
        likes: 114,
        date: new Date(),
        description: "comment description 3 lorem ipsum",
      },
    ],
  },
  {
    id: 1,
    userId: 0,
    likes: [1],
    date: new Date(),
    description:
      "User post item description 2, so can be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsum ipsum lorem ipsum",
    comments: [
      {
        userId: 1,
        likes: 20,
        date: new Date(),
        description: "comment description 1 lorem ipsum",
      },
      {
        userId: 2,
        likes: 4,
        date: new Date(),
        description: "comment description 2 lorem ipsum",
      },
      {
        userId: 1,
        likes: 114,
        date: new Date(),
        description: "comment description 3 lorem ipsum",
      },
      {
        userId: 3,
        likes: 2,
        date: new Date(),
        description: "comment description 4 lorem ipsum",
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    likes: [1, 0, 3],
    date: new Date(),
    imageUrl: "/posts/post_image_temp_2.png",
    description: "User post item description 3",
    comments: [
      {
        userId: 1,
        likes: 20,
        date: new Date(),
        description: "comment description 1 lorem ipsum",
      },
    ],
  },
  {
    id: 3,
    userId: 1,
    likes: [1, 2, 3],
    date: new Date(),
    description:
      "User post item description 4   be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum l  be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum l be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum l  be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum l  be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum l",
    comments: [
      {
        userId: 1,
        likes: 20,
        date: new Date(),
        description: "comment description 1 lorem ipsum",
      },
      {
        userId: 2,
        likes: 4,
        date: new Date(),
        description: "comment description 2 lorem ipsum",
      },
      {
        userId: 1,
        likes: 114,
        date: new Date(),
        description: "comment description 3 lorem ipsum",
      },
      {
        userId: 0,
        likes: 3,
        date: new Date(),
        description: "comment description 4 lorem ipsum",
      },
    ],
  },
];
