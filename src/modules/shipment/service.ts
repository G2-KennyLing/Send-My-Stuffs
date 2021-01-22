import { ModificationNote } from "../common/model";
import IShipment from "./model";
import Shipment from "./schema";

export default class ShipmentService {
  public createShipment(shipmentParams: IShipment, callback: any) {
    const _session = new Shipment(shipmentParams);
    _session.save(callback);
}

  public filterShipments(query: any, callback: any) {
    return Shipment.find(query, callback).populate('from','countryName').populate('to','countryName');
  }

  public filterShipment(query: any, callback: any) {
    Shipment.findOne(query, callback).populate('from','countryName').populate('to','countryName');
  }

  public updateShipment(shipmentParams: IShipment, callback: any) {
    const query = { _id: shipmentParams._id };
    Shipment.findOneAndUpdate(query, shipmentParams, callback);
  }

  public getOverviewDepature() {
    const now = new Date().getTime();
    const sevenDayPast = now - 1000 * 60 * 60 * 24 * 7;
    return Shipment.find({
      departureDate: {
        $gte: new Date(sevenDayPast).toISOString(),
        $lte: new Date().toISOString(),
      },
    });
  }

  public getOverviewLanding() {
    const now = new Date().getTime();
    const sevenDayPast = now - 1000 * 60 * 60 * 24 * 7;
    return Shipment.find({
      landingDate: {
        $gte: new Date(sevenDayPast).toISOString(),
        $lte: new Date().toISOString(),
      },
    });
  }
}
