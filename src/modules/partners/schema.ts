import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const Partner = new Schema({
    companyName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    domainName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    workGroup: String,
    partnerType: String,
    industry: String,
    taxID: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
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
    facismile: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    salesID: String,
    wallet: String,
    user: Number,
    peer: Number,
    logo: String,
    status: {
        type: Number,
        enum: [0,1],
        default: 0
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('Partners', Partner);