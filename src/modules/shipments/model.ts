import { ModificationNote } from "./../common/model";
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
  vesselName?: String;
  voyage?: String;
  cargoDescription: String;
  status?: Status;
  ModificationNote: [ModificationNote];
}
