import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { createUser, findUser } from "../services/user.service";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        username: true,
        email: true,
        created_at: true,
      },
    });

    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await createUser(req.body);

    const { password, id, ...safeData } = newUser;

    res.status(201).send(safeData);
  } catch (error) {
    next(error);
  }
};

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUser({ email: req.params.email });
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
