export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type UserContext = Omit<User, "password">;
