export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
};

export type UserContext = Omit<User, "password">;

export type UserFriend = Omit<User, "email" | "password">;
