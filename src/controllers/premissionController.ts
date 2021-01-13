import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');

export class PremissionController{
    private userService: UserService = new UserService();

    public updatePremission(req: Request, res: Response){
        const _id = req.params.id;
        const {premission} = req.body;
        this.userService.filterUser({_id},  (err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            if(!user){
                return failureResponse("User is not found", null, res);
            }
            this.userService.updateUserSync(_id, {$set:{premission}},  (err: Error, userData: IUser) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("Update premission user successful", userData, res);
            })
        })
    }
    public getPremission(req: Request, res: Response){
        const _id = req.params.id;
        this.userService.filterUser({_id},  (err: Error, user: IUser) =>{
            if(err){
                return mongoError(err, res);
            }
            if(!user){
                return failureResponse("User is not found", null, res);
            }
            return successResponse("Get premission user successful", user, res);
        })
    }
}