import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { ISeaport } from '../modules/seaport/model';
import SeaportService from '../modules/seaport/service';
import e = require('express');
export class SeaportController {

    private seaportService: SeaportService = new SeaportService();

    public createSeaport(req: Request, res: Response) {
        const {seaportName,portCode,latitude,longitude,status,country} = req.body;
        
        if(!(seaportName && portCode && latitude && longitude && status && country)){
            return failureResponse("All fill is requied", null, res);
        }
      
        this.seaportService.filterSeaport({seaportName},(err: Error, seaportData: ISeaport) =>{
            if(err){
                return mongoError(err, res);
            }
            if(seaportData){
                return failureResponse("Seaport is already exists", null, res);
            }
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
                    modificationNote: 'New seaport created'
                }]
            };
            this.seaportService.createSeaport(seaportParams, (err: Error, seaportData: ISeaport) =>{
                if(err){
                     mongoError(err, res);
                }
                 successResponse("Create Seaport successful", seaportData, res);
            })
        })
        
    }
   
    public getListSeaports(req: Request, res: Response) {
        const seaport_Filter = {};
		this.seaportService.filterSeaports(seaport_Filter, (err: any, seaportData: ISeaport) => {
			if (err) {
				return mongoError(err, res);
			}else {
				successResponse("Get List seaport successfull", seaportData, res)
			}
		})
    }

    public getSeaport(req: Request, res: Response) {
        const seaportFilter = { _id: req.params.id };
        this.seaportService.filterSeaport(seaportFilter, (err: any, seaportData: ISeaport) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('Get seaport successfull', seaportData, res);
            }
        });
    
}

    public updateSeaport(req: Request, res: Response) {
        const {seaportName,portCode,latitude,longitude,status,country} = req.body;
        const seaportfilter  = { _id: req.params.id };
        if(!(seaportName && portCode && latitude && longitude && status && country )){
            return insufficientParameters(res)
        }
        this.seaportService.filterSeaport(seaportfilter, (err: any, seaportData: ISeaport) => {
            if (err) {
                return mongoError(err, res);
             }
            if(!seaportData){
                return failureResponse("Seaport is not found", null, res);
            }
                const seaportParams: ISeaport = {
                    _id: req.params.id,
                    seaportName: req.body.seaportName ? req.body.seaportName : seaportData.seaportName,
                    portCode: req.body.portCode ? req.body.portCode : seaportData.portCode,
                    latitude: req.body.latitude ? req.body.latitude : seaportData.latitude,
                    longitude: req.body.longitude ? req.body.longitude : seaportData.longitude,
                    status: req.body.status ? req.body.status : seaportData.status,
                    country: req.body.country ? req.body.country : seaportData.country,
                    modificationNotes: [{
                        modifiedOn: new Date(Date.now()),
                        modifiedBy: null,
                        modificationNote: 'New Seaport created'
                    }]
                };
                this.seaportService.updateSeaport(seaportParams, (err: any) => {
                    if (err) {
                        mongoError(err, res);
                    } else {
                        successResponse("Update seaport successful", seaportParams, res);
                    }
                });
            });  
        }
  
}