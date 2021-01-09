import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../modules/common/service";
import ShipmentService from "../modules/shipments/service";
import IShipment from "../modules/shipments/model";
export default class ShipmentController {
  private Service: ShipmentService;
  constructor() {
    this.Service = new ShipmentService();
  }
  create(req: Request, res: Response) {
    const {
      shipmentNo,
      from,
      to,
      vesselName,
      voyage,
      cargoDescription,
    } = req.body;
    if (!(shipmentNo && from && to && cargoDescription))
      return insufficientParameters(res);
    if (!((vesselName && !voyage) || (!vesselName && voyage)))
      return failureResponse(
        "can not choose both transport method",
        { voyage, vesselName },
        res
      );
    this.Service.create(
      { shipmentNo, from, to, vesselName, voyage, cargoDescription },
      (err, newShipment) => {
        if (err) return mongoError(err, res);
        return successResponse(
          "Create new shipment successful",
          newShipment,
          res
        );
      }
    );
  }
  getAll(req: Request, res: Response) {
    this.Service.getAll((error, shipments) => {
      if (error) return mongoError(error, res);
      return successResponse("Get all shipments successfull", shipments, res);
    });
  }
  getById(req: Request, res: Response) {
    const { _id } = req.params;
    this.Service.getById(_id, (err: Error, shipment: IShipment) => {
      if (err) return mongoError(err, res);
      if (!shipment) return failureResponse("Shipment is not found", {}, res);
      return successResponse("Get shipment successful", shipment, res);
    });
  }
  update(req: Request, res: Response) {
    const { _id } = req.params;
    const {
      shipmentNo,
      from,
      to,
      vesselName,
      voyage,
      cargoDescription,
      status,
    } = req.body;
    if (!(shipmentNo && from && to && cargoDescription))
      return insufficientParameters(res);
    if (!((vesselName && !voyage) || (!vesselName && voyage)))
      return failureResponse(
        "can not choose both transport method",
        { voyage, vesselName },
        res
      );
    const updatedShipment: IShipment = {
      shipmentNo,
      from,
      to,
      vesselName,
      voyage,
      cargoDescription,
      status,
    };
    if (!_id) return insufficientParameters(res);
    this.Service.update(_id, updatedShipment, (error, shipment) => {
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
    });
  }
}
