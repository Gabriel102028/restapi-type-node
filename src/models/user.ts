import {model, Schema, Document} from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document{
    email: string, 
    password: string
}

const UserSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true, 
        trim: true
    }, 
    password: {
        type: String,
        require: true
    },
    status:{
        type: Boolean
    }
});

UserSchema.pre<IUser>('save', async function (next) { 
    const user = this;
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();

});



export default model<IUser>('User', UserSchema);