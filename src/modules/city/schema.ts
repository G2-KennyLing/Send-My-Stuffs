import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;
const CitySchema = mongoose.Schema;

const schema = new CitySchema({
    cityName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        uppercase: true
    },
    icons: String,
    country: [{
        type: Schema.Types.ObjectId, 
        ref: 'countries',
    }],

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

export default mongoose.model('cities', schema);
