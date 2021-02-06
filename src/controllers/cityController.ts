import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { ICity } from '../modules/city/model';
import CityService from '../modules/city/service';
import e = require('express');
export class CityController {
    private cityService: CityService = new CityService();

    public createCity(req: Request, res: Response){
        const {cityName,icons,country,status} = req.body;
        if(!(cityName && icons && country &&status && country)){
             if(status != 0 && status == 1){
                return failureResponse("All fill is requied", null, res);
              }
        }
      
        this.cityService.filterCity({cityName},(err: Error, cityData: ICity) =>{
            if(err){
                return mongoError(err, res);
            }
            if(cityData){
                return failureResponse("City is already", null, res);
            }
            const cityParams: ICity = {
                cityName: req.body.cityName,
                icons: req.body.icons,
                country: req.body.country,
                status: req.body.status,
                modificationNotes: [{
                    modifiedOn: new Date(Date.now()),
                    modifiedBy: null,
                    modificationNote: 'New City successful'
                }]
            };
            this.cityService.createCity(cityParams, (err: Error, cityData: ICity) =>{
                if(err){
                    return mongoError(err, res);
                }
                return successResponse("Create City successful", cityData, res);
            })
        })
        
    }

    public getListCities(req: Request, res: Response){
        const cityFilter = {deletedAt:undefined};
        this.cityService.filterCities(cityFilter, (err: any, cityData: ICity) =>{
            if(err){
                return mongoError (err ,res);
            }else{
                return  successResponse("Get List city successfull", cityData, res)
            }
        })
    }

}