import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../modules/common/service";
import ShipmentService from "../modules/shipments/service";
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
}
