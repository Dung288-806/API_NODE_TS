import { IUser } from "./src/models/user.model";

declare global {
  namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}
