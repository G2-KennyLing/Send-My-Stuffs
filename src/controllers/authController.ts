import { NextFunction, Request, Response, Router } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../modules/common/service";
import { IUser } from "../modules/users/model";
import UserService from "../modules/users/service";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

export class AuthController {
  private userService: UserService = new UserService();

  public signin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!(email && password)) {
      return insufficientParameters(res);
    }
    this.userService.filterUser({ email }, (err: Error, user: IUser) => {
      if (err) {
        return mongoError(err, res);
      }
      if (!user) {
        return failureResponse("email does not exist", null, res);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return failureResponse("Password and email are not match", null, res);
      }
      const token = jwt.sign({ user }, process.env.JWT_TOKEN, {
        expiresIn: "1d",
      });
      const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      res.cookie("refreshToken", refreshToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      return successResponse(
        "signin successful",
        { user, token, refreshToken },
        res
      );
    });
  }
  public isSignin(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies) {
      return failureResponse("Unauthorized, access denied", null, res);
    }
    const token = req.cookies.token;
    if (!token) {
      return failureResponse("Unauthorized, access denied", null, res);
    }
    jwt.verify(token, process.env.JWT_TOKEN, (err: Error, user: IUser) => {
      if (err) {
        return failureResponse("Token is not valid, access denied", null, res);
      }
      //@ts-ignore
      req.user = user.user;
      next();
    });
  }
  public isSales(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const isSales = req.user.companyRole === 1;
    if (!isSales) {
      return res.status(400).json({
        message: "You are not Sale, access denied",
      });
    }
    next();
  }
  public isAdmin(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const user = req.user;
    const isAdmin = user.companyRole === 3;
    if (!isAdmin) {
      return res.status(400).json({
        message: "You are not Admin, access denied",
      });
    }
    next();
  }
  public isSuperAdmin(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const isSuperAdmin = req.user.companyRole === 4;
    if (!isSuperAdmin) {
      return res.status(400).json({
        message: "You are not Sale, access denied",
      });
    }
    next();
  }
  public isUserTypePantner(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const isPantner = req.user.userType === 1;
    if (!isPantner) {
      return res.status(400).json({
        message: "You are not Sale, access denied",
      });
    }
    next();
  }
  public isUserTypeUser(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const isUser = req.user.userType === 0;
    if (!isUser) {
      return res.status(400).json({
        message: "You are not Sale, access denied",
      });
    }
    next();
  }
}
