import { Schema, model, Document } from 'mongoose'
import { hash, compare } from "bcryptjs";

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    comparePassWord(pass: string): boolean
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre<IUser>("save", async function (next) {
  const user: IUser = this;
  const passHash: IUser['password'] = await hash(user.password, 8);
  user.password = passHash;
  next();
});

userSchema.methods.toJSON = function() {
    const user = this;
    const objectUser = user.toObject();
    delete objectUser.password;
    return objectUser;
}

userSchema.methods.comparePassWord = async function (pass: string): Promise<boolean> {
    return await compare(pass, this.password)
}

export default model<IUser>('User', userSchema)