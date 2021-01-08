import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IPartner } from '../modules/partners/model';
import PartnerService from '../modules/partners/service';
import e = require('express');

export class PartnerController {

    private partnerService: PartnerService = new PartnerService();

    public createPartner(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        const { companyName, companyType, country, city, region, addressLineFirst, addressLineSecond, telephone, facismile, domainName, industry, taxID, partnerGroup, name, dateOfBirth, handphone, email, alternateEmail, directLine, status , icon } = req.body;
        const { firstName, lastName } = name || {};
        if (companyName && companyType && country && city && region && addressLineFirst && addressLineSecond && telephone && facismile && domainName && industry && taxID && partnerGroup && firstName && lastName && dateOfBirth && handphone && email && alternateEmail && directLine && status && icon ) {
            const partnerParams: IPartner = {
                companyName,
                companyType,
                country,
                city,
                region,
                addressLineFirst,
                addressLineSecond,
                telephone,
                facismile,
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
}