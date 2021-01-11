import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import Nodemailer from "../helpers/verifyEmail";
const jwt = require("jsonwebtoken");
import e = require('express');

const bcrypt = require('bcrypt');

export class UserController {

    private userService: UserService = new UserService();
    private mailer: Nodemailer = new Nodemailer();

    public createUser(req: Request, res: Response){
        const {name,
            telephone,
            mobile,
            email,
            password,
            dateOfBirth,
            companyName,
            companyRole,
            userType} = req.body;
        if(!(name && telephone && mobile && email && password && dateOfBirth && companyName  )){
            return failureResponse("All fill is requied", null, res);
        }
        this.userService.filterUser({email},(err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            if(user){
                return failureResponse("Email is already use", null, res);
            }
            const userParams: IUser = { 
                name,
                telephone,
                mobile,
                email,
                password: bcrypt.hashSync(password, 10),
                dateOfBirth,
                companyName,
                companyRole,
                userType,
                lastActivity: new Date(),
                modificationNotes: [{
                    modifiedBy: null,
                    modifiedOn: new Date(),
                    modificationNote: 'create new user',
                }]
            }
            this.userService.createUser(userParams, (err: Error, newUser: IUser) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("create user successful", newUser, res);
            })
        })
        
    }
    public getAllUser(req: Request, res: Response){
        this.userService.filterUsers({deletedAt: undefined},(err:Error, users:IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            return successResponse("get user list successful", users, res);
        })
    }
    public getUserDetail(req: Request, res: Response){
        const _id = req.params.id;
        this.userService.filterUser({_id}, (err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            if(!user){
                return failureResponse("user is not found", null, res);
            }
            return successResponse("get user detail successful", user, res);
        })
    }
    public updateUser(req: Request, res: Response){
        const {name,
            telephone,
            mobile,
            password,
            dateOfBirth,
            companyName,} = req.body;
        const _id = req.params.id;
        if(!(name && telephone && mobile && password && dateOfBirth && companyName  )){
            return insufficientParameters(res)
        }
        this.userService.filterUser({_id},  (err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            if(!user){
                return failureResponse("user is not found", null, res);
            }
            const userParams :IUser = {
                _id: user._id,
                name,
                telephone,
                mobile,
                email: user.email,
                password,
                dateOfBirth,
                companyName,
                companyRole: user.companyRole,
                userType: user.userType,
                lastActivity: new Date(),
                modificationNotes: [{
                    modifiedBy: null,
                    modifiedOn: new Date(),
                    modificationNote: 'update user',
                }]
            }
            this.userService.updateUser(userParams, (err: Error, userData: IUser) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("update user successful", userData, res);
            })
        })
    }
    public updateUserByAdmin(req: Request, res: Response){
        const {name,
            telephone,
            mobile,
            password,
            dateOfBirth,
            companyName,
            companyRole,
            userType} = req.body;
        const _id = req.params.id;
        if(!(name && telephone && mobile && password && dateOfBirth && companyName)){
            return insufficientParameters(res)
        }
        //@ts-ignore
        const admin = req.user ;
        this.userService.filterUser({_id},  (err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            if(!user){
                return failureResponse("user is not found", null, res);
            }
            const userParams :IUser = {
                _id: user._id,
                name,
                telephone,
                mobile,
                email: user.email,
                password,
                dateOfBirth,
                companyName,
                companyRole,
                userType,
                lastActivity: new Date(),
                modificationNotes: [{
                    modifiedBy: admin,
                    modifiedOn: new Date(),
                    modificationNote: 'update user',
                }]
            }
            this.userService.updateUser(userParams, (err: Error, userData: IUser) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("update user successful", userData, res);
            })
        })
    }
    public async forgotPassword(req: Request, res: Response) {
        try {
          const { email } = req.body;
          if (!email) return insufficientParameters(res);
          const handleFilter = new Promise((resolve, reject) => {
            this.userService.filterUser({ email }, (err: any, userData: IUser) => {
              if (err) {
                return reject(err);
              }
              if(!userData){
                  return failureResponse("Email is not found", null, res);
              }
              userData.modificationNotes.push({
                modifiedOn: new Date(Date.now()),
                modifiedBy: null,
                modificationNote: "User data updated",
              });
              return resolve(userData);
            });
          })
            .then((rs) => rs)
            .catch((err) => err);
          const userData = await handleFilter;
          const token = await jwt.sign(
            { user: userData },
            process.env.JWT_FORGOTPASSWORD_TOKEN,
            { expiresIn: "10m" }
          );
          const forgotLink = `http:\/\/${req.headers.host}\/auth\/forgotPassword\/${token}`;
          const sendMail = this.mailer.sendMail({
            from: "SEND MY STUFFS",
            to: email,
            subject: "FORGOT PASSWORD",
            html: this.mailer.forgotPasswordTemplate(forgotLink),
          });
          return successResponse("The request has been resolved", sendMail, res);
        } catch (error) {
          mongoError(error, res);
        }
    }
    public resetPassword(req: Request, res: Response) {
        const { newPasword, token } = req.body;
        jwt.verify(token, process.env.JWT_FORGOTPASSWORD_TOKEN, (err, decoded) => {
          if (err) {
            return failureResponse("Forgot password token is not valid", null, res);
          }
          const user = decoded.user;
          user.password = bcrypt.hashSync(newPasword, 10);
          this.userService.updateUser(user, (err: Error, userData: IUser) => {
            if (err) {
              return mongoError(err, res);
            }
            return successResponse("Change password successful", userData, res);
          });
        });
      }
}