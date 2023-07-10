import mongoose, { Document, Schema } from 'mongoose';

export interface RoleDocument extends Document {
    role: string;
    permissions: string[];
}

const roleSchema: Schema<RoleDocument> = new Schema({
    role: { type: String, required: true },
    permissions: { type: [String], required: true },
});

const Role = mongoose.model<RoleDocument>('User', roleSchema);

export default Role;
