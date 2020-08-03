import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel, { IUser } from "../models/user.model";

export const auth = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    const token: string | undefined = req
      .header("Authorization")!
      .replace("Bearer ", "");
    if (!token) {
      throw new Error("Pls login");
    }
    const payload: any = await verify(token, process.env.SECRET_JWT as string);
    const user: IUser | null = await UserModel.findById(payload.id);
    if (!user) {
      throw new Error("Pls login");
    }
    req.user = user;
    Next();
  } catch (e) {
    res.status(400).json({
      mes: e + " ",
    });
  }
};
