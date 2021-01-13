import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const UserSchema = mongoose.Schema;

const schema = new UserSchema({
    name: {
        type: {
            firstName: String,
            lastName: String
        },
        required: [true, 'Name user is required'],
        trim: true
    },
    telephone:{
        type: String,
        trim: true
    },
    mobile:{
        type:String,
        trim: true
    },
    email: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "Can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true,
        trim: true
    },
    password:{
        type: String,
        required: [true,'Password user is required']
    },
    dateOfBirth: {
        type: Date
    },
    companyName:{
        type: String
    },
    companyRole:{
        type: Number,
        enum: [0,1,2,3,4,5],
        default: 0
    },
    lastActivity:{
        type: Date
    },
    daysSinceLogin:{
        type:Number
    },
    userType:{
        type: Number,
        enum: [0,1]
    },
    premission:{
        type: [Number]
    },
    deletedAt:{
        type:Date,
        default: undefined
    }
    ,
    modificationNotes: [ModificationNote]
});

export default mongoose.model('users', schema);