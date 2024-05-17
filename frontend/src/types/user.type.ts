export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  image: string;
};

export type UserContext = Omit<User, "password">;

export type Friend = Omit<User, "email" | "password">;

export type UserFriend = {
  request_id: number;
  is_accepted?: boolean;
  is_requested_by_user: boolean;
} & Friend;
