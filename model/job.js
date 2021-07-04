const mongoose = require("mongoose");
let userJob = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  worker_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  task: String,
  assign_date: Date,
  target_date: Date,
  complete_date: Date,
  status: {
    type: String,
    enum: ["in-process", "complete", "pending"],
    default: "pending",
  },
});

module.exports = mongoose.model("jobs", userJob);
