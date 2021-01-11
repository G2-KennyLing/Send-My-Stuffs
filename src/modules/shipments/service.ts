import { ModificationNote } from "./../common/model";
import IShipment from "./model";
import Shipment from "./schema";

export default class ShipmentService {
  create(shipment: IShipment, callback?: any) {
    const newShipment = new Shipment(shipment);
    return newShipment.save(callback);
  }
  getAll(callback?: any) {
    return Shipment.find({}).populate("from").populate("to").exec(callback);
  }
  update(
    _id: String,
    updateFields: IShipment,
    modifyNote: ModificationNote,
    callback
  ) {
    return Shipment.findByIdAndUpdate(
      _id,
      {
        $set: updateFields,
        $push: { ModificationNote: modifyNote },
      },
      {
        new: true,
      }
    )
      .populate("from")
      .populate("to")
      .exec(callback);
  }
  getById(_id: String, callback) {
    return Shipment.findById(_id)
      .populate("from")
      .populate("to")
      .exec(callback);
  }
}
