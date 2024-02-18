import mongoose, { Schema, models } from 'mongoose';
//
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            required: false,
        }
    },
    { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);
export default User;
