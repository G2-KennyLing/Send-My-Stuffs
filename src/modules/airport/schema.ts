import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;
const AirportSchema = mongoose.Schema;

const schema = new AirportSchema({
    airportName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        uppercase: true
    },
    portCode: { 
        type: String,
        trim: true,
        required: true,
        unique: true,
        uppercase: true
    },
    country: [{
        type: Schema.Types.ObjectId, 
        ref: 'countries',
    }],
    latitude: String,
    longitude: String,
    status: {
		type: Number,
		enum: [0, 1],
		default: 0
    },
    deletedAt:{
        type:Date,
        default: undefined
    },
    modificationNotes: [ModificationNote]
});

export default mongoose.model('airports', schema);
