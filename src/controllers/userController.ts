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
            companyRole,} = req.body;
        if(!(name && telephone && mobile && email && password && dateOfBirth && companyName  )){
            return insufficientParameters(res)
        }
        this.userService.filterUser({email},(err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            if(user){
                return failureResponse("email is already use", null, res);
            }
        })
        const userParams: IUser = { 
            name,
            telephone,
            mobile,
            email,
            password: bcrypt.hashSync(password, 10),
            dateOfBirth,
            companyName,
            companyRole,
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
                password: user.password,
                dateOfBirth,
                companyName,
                companyRole: user.companyRole,
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
}