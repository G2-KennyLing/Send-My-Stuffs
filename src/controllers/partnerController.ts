import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IPartner } from '../modules/partner/model';
import PartnerService from '../modules/partner/service';
import e = require('express');

export class PartnerController {

    private partnerService: PartnerService = new PartnerService();

    public createPartner(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        const { companyName, domainName, workGroup, partnerType, industry, taxID, country, city, addressLineFirst, addressLineSecond, telephone, facsimile, salesID, wallet, user, peer, logo, status } = req.body;
        if (!(companyName && domainName && workGroup && partnerType && industry && taxID && country && city && addressLineFirst && addressLineSecond && telephone && facsimile && salesID && wallet && user && peer && logo )) {
                return failureResponse("All fill is required", null, res);
            }
            const partnerParams: IPartner = {
                companyName,
                domainName,
                workGroup,
                partnerType,
                industry,
                taxID,
                country,
                city,
                addressLineFirst,
                addressLineSecond,
                telephone,
                facsimile,
                salesID,
                wallet,
                user,
                peer,
                logo,
                status,
                modificationNotes: [{
                    modifiedOn: new Date(Date.now()),
                    modifiedBy: null,
                    modificationNote: 'New partner created'
                }]
            };
            this.partnerService.filterPartner({companyName},(err: Error, partner: IPartner) =>{
                if(err){
                    return mongoError(err, res);
                }
                if(partner){
                    if(partner.deletedAt != undefined){
                        partnerParams._id = partner._id;
                        partnerParams.deletedAt = undefined;
                        this.partnerService.updatePartner(partnerParams, (err: Error, partnerData: IPartner) => {
                            if (err) {
                               return mongoError(err, res);
                            } else {
                               return successResponse("Create partner successful", partnerParams, res);
                            }
                        })
                    }
                    else {
                        return failureResponse("Partner already exist", null, res);
                    }
                }
                else {
                    this.partnerService.createPartner(partnerParams, (err: Error, partnerData: IPartner) => {
                        if (err) {
                           return mongoError(err, res);
                        } else {
                           return successResponse('Create partner successfull', partnerData, res);
                        }
            })
        }
        })
    }

    public getListPartners(req: Request, res: Response) {
        const { page = 1, limit = 10 } = req.query;
        const param = { page : page, limit : limit };
        const partnerFilter = {deletedAt: undefined};
        this.partnerService.filterPartners(param, partnerFilter, (err: any, partnerData: IPartner) => {
            if (err) {
               return mongoError(err, res);
            }
            return successResponse("Get list partners successful", partnerData, res);
        })
    }

    public getPartner(req: Request, res: Response) {
        const partnerFilter = { _id: req.params.id };
        this.partnerService.filterPartner(partnerFilter, (err: any, partnerData: IPartner) => {
            if (err) {
                return mongoError(err, res);
            } else {
                return successResponse("Get partner detail successful", partnerData, res);
            }
        });
    }

    public updatePartner(req: Request, res: Response) {
        const { companyName, domainName, workGroup, partnerType, industry, taxID, country, city, addressLineFirst, addressLineSecond, telephone, facsimile, salesID, wallet, user, peer, logo, status } = req.body;
        if (!(companyName && domainName && workGroup && partnerType && industry && taxID && country && city && addressLineFirst && addressLineSecond && telephone && facsimile && salesID && wallet && user && peer && logo ))  {
            return insufficientParameters(res)
        }
            const partnerFilter = { _id: req.params.id };
            this.partnerService.filterPartner(partnerFilter, (err: any, partnerData: IPartner) => {
                if (err) {
                    return mongoError(err, res);
                }
                if (partnerData) {
                    const partnerParams: IPartner = {
                        _id: partnerData._id,
                        companyName,
                        domainName,
                        workGroup,
                        partnerType,
                        industry,
                        taxID,
                        country,
                        city,
                        addressLineFirst,
                        addressLineSecond,
                        telephone,
                        facsimile,
                        salesID,
                        wallet,
                        user,
                        peer,
                        logo,
                        status,
                        modificationNotes: [
                            {
                                modifiedOn: new Date(Date.now()),
                                modifiedBy: null,
                                modificationNote: "Partner data updated",
                            },
                        ],
                    };
                    this.partnerService.updatePartner(partnerParams, (err: any) => {
                        if (err) {
                           return mongoError(err, res);
                        } else {
                           return successResponse("Update partner successfully", partnerParams, res);
                        }
                    });
                } else {
                   return failureResponse("Invalid partner", null, res);
                }
            });
    }

    public deletePartner(req: Request, res: Response){
        const _id = req.params.id;
        this.partnerService.filterPartner({_id}, (err: any, partnerData: IPartner) => {
            if (err) {
                return failureResponse("Partner not exist", null, res);
            }
            if (partnerData){
            this.partnerService.updatePartnerDelete(_id,{$set:{deletedAt: new Date()}},  
            (err: Error, partnerData: IPartner) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("Delete partner successful", partnerData, res)
            })
        }
        })
    }

}