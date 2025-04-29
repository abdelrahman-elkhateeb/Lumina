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
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Ensure correctAnswer is one of the options
        return this.options.includes(value);
      },
      message: "Correct answer must be one of the options"
    }
  }
});

const PlacementTestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    questions: [QuestionSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlacementTest", PlacementTestSchema);
