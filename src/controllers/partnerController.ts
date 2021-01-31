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
                                mongoError(err, res);
                            } else {
                                successResponse("Create partner successful", partnerParams, res);
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
                            mongoError(err, res);
                        } else {
                        successResponse('Create partner successfull', partnerData, res);
                        }
            })
        }
        })
    }

    public getListPartners(req: Request, res: Response) {
        const partnerFilter = {deletedAt: undefined};
        this.partnerService.filterPartners(partnerFilter, (err: any, partnerData: IPartner) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse("Get list partners successful", partnerData, res);
            }
        });
    }

    public getPartner(req: Request, res: Response) {
        const partnerFilter = { _id: req.params.id };
        this.partnerService.filterPartner(partnerFilter, (err: any, partnerData: IPartner) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse("Get partner detail successful", partnerData, res);
            }
        });
    }

    public updatePartner(req: Request, res: Response) {
        const { companyName, domainName, workGroup, partnerType, industry, taxID, country, city, addressLineFirst, addressLineSecond, telephone, facsimile, salesID, wallet, user, peer, logo, status } = req.body;
        if (companyName && domainName && workGroup && partnerType && industry && taxID && country && city && addressLineFirst && addressLineSecond && telephone && facsimile && salesID && wallet && user && peer && logo && status )  {
            const partnerFilter = { _id: req.params.id };
            this.partnerService.filterPartner(partnerFilter, (err: any, partnerData: IPartner) => {
                if (err) {
                    return mongoError(err, res);
                }
                if (partnerData) {
                    const partnerParams: IPartner = {
                        _id: req.params.id,
                        companyName : companyName ? req.body.companyName : partnerData.companyName,
                        domainName : domainName ? req.body.domainName : partnerData.domainName,
                        workGroup : workGroup ? req.body.workGroup : partnerData.workGroup,
                        partnerType : partnerType ? req.body.partnerType : partnerData.partnerType,
                        industry : industry ? req.body.industry : partnerData.industry,
                        taxID : taxID ? req.body.taxID : partnerData.taxID,
                        country : country ? req.body.country : partnerData.country,
                        city : city ? req.body.city : partnerData.city,
                        addressLineFirst : addressLineFirst ? req.body.addressLineFirst : partnerData.addressLineFirst,
                        addressLineSecond : addressLineSecond ? req.body.addressLineSecond : partnerData.addressLineSecond,
                        telephone : telephone ? req.body.telephone : partnerData.telephone,
                        facsimile : facsimile ? req.body.facsimile : partnerData.facsimile,
                        salesID : salesID ? req.body.salesID : partnerData.salesID,
                        wallet : wallet ? req.body.wallet : partnerData.wallet,
                        user : user ? req.body.user : partnerData.user,
                        peer : peer ? req.body.peer : partnerData.peer,
                        logo : logo ? req.body.logo : partnerData.logo,
                        status : status ? req.body.status : partnerData.status,
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
                            mongoError(err, res);
                        } else {
                            successResponse("Update partner successful", partnerParams, res);
                        }
                    });
                } else {
                    failureResponse("Invalid partner", null, res);
                }
            });
        }
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