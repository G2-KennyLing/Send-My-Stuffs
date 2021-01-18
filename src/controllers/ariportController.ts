import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IAriport } from '../modules/ariport/model';
import AriportService from '../modules/ariport/service';
import e = require('express');

export class AriportController {

    private ariportService: AriportService = new AriportService();

    public createAriport(req: Request, res: Response){
        const {ariportName,portCode,latitude,longitude,status,country} = req.body;
        
        if(!(ariportName && portCode && latitude && longitude && status && country)){
            return failureResponse("All fill is requied", null, res);
        }
      
        this.ariportService.filterAriport({ariportName},(err: Error, ariportData: IAriport) =>{
            if(err){
                return mongoError(err, res);
            }
            if(ariportData){
                return failureResponse("Ariport is already", null, res);
            }
            const ariportParams: IAriport = {
                ariportName: req.body.ariportName,
                portCode: req.body.portCode,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                status: req.body.status,
                country: req.body.country,
                modificationNotes: [{
                    modifiedOn: new Date(Date.now()),
                    modifiedBy: null,
                    modificationNote: 'New ariport created'
                }]
            };
            this.ariportService.createAriport(ariportParams, (err: Error, ariportData: IAriport) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("Create Ariport successful", ariportData, res);
            })
        })
        
    }

}


