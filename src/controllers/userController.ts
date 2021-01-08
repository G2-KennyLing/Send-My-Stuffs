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
}