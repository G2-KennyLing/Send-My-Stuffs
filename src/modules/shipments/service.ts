import IShipment from "./model";
import Shipment from "./schema";

export default class ShipmentService {
  create(shipment: IShipment, callback?: any) {
    const newShipment = new Shipment(shipment);
    return newShipment.save(callback);
  }
  getAll(callback?: any) {
    return Shipment.find({}).exec(callback);
  }
}
