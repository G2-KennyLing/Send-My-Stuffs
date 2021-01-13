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

export class AuthController{
    private userService : UserService = new UserService();

    public signIn(req: Request, res: Response){
        const {email, password} = req.body;
        if(!(email && password)){
            return insufficientParameters(res);
        }
        this.userService.filterUser({email},(err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res)
            }
            if(!user){
                return failureResponse("Email does not exist", null, res)
            }
            if(!bcrypt.compareSync(password, user.password)){
                return failureResponse("Password and Email are not match", null, res)
            }
            const token =  jwt.sign({user}, process.env.JWT_TOKEN, {
                expiresIn: "1d",
              });
            const refreshToken = jwt.sign({user}, process.env.JWT_REFRESH_TOKEN,{expiresIn: "7d"});
            res.cookie("token", token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            });
            res.cookie("refreshToken", refreshToken, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            });
            return successResponse("Sign in successful", {user, token, refreshToken}, res)
        })
    }
}