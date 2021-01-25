import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';
const Schema = mongoose.Schema;

const StateSchema = mongoose.Schema;

const schema = new StateSchema ({
	stateName: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		uppercase: true
	},
	action: String,
	country: [{
		type: Schema.Types.ObjectId,
		ref: "country", 
		required: true
	}],
	fipsCode: {
		type: Number,
		required: true,
		trim: true
	},
	iso2: {
		type: String,
		required: true,
		trim: true
	},
	status: {
		type: Number,
		enum: [0, 1],
		required: true,
		default: 0
	},
	deletedAt: {
		type: Date,
		default: undefined
	},
	isDeleted: {
        type: Boolean,
        default: false
    },
	modificationNotes: [ModificationNote]
})

export default mongoose.model("states", schema);
