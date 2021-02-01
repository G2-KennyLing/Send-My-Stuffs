import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IAirport } from '../modules/airport/model';
import AirportService from '../modules/airport/service';
import e = require('express');

export class AirportController {

    private airportService: AirportService = new AirportService();

    public createAirport(req: Request, res: Response){
        const {airportName,portCode,latitude,longitude,status,country} = req.body;
        
        if(!(airportName && portCode && latitude && longitude &&status && country)){
             if(status != 0 && status == 1){
                return failureResponse("All fill is requied", null, res);
              }
        }
      
        this.airportService.filterAirport({airportName},(err: Error, airportData: IAirport) =>{
            if(err){
                return mongoError(err, res);
            }
            if(airportData){
                return failureResponse("Ariport is already", null, res);
            }
            const airportParams: IAirport = {
                airportName: req.body.airportName,
                portCode: req.body.portCode,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                status: req.body.status,
                country: req.body.country,
                modificationNotes: [{
                    modifiedOn: new Date(Date.now()),
                    modifiedBy: null,
                    modificationNote: 'New ariport successful'
                }]
            };
            this.airportService.createAirport(airportParams, (err: Error, airportData: IAirport) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("Create Airport successful", airportData, res);
            })
        })
        
    }

    public getListAirports(req: Request, res: Response) {
        const airport_Filter = {};
		this.airportService.filterAriports(airport_Filter, (err: any, airportData: IAirport) => {
			if (err) {
				return mongoError(err, res);
			}else {
				return successResponse("Get List Ariport Successfull", airportData, res)
			}
		})
    }

    public getAirport(req: Request, res: Response) {
        const airport_Filter = { _id: req.params.id };
        this.airportService.filterAirport(airport_Filter, (err: any, airportData: IAirport) => {
            if (err) {
                return mongoError(err, res);
            } else {
                return successResponse('Get Airport successfull', airportData, res);
            }
        });
    
    } 

    public updateAirport(req: Request, res: Response){
        const {airportName,portCode,latitude,longitude,status,country} = req.body;
        const airport_Filter = { _id: req.params.id };
        if(!(airportName && portCode && latitude && longitude && status && country)){
            if(status != 0 && status == 1){
                return failureResponse("All fill is requied", null, res);
              }
        }
        
        this.airportService.filterAirport(airport_Filter,  (err: Error, ariportData: IAirport) =>{
            if(err){
                return mongoError(err, res);
            }
            if(!ariportData){
                return failureResponse("Airport is not found", null, res);
            }
            const ariportParams :IAirport = {
                _id: req.params.id,
                airportName: req.body.airportName,
                portCode: req.body.portCode,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                status: req.body.status,
                country: req.body.country,
                modificationNotes: [{
                    modifiedOn: new Date(Date.now()),
                    modifiedBy: null,
                    modificationNote: 'New Airport Created'
                }]
            }
            this.airportService.updateAirport(ariportParams, (err: Error, airportData: IAirport) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("Update Airport successful", airportData, res);
            })
        })
    }

    public isDelete(req: Request, res: Response) {

        const _id = req.params.id ;
        this.airportService.filterAirport({_id}, (err: any, airportData: IAirport) =>{
            if(err){
                return mongoError(err, res);
            } if(!airportData){
                return failureResponse("Airport is not found", null, res);
            }
            this.airportService.deleteAirport(_id, {$set:{deletedAt: new Date()}}, (err: Error, airportData: IAirport) =>{
                if(err){
                    return mongoError(err, res);
                }
                    return successResponse("Delete Airport Successful", airportData, res)
            })
        })
        
    }
}


