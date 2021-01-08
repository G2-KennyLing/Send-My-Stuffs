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
  status: {
    type: Number,
    enum: [0, 1, 2, 3],
    required: true,
    default: 1,
  },
});

export default model("shipments", shipmentSchema);
