import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const Partner = new Schema({
    companyName: {
        type: String,
        uppercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    domainName: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    workGroup: String,
    partnerType: String,
    industry: String,
    taxID: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: "countries",
        required: true,
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "countries",
        required: true,
    },
    addressLineFirst: {
        type: String,
        required: true,
    },
    addressLineSecond: {
        type: String,
        required: true,
    },
    telephone: String,
    facsimile: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    salesID: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    wallet: Number,
    user: Number,
    peer: Number,
    logo: String,
    status: {
        type: Number,
        enum: [0,1],
        default: 0,
    },
    deletedAt:{
        type:Date,
        default: undefined
    },
    modificationNotes: [ModificationNote]
});

export default mongoose.model('partners', Partner);