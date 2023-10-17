export interface IUser {
  email: string;
  password: string;
  role: string;
  token: string;
  displayName: string;
  googleId?: string;
  avatar: string | null;
}
