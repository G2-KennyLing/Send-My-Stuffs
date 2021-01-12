import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;
const seaportSchema = mongoose.Schema;

const schema = new seaportSchema({
    seaportName: {
        type: String,
        trim: true,
        required: true,
    },
    portCode: {
        type: String,
        trim: true,
        required: true,
    },
    countryName: String,
    countryCode: String,
    latitude: String,
    longitude: String,
    status: {
		type: Number,
		enum: [0, 1],
		default: 0
    },
    country: [{
        type: Schema.Types.ObjectId, 
        ref: 'country',
        trim: true,
        required: true,
    }],
   
    isDeleted: {
        type: Boolean,
        default: false
    },
    modificationNotes: [ModificationNote]
});
// const country = mongoose.model('country', schema);
export default mongoose.model('seaports', schema);
