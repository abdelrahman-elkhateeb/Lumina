const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: [arr => arr.length >= 2, "At least two options are required"]
  },
  correctOption: {
    type: String,
    required: true,
  }
});

const PlacementTestSchema = new mongoose.Schema(
  {
    // title: {
    //   type: String,
    //   required: true
    // },
    questions: [QuestionSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlacementTest", PlacementTestSchema);
