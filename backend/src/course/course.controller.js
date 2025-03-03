require('dotenv').config();
const Course = require("./courseModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const cloudinary = require("../../utils/cloudinaryConfig");
const streamifier = require("streamifier");
const multer = require("multer");
// Store files in memory (useful for Cloudinary, AWS S3, etc.)
const storage = multer.memoryStorage();
// Allow all file types
const upload = multer({ storage });

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

exports.getCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find({}).populate("instructor");

  if (!courses) return next(new AppError("No courses found", 404));

  res.status(200).json({
    message: "Courses retrieved successfully",
    courses
  });
});

exports.getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate("instructor");

  if (!course) return next(new AppError("Course not found", 404));

  res.status(200).json({
    message: "Course retrieved successfully",
    course
  }
  )
});

exports.updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!course) return next(new AppError("Course not found", 404));
  
  res.status(200).json({
    message: "Course updated successfully",
    course
  });
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) return next(new AppError("Course not found", 404));

  res.status(204).json({
    message: "Course deleted successfully",
  });
});

exports.createSection = catchAsync(async (req, res, next) => {
  const { courseId, title } = req.body;
  if (!courseId || !title) return next(new AppError("Missing courseId or title", 400));

  const course = await Course.findById(courseId);
  if (!course) return next(new AppError("Course not found", 404));

  const titles = course.sections.map(section => section.title.toLowerCase());

  if (titles.includes(title.toLowerCase())) return next(new AppError("Section title already exists", 400));


  const section = { title, lessons: [] };

  if (!Array.isArray(course.sections)) course.sections = []; // Prevent undefined error
  course.sections.push(section);
  await course.save();

  res.status(201).json({
    message: "Section created successfully",
    section,
  });
});

exports.getSections = catchAsync(async (req, res, next) => {
  const sections = await Course.find().select("section");

  if (!sections) return next(new AppError("No sections found", 404));

  res.status(201).json({
    message: "Sections retrieved successfully",
    sections
  })
});

exports.createLesson = [
  upload.single("video"), // Use upload.single for a single file upload
  catchAsync(async (req, res, next) => {
    const { courseId, sectionId, title, description } = req.body;

    // Debugging: Log the request
    console.log("req.file:", req.file); // Check if the file is being received
    console.log("req.body:", req.body); // Check if other fields are being received
    console.log("----------------------------------------------------------");

    // Validate the request
    if (!req.file) return next(new AppError("No video file uploaded", 400));
    if (!courseId || !sectionId || !title) return next(new AppError("Missing required fields", 400));

    // Upload the video to Cloudinary
    const video = await uploadToCloudinary(req.file.buffer);
    if (!video) return next(new AppError("Failed to upload video to Cloudinary", 400));

    // Find the course and section
    const course = await Course.findById(courseId);
    if (!course) return next(new AppError("Course not found", 404));

    const section = course.sections.id(sectionId);
    if (!section) return next(new AppError("Section not found", 404));

    // Create the lesson
    const lesson = {
      title,
      description,
      videoUrl: video.secure_url, // Store Cloudinary URL
    };

    // Ensure `lessons` array exists
    if (!Array.isArray(section.lessons)) section.lessons = [];
    section.lessons.push(lesson);

    // Save the course
    await course.save();

    // Send the response
    res.status(201).json({
      message: "Lesson created successfully",
      lesson,
    });
  }),
];
