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
  description: "Love yourself..",
  avatarUrl: "/avatars/avatar_temp.png",
};

export const USERS: User[] = [
  {
    id: 0,
    age: 16,
    isActive: true,
    name: "Grzegorz",
    surname: "Wiejniecki",
    description: "Love yourself..",
    avatarUrl: "/avatars/avatar_temp.png",
  },
  {
    id: 1,
    age: 28,
    isActive: true,
    name: "Andrzej",
    surname: "Brochmucki",
    description: "I like cats.",
    avatarUrl: "/avatars/avatar_temp.png",
  },
  {
    id: 2,
    age: 42,
    isActive: true,
    name: "Anna",
    surname: "Starzec",
    description: "I like dogs.",
    avatarUrl: "/avatars/avatar_temp.png",
  },
  {
    id: 3,
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
