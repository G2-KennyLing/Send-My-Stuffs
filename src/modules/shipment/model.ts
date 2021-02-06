import { ModificationNote } from "../common/model";
enum Status {
  "INACTIVE" = 0,
  "ACTIVE",
  "PENDING",
  "PAST",
}
export default interface IShipment {
  _id?: String;
  shipmentNo: String;
  from: String;
  to: String;
  departureDate: Date;
  landingDate: Date;
  vesselName?: String;
  voyage?: String;
  cargoDescription: String;
  status?: Status;
  deletedAt?: Date;
  ModificationNote?: [ModificationNote];
}
