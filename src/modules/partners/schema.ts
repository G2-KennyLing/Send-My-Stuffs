import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const Partner = new Schema({
    companyName: { 
        type: String, 
        required: true, 
    },
    domainName: String, 
    workGroup: String, 
    partnerType: String, 
    industry: String, 
    taxID: String, 
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
    facismile: String, 
    salesID: String, 
    wallet: String, 
    user: Number, 
    peer: Number, 
    logo: String, 
    status: { 
        type: Number,
        enum: [0, 1], 
        default: 0 
    },

    modification_notes: [ModificationNote]
});

export default mongoose.model('Partner', Partner);