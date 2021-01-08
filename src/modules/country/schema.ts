import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const CountrySchema = mongoose.Schema;

const schema = new CountrySchema ({
	countryCode: {
		type: String,
		trim: true,
		required: true
	},
	countryName: {
		type: String,
		trim: true,
		required: true
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
	seaPorts: {
		type: String,
		trim: true,
		required: true
	},
	airPorts: {
		type: String,
		trim: true,
		required: true
	},
	agents: {
		type: String,
		trim: true,
		required: true
	}, 
	customers: {
		nameCustomers:String
	},
	modificationNotes: [ModificationNote]
});

export default mongoose.model('country', schema);