const Course = require("./courseModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const cloudinary = require("../../utils/cloudinaryConfig");
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'video' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

exports.createCourse = catchAsync(async (req, res, next) => {
  const course = await Course.create(req.body);

  if (!course) return next(new AppError("Course creation failed", 400));

  res.status(201).json({
    message: "course created successfully",
    course
  });
});

exports.createSection = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.body.courseId);
  if (!course) return next(new AppError("Course not found", 404));

  const section = {
    title: req.body.title,
    lesson: []
  }

  course.sections.push(section);
  await course.save();


  res.status(201).json({
    message: "Section created successfully",
    section
  });
});

exports.createLesson = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError("No video file uploaded", 400));

  const video = await uploadToCloudinary(req.file.buffer);

  const course = await Course.findById(req.body.courseId);
  if (!course) return next(new AppError("Course not found", 404));

const section = course.sections.id(req.body.sectionId);
if (!section) return next(new AppError("Section not found", 404));

  // Create new lesson
  const lesson = {
    title: req.body.title,
    description: req.body.description,
    videoUrl: video.secure_url, // Store Cloudinary video URL
  };

  // Push lesson to the section and save
  section.lessons.push(lesson);
  await course.save();

  res.status(201).json({
    message: "Lesson created successfully",
    lesson
  })
});