import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IAirport } from '../modules/airport/model';
import AirportService from '../modules/airport/service';
import e = require('express');

export class AirportController {

    private airportService: AirportService = new AirportService();

    public createAirport(req: Request, res: Response){
        const {airportName,portCode,latitude,longitude,status,country} = req.body;
        
        if(!(airportName && portCode && latitude && longitude && status && country)){
            return failureResponse("All fill is requied", null, res);
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
                    modificationNote: 'New ariport created'
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
				successResponse("Get List Ariport Successfull", airportData, res)
			}
		})
    }


}


