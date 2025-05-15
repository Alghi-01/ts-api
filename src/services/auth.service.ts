import prisma from "../prisma/client";
import { UserTokenType } from "../types/user.type";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (
  email: string,
  password: string
): Promise<UserTokenType> => {
  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid credential account, user not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credential, password wrong");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
    expiresIn: "1h",
  });

  return {
    ...user,
    token,
  };
};
