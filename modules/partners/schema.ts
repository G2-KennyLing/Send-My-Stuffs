import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const Partner = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    companyType: String,
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    region: {
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
    facimile: String,
    domainName: String,
    industry: String,
    taxID: String,
    partnerGroup: String,
    name: {
        type: {
            firstName: String,
            lastName: String,
        },
        trim: true,
        required: true,
    },
    dateOfBirth: Date,
    handphone: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    alternateEmail: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    directLine: String,
    status: String,
    icon: String,
    modification_notes: [ModificationNote]
});

export default mongoose.model('Partner', Partner);