export interface User {
  id: number;
  isActive: boolean;
  age?: number;
  name: string;
  surname: string;
  description: string;
  avatarUrl: string;
}

export interface UserNavItem {
  name: string;
  description: string;
}

export interface UserPostItem {
  userId: number;
  date: Date;
  imageUrl?: string;
  description: string;
}

export const USERS: User[] = [
  {
    id: 0,
    age: 28,
    isActive: true,
    name: "Andrzej",
    surname: "Brochmucki",
    description: "I like cats.",
    avatarUrl: "/avatars/avatar_temp.png",
  },
  {
    id: 1,
    age: 42,
    isActive: true,
    name: "Anna",
    surname: "Starzec",
    description: "I like dogs.",
    avatarUrl: "/avatars/avatar_temp.png",
  },
  {
    id: 2,
    age: 22,
    isActive: false,
    name: "Benedykt",
    surname: "Wieniec",
    description: "I am special specialist at UJ.",
    avatarUrl: "/avatars/avatar_temp.png",
  },
];

export const USER_NAV_ITEMS: UserNavItem[] = [
  {
    name: "User item 1",
    description: "User nav item description, so can be longer",
  },
  {
    name: "User item 2",
    description: "User nav item description, so can be longer",
  },
  {
    name: "User item 2",
    description: "User nav item description, so can be longer",
  },
];

export const USER_POST_ITEMS: UserPostItem[] = [
  {
    userId: 0,
    date: new Date(),
    imageUrl: "/posts/post_image_temp_1.png",
    description:
      "User post item description 1, so can be long, lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsum ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
  },
  {
    userId: 0,
    date: new Date(),
    description:
      "User post item description 2, so can be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsum ipsum lorem ipsum",
  },
  {
    userId: 2,
    date: new Date(),
    imageUrl: "/posts/post_image_temp_2.png",
    description: "User post item description 3",
  },
  {
    userId: 1,
    date: new Date(),
    description:
      "User post item description 4   be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum l  be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum l be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum l  be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum l  be long, lorem ipsum lorem ipsum lorem ipsum m lorem lorem ipsum lorem ipsum l",
  },
];
