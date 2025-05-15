import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import AppError from "../errors/AppError";
import { Prisma } from "../../prisma/generated/client";
export const errorResponse = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.log(`[Error]`, error);

  // Error from prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).send({
      message: error.message,
      code: error.code,
    });
  }

  // AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  // Unknown Error
  return res.status(500).send({
    message: "Internal server error",
    error,
  });
};
