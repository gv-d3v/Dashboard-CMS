import mongoose, { Schema, models } from "mongoose";

const accommodationSchema = new Schema(
  {
    websiteId: {
      type: String,
      required: true,
    },
    accommId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rooms: {
      type: String,
      required: true,
    },
    guests: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

const Accommodation = models.Accommodation || mongoose.model("Accommodation", accommodationSchema);
export default Accommodation;
