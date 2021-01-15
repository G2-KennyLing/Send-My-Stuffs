import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';
const Schema = mongoose.Schema;

const CountrySchema = mongoose.Schema;	

const schema = new CountrySchema ({
	countryCode: {
		type: String,
		trim: true,
		uppercase: true,
		required: true,
		unique: true
	},
	countryName: {
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	region: {
		type: String,
		trim: true,
		required: true
	},
	timeZone: {
		type: String,
		trim: true,
		required: true
	},
	seaPorts: [{
		type: Schema.Types.ObjectId,
		ref: 'seaPort'
	}],
	airPorts: {
		type: Schema.Types.ObjectId,
		ref: 'airPort'
	},
	agents: {
		type: String,
		trim: true,
		required: true
	}, 
	customers: {
		
	},
	modificationNotes: [ModificationNote]
});

export default mongoose.model('countries', schema);

