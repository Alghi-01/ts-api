import { users } from "../../prisma/generated/client";

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export type SafeUserType = Omit<users, "password" | "id">;

export type UserIdentifierType = { id: string } | { email: string };

export type PortType = number | string;

export type UserTokenType = users & { token: string };

export interface IEmailPassword {
  email: string;
  password: string;
}

export interface IUsernamePassword {
  username: string;
  password: string;
}
