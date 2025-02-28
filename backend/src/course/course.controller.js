const Course = require("./courseModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const cloudinary = require("../../utils/cloudinaryConfig");
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: "courses_videos" }, // Organize uploads
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

exports.createCourse = catchAsync(async (req, res, next) => {
  const course = await Course.create({
    ...req.body,
    instructor: req.user._id
  });
  if (!course) return next(new AppError("Course creation failed", 400));

  res.status(201).json({
    message: "Course created successfully",
    course,
  });
});

exports.createSection = catchAsync(async (req, res, next) => {
  const { courseId, title } = req.body;
  if (!courseId || !title) return next(new AppError("Missing courseId or title", 400));

  const course = await Course.findById(courseId);
  if (!course) return next(new AppError("Course not found", 404));

  const section = { title, lessons: [] };

  if (!Array.isArray(course.sections)) course.sections = []; // Prevent undefined error
  course.sections.push(section);
  await course.save();

  res.status(201).json({
    message: "Section created successfully",
    section,
  });
});

exports.createLesson = catchAsync(async (req, res, next) => {
  const { courseId, sectionId, title, description } = req.body;

  if (!req.file) return next(new AppError("No video file uploaded", 400));
  if (!courseId || !sectionId || !title) return next(new AppError("Missing required fields", 400));

  const video = await uploadToCloudinary(req.file.buffer);

  const course = await Course.findById(courseId);
  if (!course) return next(new AppError("Course not found", 404));

  const section = course.sections.id(sectionId);
  if (!section) return next(new AppError("Section not found", 404));

  const lesson = {
    title,
    description,
    videoUrl: video.secure_url, // Store Cloudinary URL
  };

  if (!Array.isArray(section.lessons)) section.lessons = []; // Ensure `lessons` exists
  section.lessons.push(lesson);
  await course.save();

  res.status(201).json({
    message: "Lesson created successfully",
    lesson,
  });
});
