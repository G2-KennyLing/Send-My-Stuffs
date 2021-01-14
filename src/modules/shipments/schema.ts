import { ModificationNote } from "./../common/model";
import { Schema, model } from "mongoose";
const shipmentSchema = new Schema({
  shipmentNo: {
    type: String,
    trim: true,
    uppercase: true,
    unique: true,
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "country",
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "country",
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  landingDate: {
    type: Date,
    required: true,
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
    default: [
      {
        modifiedOn: new Date(),
        modifiedBy: "",
        modificationNote: "create new shipment",
      },
    ],
  },
});

export default model("shipments", shipmentSchema);
