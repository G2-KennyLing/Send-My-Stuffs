import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const Partner = new Schema({
    companyName: {
        type: String,
        trim: true,
        required: true,
    },
    companyType: {
        type: String,
        trim: true,
        required: true,
    },
    country: {
        type: String,
        trim: true,
        required: true,        
    },
    city:{
        type: String,
        trim: true,
        required: true, 
    },
    region:{
        type: String,
        trim: true,
        required: true, 
    },
    addressLineFirst:{
        type: String,
        trim: true,
        required: true,
    },
    addressLineSecond:{
        type: String,
        trim: true,
        required: true,
    },
    telephoneNumber: String,
    facimile: String,
    domainName: String,
    industry: String,
    taxID: String,
    partnerGroup: String,

    modification_notes: [ModificationNote]
});

export default mongoose.model('Partner', Partner);