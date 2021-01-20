import { ModificationNote } from "./../modules/common/model";
import { Request, Response } from "express";
import {insufficientParameters,mongoError, successResponse,failureResponse,
} from "../modules/common/service";
import ShipmentService from "../modules/shipment/service";
import IShipment from "../modules/shipment/model";
export default class ShipmentController {

  private Service: ShipmentService;
  constructor() {
    this.Service = new ShipmentService();
  }

  public createShipment(req: Request, res: Response) {
    const {shipmentNo,from,to,vesselName,voyage,cargoDescription,departureDate,landingDate,} = req.body;
    if (!(shipmentNo && from && to && cargoDescription && departureDate && landingDate))
      return insufficientParameters(res);

    if (!((vesselName && !voyage) || (!vesselName && voyage)))
      return failureResponse("Can not choose both transport method",{ voyage, vesselName },res);

    this.Service.create(
      {shipmentNo,from,to,vesselName,voyage,cargoDescription,departureDate,landingDate,},
      (err, newShipment) => {
        if (err) return mongoError(err, res);
        return successResponse("Create new shipment successful",newShipment, res
        );
      }
    );
  }
  
  public getListShipments(req: Request, res: Response) {
    this.Service.filterShipments((error, shipments) => {
      if (error) return mongoError(error, res);
      return successResponse("Get all shipments successfull", shipments, res);
    });
  }

  public getShipment(req: Request, res: Response) {
    const { _id } = req.params;
    this.Service.filterShipment(_id, (err: Error, shipment: IShipment) => {
      if (err) return mongoError(err, res);
      if (!shipment) return failureResponse("Shipment is not found", {}, res);
      return successResponse("Get shipment successful", shipment, res);
    });
  }

  public updateShipment(req: Request, res: Response) {
    const { _id } = req.params;
    const {
      shipmentNo,
      from,
      to,
      vesselName,
      voyage,
      cargoDescription,
      status,
      departureDate,
      landingDate,
    } = req.body;
    if (
      !(
        shipmentNo &&
        from &&
        to &&
        cargoDescription &&
        departureDate &&
        landingDate &&
        status !== undefined
      )
    )
      return insufficientParameters(res);
    if (!((vesselName && !voyage) || (!vesselName && voyage)))
      return failureResponse(
        "can not choose both transport method",
        { voyage, vesselName },
        res
      );
    const ModificationNote: ModificationNote = {
      modificationNote: "update shipment",
      modifiedOn: new Date(),
      modifiedBy: "",
    };
    const updatedShipment: IShipment = {
      shipmentNo,
      from,
      to,
      vesselName,
      voyage,
      cargoDescription,
      status,
      departureDate,
      landingDate,
    };
    if (!_id) return insufficientParameters(res);
    this.Service.updateShipment(
      _id,
      updatedShipment,
      ModificationNote,
      (error, shipment) => {
        if (error) return mongoError(error, res);
        if (!shipment)
          return failureResponse(
            "Shipment with that ID is not exist",
            shipment,
            res
          );
        return successResponse(
          `Update shipment${shipment._id} successful`,
          shipment,
          res
        );
      }
    );
  }

  async overviewShipment(req: Request, res: Response) {
    const departure = await this.Service.getOverviewDepature();
    const landing = await this.Service.getOverviewLanding();
    const response = {
      departure,
      landing,
    };
    successResponse("Overview shipment in past 7 days", response, res);
  }
}
