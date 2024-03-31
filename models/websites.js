import mongoose, { Schema, models } from "mongoose";

const websitesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  domen: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  hostType: {
    type: String,
    required: true,
  },
});

const Websites = models.Websites || mongoose.model("Websites", websitesSchema);
export default Websites;
