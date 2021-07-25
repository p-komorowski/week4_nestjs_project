import * as mongoose from 'mongoose';


export class Token extends mongoose.Document {
    id:string;
    user:number;
    expirationTime: Date
    }
    