import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 0
  },
  resources: [{ type: String }]
});

export default LessonSchema;