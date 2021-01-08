import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IPartner } from '../modules/partners/model';
import PartnerService from '../modules/partners/service';
import e = require('express');

export class PartnerController {

    private partnerService: PartnerService = new PartnerService();

    public createPartner(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        const { companyName, companyType, country, city, region, addressLineFirst, addressLineSecond, telephone, facimile, domainName, industry, taxID, partnerGroup, name, dateOfBirth, handphone, email, alternateEmail, directLine, status, icon } = req.body;
        const { firstName, lastName } = name || {};
        if (companyName && companyType && country && city && region && addressLineFirst && addressLineSecond && telephone && facimile && domainName && industry && taxID && partnerGroup && firstName && lastName && dateOfBirth && handphone && email && alternateEmail && directLine && status && icon) {
            const partnerParams: IPartner = {
                companyName,
                companyType,
                country,
                city,
                region,
                addressLineFirst,
                addressLineSecond,
                telephone,
                facimile,
                domainName,
                industry,
                taxID,
                partnerGroup,
                name: {
                    firstName,
                    lastName
                },
                dateOfBirth,
                handphone,
                email,
                alternateEmail,
                directLine,
                icon,
                status,
                modification_notes: [{
                    modifiedOn: new Date(Date.now()),
                    modifiedBy: null,
                    modificationNote: 'New partner created'
                }]
            };
            this.partnerService.createPartner(partnerParams, (err: any, partnerData: IPartner) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create partner successfull', partnerData, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public listPartner(req: Request, res: Response) {
        const partnerFilter = {};
        this.partnerService.filterAllPartner(partnerFilter, (err: any, partnerData: IPartner) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse("Get list partner successful", partnerData, res);
            }
        });
    }

    public partnerDetail(req: Request, res: Response) {
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
        const { companyName, companyType, country, city, region, addressLineFirst, addressLineSecond, telephone, facimile, domainName, industry, taxID, partnerGroup, name, dateOfBirth, handphone, email, alternateEmail, directLine, status, icon } = req.body;
        const { firstName, lastName } = name || {};
        if (companyName && companyType && country && city && region && addressLineFirst && addressLineSecond && telephone && facimile && domainName && industry && taxID && partnerGroup && firstName && lastName && dateOfBirth && handphone && email && alternateEmail && directLine && status && icon) {
            const partnerFilter = { _id: req.params.id };
            this.partnerService.filterPartner(partnerFilter, (err: any, partnerData: IPartner) => {
                if (err) {
                    return mongoError(err, res);
                }
                if (partnerData) {
                    const partnerParams: IPartner = {
                        _id: req.params.id,
                        companyName : companyName ? req.body.companyName : partnerData.companyName,
                        companyType : companyType ? req.body.companyType : partnerData.companyType,
                        country : country ? req.body.country : partnerData.country,
                        city : city ? req.body.city : partnerData.city,
                        region : region ? req.body.region : partnerData.region,
                        addressLineFirst : addressLineFirst ? req.body.addressLineFirst : partnerData.addressLineFirst,
                        addressLineSecond : addressLineSecond ? req.body.addressLineSecond : partnerData.addressLineSecond,
                        telephone : telephone ? req.body.telephone : partnerData.telephone,
                        facimile : facimile ? req.body.facimile : partnerData.facimile,
                        domainName : domainName ? req.body.domainName : partnerData.domainName,
                        industry : industry ? req.body.industry : partnerData.industry,
                        taxID : taxID ? req.body.taxID : partnerData.taxID,
                        partnerGroup : partnerGroup ? req.body.partnerGroup : partnerData.partnerGroup,
                        name: name
                        ? {
                            firstName : firstName ? req.body.firstName :partnerData.name.firstName,
                            lastName : lastName ? req.body.lastName : partnerData.name.lastName
                        } : partnerData.name,
                        dateOfBirth : dateOfBirth ? req.body.dateOfBirth : partnerData.dateOfBirth,
                        handphone : handphone ? req.body.handphone : partnerData.handphone,
                        email : email ? req.body.email : partnerData.email,
                        alternateEmail : alternateEmail ? req.body.alternateEmail : partnerData.alternateEmail,
                        directLine : directLine ? req.body.directLine : partnerData.directLine,
                        icon : icon ? req.body.icon : partnerData.icon,
                        status : status ? req.body.status : partnerData.status,
                        modification_notes: [
                            {
                                modifiedOn: new Date(Date.now()),
                                modifiedBy: null,
                                modificationNote: "User data updated",
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
}