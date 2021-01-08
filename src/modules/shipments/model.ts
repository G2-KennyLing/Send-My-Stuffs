export default interface IShipment {
  _id?: String;
  shipmentNo: String;
  from: String;
  to: String;
  vesselName?: String;
  voyage?: String;
  cargoDescription: String;
}
