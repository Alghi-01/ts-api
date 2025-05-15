import { Request, Response } from "express";
import prisma from "../prisma/client";
import { createUser, findUser } from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
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
    res.status(500).send(error);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);

    const { password, id, ...safeData } = newUser;

    res.status(201).send(safeData);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await findUser({ email: req.params.email });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
