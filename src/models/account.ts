import { Guid } from "guid-typescript";

export interface User {
  token: string;
  type: string;
  username: string;
  fullName: string;
  roles: string[];
  accessToken: string;
  tokenType: string;
}

export interface ILoginInput {
  password: string;
  username: string;
}