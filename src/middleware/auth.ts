import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

export enum UserRoles {
  USER = "USER",
  ADMIN = "ADMIN",
}

// global type declaration for user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

// middleware to check access of a USER
const auth = (...roles: UserRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get user session using better auth
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });
      console.log(session);

      // check user authenticated or not
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authenticated!",
        });
      }

      // email verified check here
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required!",
        });
      }

      // valid user info save like this
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
      };

      // it check user roles
      if (roles.length && !roles.includes(req.user.role as UserRoles)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this resource",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};


export default auth;