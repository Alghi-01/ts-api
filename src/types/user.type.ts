export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export type UserIdentifierType = { id: string } | { email: string };

export type PortType = number | string;
