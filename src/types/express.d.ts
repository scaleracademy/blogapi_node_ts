import { UserEntity } from "../users/user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}
