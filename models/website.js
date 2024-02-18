import mongoose, { Schema, models } from 'mongoose';
//
const websiteSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Website = models.Website || mongoose.model('Website', websiteSchema);
export default Website;
