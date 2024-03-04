import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faCake,
  faCalendar,
  faGear,
  faGlobe,
  faHouse,
  faSuitcase,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export enum NavItemType {
  UserProfile,
  UserSettings,
  Other,
}

export enum UserProfileInfoType {
  Date,
  Birthday,
  Job,
  Place,
  Website,
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

export interface UserProfileData {
  info?: string;
  type: UserProfileInfoType;
  icon: IconDefinition;
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

export const CurrentUser: User = {
  id: 0,
  age: 16,
  isActive: true,
  name: "Grzegorz",
  surname: "Wiejniecki",
  description:
    "Description of the user, can be a little bit longer than name..",
  avatarUrl: "/avatars/avatar_temp.png",
  friends: [1, 3],
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
  {
    id: 4,
    age: 38,
    isActive: false,
    name: "Wojciech",
    surname: "Sardyniec",
    description:
      "Description of the user, can be a little bit longer than name..",
    avatarUrl: "/avatars/avatar_temp.png",
    friends: [2, 3, 4],
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
