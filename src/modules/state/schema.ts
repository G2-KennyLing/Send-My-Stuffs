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
	// action: {
	// 	type: String
	// },
	countryName: [{
		type: Schema.Types.ObjectId,
		ref: "country", 
		required: true
	}],
	countryCode: [{
		type: Schema.Types.ObjectId,
		ref: "country", 
		required: true
	}],
	fipsCode: {
		type: Number,
		required: true,
		trim: true
	},
	ISO2: {
		type: String,
		required: true,
		trim: true
	},
	Status: {
		type: Number,
		enum: [0, 1],
		required: true,
		default: 0
	},
	modificationNotes: [ModificationNote]
})

export default mongoose.model("states", schema);
