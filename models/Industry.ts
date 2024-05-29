import mongoose from "mongoose";

const Schema = mongoose.Schema;

const IndustrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "industries", timestamps: true }
);

const Industry =
  mongoose.models.Industry || mongoose.model("Industry", IndustrySchema);

export default Industry;
