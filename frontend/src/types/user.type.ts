export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
};

export type UserContext = Omit<User, "password">;

export type Friend = Omit<User, "email" | "password">;

export type UserFriend = {
  is_accepted?: boolean;
} & Friend;
