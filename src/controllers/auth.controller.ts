import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const userToken = await loginUser(req.body);

    const { password, ...safeUser } = userToken;
    res.status(200).send(safeUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
