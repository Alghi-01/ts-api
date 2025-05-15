import prisma from "../prisma/client";
import { ICreateUser, UserIdentifierType } from "../types/user.type";
import bcrypt from "bcrypt";

export const createUser = async (dataUser: ICreateUser) => {
  const hashedPassword = await bcrypt.hash(dataUser.password, 10);

  return await prisma.users.create({
    data: {
      ...dataUser,
      password: hashedPassword,
    },
  });
};

export const findUser = async (identifier: UserIdentifierType) => {
  if ("id" in identifier) {
    return await prisma.users.findUnique({
      where: {
        id: identifier.id,
      },
    });
  } else if ("email" in identifier) {
    return await prisma.users.findUnique({
      where: {
        email: identifier.email,
      },
    });
  }
};
