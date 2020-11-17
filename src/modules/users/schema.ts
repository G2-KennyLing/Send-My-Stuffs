import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const UserSchema = mongoose.Schema;

const schema = new UserSchema({
    name: {
        type: {
            firstName: String,
            lastName: String
        }
    },
    email: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true},
    phoneNumber: String,
    gender: String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    modificationNotes: [ModificationNote]
});

export default mongoose.model('users', schema);