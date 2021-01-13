import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');

const bcrypt = require('bcrypt');

export class UserController {

    private userService: UserService = new UserService();

    public createUser(req: Request, res: Response){
        const {name,
            telephone,
            mobile,
            email,
            password,
            dateOfBirth,
            companyName,
            companyRole,
            userType,premission} = req.body;
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
                premission,
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
    public getAllUserType(req: Request, res: Response){
        const userType = req.params.userType;
        this.userService.filterUser({deletedAt: undefined, userType},  (err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            return successResponse("Get all user by user type successful", user, res);
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
                premission: user.premission,
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
            userType,premission} = req.body;
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
                premission,
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
}