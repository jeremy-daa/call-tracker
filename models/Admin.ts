import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "admins" }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
