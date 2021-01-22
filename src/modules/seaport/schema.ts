import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;
const seaportSchema = mongoose.Schema;

const schema = new seaportSchema({
    seaportName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    portCode: {
        type: String,
        trim: true,
        required: true,
        unique: true
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
    isDeleted: {
        type: Boolean,
        default: false
    },

    modificationNotes: [ModificationNote]
});

export default mongoose.model('seaports', schema);
