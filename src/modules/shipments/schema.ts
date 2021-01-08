import { Schema, model } from "mongoose";
import { ModificationNote } from "../common/model";
const shipmentSchema = new Schema({
  shipmentNo: {
    type: String,
    trim: true,
    required: true,
  },
  from: {
    type: String,
    trim: true,
    require: true,
  },
  to: {
    type: String,
    trim: true,
    require: true,
  },
  vesselName: {
    type: String,
  },
  voyage: {
    type: String,
  },
  cargoDescription: {
    type: String,
    trim: true,
  },
});

export default model("shipments", shipmentSchema);
