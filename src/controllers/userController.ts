import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/user/model';
import UserService from '../modules/user/service';
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
        //@ts-ignore
        const byUser = req.user ;
        if(byUser.userType === 0){
            switch (byUser.companyRole) {
                case 5: break;
                case 4:
                    if(companyRole >= 3) return failureResponse("Access denied, you can't create", null, res);
                    break;
                default: return failureResponse("Access denied, you can't create", null, res);
            }
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
                modifiedBy: byUser,
                modifiedOn: new Date(),
                modificationNote: 'Create new user',
            }]
        }
        this.userService.filterUser({email},(err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            if(user){
                if(user.deletedAt != undefined){
                    userParams._id = user._id;
                    userParams.deletedAt = undefined;
                    this.userService.updateUser(userParams, (err: Error, userData: IUser) =>{
                        if(err){
                            return mongoError(err, res);
                        }
                        return successResponse("Create user successful", userData, res);
                    })
                } else
                return failureResponse("Email is already use", null, res);
            } else
            this.userService.createUser(userParams, (err: Error, newUser: IUser) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("Create user successful", newUser, res);
            })
        })
        
    }

    public getListUsers(req: Request, res: Response){
        const {userType} = req.query;
        let query = {};
        if(userType) {
            if(Array.isArray(userType)) {
                query = {"$in": [0,1]};
            }
            else {
                query = userType==="USER" ? 0 : userType === "PARTNER"?1: userType;
            }
        }else{
            query = {"$in": [0,1]};
        }
        this.userService.filterUsers({deletedAt: undefined, userType: query},  (err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            return successResponse("Get all users successful", user, res);
        })
    }

    public getUser(req: Request, res: Response){
        const _id = req.params.id;
        this.userService.filterUser({_id}, (err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            if(!user){
                return failureResponse("User is not found", null, res);
            }
            return successResponse("Get user detail successful", user, res);
        })
    }
    
    public updateUser(req: Request, res: Response){
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
        const byUser = req.user ;
        if(byUser.userType === 0){
            switch (byUser.companyRole) {
                case 5: break;
                case 4:
                    if(companyRole >= 4) return failureResponse("Access denied, you can't update", null, res);
                    break;
                default: return failureResponse("Access denied, you can't update", null, res);
            }
        }
        this.userService.filterUser({_id},  (err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            if(!user){
                return failureResponse("User is not found", null, res);
            }
            const userParams :IUser = {
                _id: user._id,
                name,
                telephone,
                mobile,
                email: user.email,
                password: bcrypt.hashSync(password, 10),
                dateOfBirth,
                companyName,
                companyRole,
                userType,
                lastActivity: new Date(),
                modificationNotes: [{
                    modifiedBy: byUser,
                    modifiedOn: new Date(),
                    modificationNote: 'Update user',
                }]
            }
            this.userService.updateUser(userParams, (err: Error, userData: IUser) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("Update user successful", userData, res);
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
        const { newPassword, token } = req.body;
        jwt.verify(token, process.env.JWT_FORGOTPASSWORD_TOKEN, (err, decoded) => {
          if (err) {
            return failureResponse("Forgot password token is not valid", null, res);
          }
          const user = decoded.user;
          user.password = bcrypt.hashSync(newPassword, 10);
          this.userService.updateUser(user, (err: Error, userData: IUser) => {
            if (err) {
              return mongoError(err, res);
            }
            return successResponse("Change password successful", userData, res);
          });
        });
    }

    public deleteUser(req: Request, res: Response){
        const _id = req.params.id;
        //@ts-ignore
        const byUser = req.user ;
        this.userService.filterUser({_id},(err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            if(user._id != byUser._id){
                if(byUser.companyRole <=3){
                    return failureResponse("Access denied, you can't update", null, res);
                }
            }
            this.userService.updateUserSync(_id, 
                {$set:{deletedAt: new Date()}},  
            (err: Error, user: IUser) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("Delete user successful", user, res)
            })
        })
        
    }
}