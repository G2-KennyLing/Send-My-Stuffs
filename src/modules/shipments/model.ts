import { ModificationNote } from "./../common/model";
enum Status {
  "InActive" = 0,
  "Active",
  "Pending",
  "Past",
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
