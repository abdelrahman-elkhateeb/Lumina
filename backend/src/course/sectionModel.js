import mongoose from "mongoose";
import LessonSchema from "./lessonModel.js";

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  lessons: [LessonSchema]
});

export default SectionSchema;