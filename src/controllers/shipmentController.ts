import { ModificationNote } from "./../modules/common/model";
import { Request, Response } from "express";
import {
  insufficientParameters, mongoError, successResponse, failureResponse,
} from "../modules/common/service";
import ShipmentService from "../modules/shipment/service";
import IShipment from "../modules/shipment/model";
export default class ShipmentController {

  private shipmentService: ShipmentService = new ShipmentService();

  public createShipment(req: Request, res: Response) {
    const { shipmentNo, from, to, vesselName, voyage, cargoDescription, departureDate, landingDate, } = req.body;
    if (!(shipmentNo && from && to && cargoDescription && departureDate && landingDate))
      return failureResponse("All fill is requied", null, res);

    if (!((vesselName && !voyage) || (!vesselName && voyage)))
      return failureResponse("Can not choose both transport method", { voyage, vesselName }, res);
      const shipmentParams: IShipment = {
        shipmentNo,
        from,
        to,
        vesselName,
        voyage,
        cargoDescription,
        departureDate,
        landingDate,
        ModificationNote: [{
          modifiedOn: new Date(Date.now()),
          modifiedBy: null,
          modificationNote: 'New shipment created'
        }]
      };
      this.shipmentService.filterShipment({shipmentNo},(err: Error, shipment: IShipment) =>{
        if(err){
            return mongoError(err, res);
        }
        if(shipment){
            if(shipment.deletedAt != undefined){
                shipmentParams._id = shipment._id;
                shipmentParams.deletedAt = undefined;
                this.shipmentService.updateShipment(shipmentParams, (err: Error, shipmentData: IShipment) =>{
                    if(err){
                        return mongoError(err, res);
                    }
                    return successResponse("Create shipment successful", shipmentData, res);
                })
            } else
            return failureResponse("Shipment already exist", null, res);
        } else
        this.shipmentService.createShipment(shipmentParams, (err: Error, shipmentData: IShipment) =>{
            if(err){
                return mongoError(err, res);
            }
            return successResponse("Create shipment successful", shipmentData, res);
        })
    })

  }


  public getListShipments(req: Request, res: Response) {
    const shipmentFilter = {deletedAt: undefined};
    this.shipmentService.filterShipments(shipmentFilter, (err: any, shipmentData: IShipment) => {
      if (err) {
        mongoError(err, res);
      } else {
        successResponse("Get list shipments successful", shipmentData, res);
      }
    });
  }

  public getShipment(req: Request, res: Response) {
    const shipmentFilter = { _id: req.params.id };
    this.shipmentService.filterShipment(shipmentFilter, (err: any, shipmentData: IShipment) => {
      if (err) {
        mongoError(err, res);
      } else {
        successResponse("Get shipment detail successful", shipmentData, res);
      }
    });
  }

  public updateShipment(req: Request, res: Response) {
    const { shipmentNo, from, to, vesselName, voyage, cargoDescription, status, departureDate, landingDate, } = req.body;
    if (!(shipmentNo && from && to && cargoDescription && departureDate && landingDate && status !== undefined))
      return insufficientParameters(res);
    if (!((vesselName && !voyage) || (!vesselName && voyage)))
      return failureResponse("can not choose both transport method",{ voyage, vesselName },res
      );
    const shipmentFilter = { _id: req.params.id };
    this.shipmentService.filterShipment(shipmentFilter, (err: any, shipmentData: IShipment) => {
      if (err) {
        return mongoError(err, res);
      }
      if (shipmentData) {
        const shipmentParams: IShipment = {
          _id: req.params.id,
          shipmentNo: shipmentNo ? req.body.shipmentNo : shipmentData.shipmentNo,
          from: from ? req.body.from : shipmentData.from,
          to: to ? req.body.to : shipmentData.to,
          vesselName: vesselName ? req.body.vesselName : shipmentData.vesselName,
          voyage: voyage ? req.body.voyage : shipmentData.voyage,
          cargoDescription: cargoDescription ? req.body.cargoDescription : shipmentData.cargoDescription,
          departureDate: departureDate ? req.body.departureDate : shipmentData.departureDate,
          landingDate: landingDate ? req.body.landingDate : shipmentData.landingDate,
          status: status ? req.body.status : shipmentData.status,
          ModificationNote: [{
            modifiedOn: new Date(Date.now()),
            modifiedBy: null,
            modificationNote: 'Shipment data updated'
          }]
        }
        this.shipmentService.updateShipment(shipmentParams, (err: any) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("Update shipment successful", shipmentParams, res);
          }
        });
      } else {
        failureResponse("Invalid shipment", null, res);
      }
    });
  }

  async overviewShipment(req: Request, res: Response) {
    const departure = await this.shipmentService.getOverviewDepature();
    const landing = await this.shipmentService.getOverviewLanding();
    const response = {
      departure,
      landing,
    };
    successResponse("Overview shipment in past 7 days", response, res);
  }

  public deleteShipment(req: Request, res: Response){
    const _id = req.params.id;
    this.shipmentService.filterShipment({_id}, (err: any, shipmentData: IShipment) => {
        if (err) {
            return failureResponse("Shipment not exist", null, res);
        }
        if (shipmentData){
        this.shipmentService.updateDeleteShipment(_id,{$set:{deletedAt: new Date()}},  
        (err: Error, shipmentData: IShipment) =>{
            if(err){
                return mongoError(err, res);
            }
            return successResponse("Delete shipment successful", shipmentData, res)
        })
    }
    })
}


}
