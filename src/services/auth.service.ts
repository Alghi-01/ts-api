import AppError from "../errors/AppError";
import prisma from "../prisma/client";
import {
  IEmailPassword,
  IUsernamePassword,
  UserTokenType,
} from "../types/user.type";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser: {
  (payload: IEmailPassword): Promise<UserTokenType>;
  (payload: IUsernamePassword): Promise<UserTokenType>;
} = async (
  payload: IEmailPassword | IUsernamePassword
): Promise<UserTokenType> => {
  let user;

  if ("email" in payload) {
    user = await prisma.users.findUnique({ where: { email: payload.email } });
  } else if ("username" in payload) {
    user = await prisma.users.findUnique({
      where: { username: payload.username },
    });
  }

  console.log("test login", user);

  if (!user) {
    throw new AppError("Invalid credential account, user not found", 404);
  }

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credential, password wrong", 401);
  }

  const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
    expiresIn: "1h",
  });

  return {
    ...user,
    token,
  };
};
