import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { ISeaport } from '../modules/seaport/model';
import SeaportService from '../modules/seaport/service';
import e = require('express');
export class SeaportController {

    private seaportService: SeaportService = new SeaportService();

    public createSeaport(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        const {seaportName,portCode,latitude,longitude,status,country} = req.body;
        if (seaportName && portCode && latitude && longitude && status && country
            ) {
            const seaportParams: ISeaport = {
                seaportName: req.body.seaportName,
                portCode: req.body.portCode,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                status: req.body.status,
                country: req.body.country,
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
   
    public getListSeaport(req: Request, res: Response) {
        const seaport_Filter = {};
		this.seaportService.filterSeaport(seaport_Filter, (err: any, seaportData: ISeaport) => {
			if (err) {
				return mongoError(err, res);
			}else {
				successResponse("Get List seaport Success", seaportData, res)
			}
		})
    }

  
}