import { ILoginInput, User } from "@/models/account";
import { requests } from "./BaseApi";

export const Account = {
  loginByPassword: (data: ILoginInput) => requests.post<User>("/auth/signin", data),
  current: () => requests.get<User>("/auth/current"),
  refreshToken: () => requests.post<User>("/accout/refresh", {}),
};
