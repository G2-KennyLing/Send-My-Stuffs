import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IPartner } from '../modules/partners/model';
import PartnerService from '../modules/partners/service';
import e = require('express');

export class PartnerController {

    private partnerService: PartnerService = new PartnerService();

    public createPartner(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        const { companyName, domainName, workGroup, partnerType, industry, taxID, country, city, addressLineFirst, addressLineSecond, telephone, facismile, salesID, wallet, user, peer, logo, status } = req.body;
        if (companyName && domainName && workGroup && partnerType && industry && taxID && country && city && addressLineFirst && addressLineSecond && telephone && facismile && salesID && wallet && user && peer && logo && status ) {
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
                facismile,
                salesID,
                wallet,
                user,
                peer,
                logo,
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

    public getPartners(req: Request, res: Response) {
        const partnerFilter = {};
        this.partnerService.filterAllPartners(partnerFilter, (err: any, partnerData: IPartner) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse("Get list partners successful", partnerData, res);
            }
        });
    }
}