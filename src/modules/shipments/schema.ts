import { ModificationNote } from "./../common/model";
import { Schema, model } from "mongoose";
<<<<<<< HEAD
=======
import { ModificationNote } from "../common/model";

>>>>>>> ec87c623141b48290c9edd976dc3fe86a2943c3d
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
  ModificationNote: {
    type: [ModificationNote],
  },
});

export default model("shipments", shipmentSchema);
