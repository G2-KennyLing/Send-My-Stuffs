import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { ISeaport } from '../modules/seaport/model';
import SeaportService from '../modules/seaport/service';
import e = require('express');
export class SeaportController {

    private seaportService: SeaportService = new SeaportService();

    public createSeapor(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.seaportName&&
            req.body.portCode &&
            req.body.countryName &&
            req.body.countryCode &&
            req.body.latitude &&
            req.body.longitude &&
            req.body.status
            ) {
            const seaportParams: ISeaport = {
                seaportName: req.body.seaportName,
                portCode: req.body.portCode,
                countryName: req.body.countryName,
                countryCode: req.body.countryCode,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                status: req.body.status,
            
                modificationNotes: [{
                    modifiedOn: new Date(Date.now()),
                    modifiedBy: null,
                    modificationNote: 'New Seaport created'
                }]
            };
            this.seaportService.createSeaport(seaportParams, (err: any, seaportData: ISeaport) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Create seapor successfull', seaportData, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }
   

  
}