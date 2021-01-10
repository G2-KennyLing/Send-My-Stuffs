import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const seaportSchema = mongoose.Schema;

const schema = new seaportSchema({
    seaportName: String,
    portCode: String,
    countryName: String,
    countryCode: String,
    latitude: String,
    longitude: String,
    status: {
		type: Number,
		enum: [0, 1],
		default: 0
	},
    isDeleted: {
        type: Boolean,
        default: false
    },
    modificationNotes: [ModificationNote]
});

export default mongoose.model('seaports', schema);