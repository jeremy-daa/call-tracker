import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CallSchema = new Schema(
  {
    lead: {
      type: Schema.Types.ObjectId,
      ref: "leads", // Reference to the lead being called
      required: true,
    },
    callDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    callDuration: {
      type: Number, // Duration of the call in seconds
      required: true,
    },
    callOutcome: {
      type: String,
      enum: [
        "Connected",
        "Voicemail",
        "No Answer",
        "Disconnected",
        "Busy",
        "Other",
      ],
      required: true,
    },
    callNotes: {
      type: String, // Detailed notes about the call
    },
    followUpDate: {
      type: Date, // Suggested date for a follow-up call
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
  { collection: "calls", timestamps: true }
);

const Call = mongoose.models.Call || mongoose.model("Call", CallSchema);

export default Call;
