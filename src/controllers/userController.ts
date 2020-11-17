import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');

export class UserController {

    private userService: UserService = new UserService();

    public createUser(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.name && req.body.name.firstName && req.body.name.lastName &&
            req.body.email &&
            req.body.phoneNumber &&
            req.body.gender) {
            const userParams: IUser = {
                name: {
                    firstName: req.body.name.firstName,
                    lastName: req.body.name.lastName
                },
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                gender: req.body.gender,
                modificationNotes: [{
                    modifiedOn: new Date(Date.now()),
                    modifiedBy: null,
                    modificationNote: 'New user created'
                }]
            };
            this.userService.createUser(userParams, (err: any, userData: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Create user successfull', userData, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public getUser(req: Request, res: Response) {
        if (req.params.id) {
            const userFilter = { _id: req.params.id };
            this.userService.filterUser(userFilter, (err: any, userData: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get user successfull', userData, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public updateUser(req: Request, res: Response) {
        if (req.params.id &&
            req.body.name || req.body.name.firstName || req.body.name.lastName ||
            req.body.email ||
            req.body.phoneNumber ||
            req.body.gender) {
            const user_filter = { _id: req.params.id };
            this.userService.filterUser(user_filter, (err: any, userData: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else if (userData) {
                    userData.modificationNotes.push({
                        modifiedOn: new Date(Date.now()),
                        modifiedBy: null,
                        modificationNote: 'User data updated'
                    });
                    const userParams: IUser = {
                        _id: req.params.id,
                        name: req.body.name ? {
                            firstName: req.body.name.firstName ? req.body.name.firstName : userData.name.firstName,
                            lastName: req.body.name.firstName ? req.body.name.lastName : userData.name.lastName
                        } : userData.name,
                        email: req.body.email ? req.body.email : userData.email,
                        phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : userData.phoneNumber,
                        gender: req.body.gender ? req.body.gender : userData.gender,
                        isDeleted: req.body.isDeleted ? req.body.isDeleted : userData.isDeleted,
                        modificationNotes: userData.modificationNotes
                    };
                    this.userService.updateUser(userParams, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('Update user successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('Invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public deleteUser(req: Request, res: Response) {
        if (req.params.id) {
            this.userService.deleteUser(req.params.id, (err: any, deleteDetails) => {
                if (err) {
                    mongoError(err, res);
                } else if (deleteDetails.deletedCount !== 0) {
                    successResponse('Delete user successfull', null, res);
                } else {
                    failureResponse('Invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}