import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LeadSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      sparse: true,
    },

    phone: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      default: "No Company Name",
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      ref: "industries",
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "Not Called",
        "Call Scheduled",
        "Calling",
        "No Answer",
        "Left Voicemail",
        "Call Back Later",
        "Interested",
        "Not Interested",
        "Do Not Call",
        "Follow-up Required",
      ],
      default: "Not Called",
    },
    notes: {
      type: String,
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
  { collection: "leads", timestamps: true }
);

const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

export default Lead;
