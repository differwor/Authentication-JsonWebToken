import * as bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUserInput {
    name: string;
    password: string;
}

export interface IUserDocument extends Document {
    name: string;
    password: string;
    role: string;
    imageUrl: string;
}

const userSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'guest' },
        imageUrl: { type: String, require: false },
    },
    {
        timestamps: true,
    }
);

// hash password before save in database
userSchema.pre('save', async function (next) {
    const user = this;

    // just encrypt that changed or new
    if (!user.isModified('password')) return next();

    try {
        // create salt
        const salt = await bcrypt.genSalt(10);
        // hash password
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error: any) {
        return next(error);
    }
});

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;
