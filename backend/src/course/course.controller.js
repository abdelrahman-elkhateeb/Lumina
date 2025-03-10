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

const uploadToCloudinary = (buffer, fileType) => {
  return new Promise((resolve, reject) => {
    const resourceType = fileType.startsWith("video") ? "video" : "image";
    const folderName = resourceType === "video" ? "courses_videos" : "courses_images";

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType, folder: folderName },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// crud for course
exports.createCourse = [
  upload.fields([
    { name: "courseImage", maxCount: 1 },
    { name: "courseVideo", maxCount: 1 },
  ]),
  catchAsync(async (req, res, next) => {
    // Check if files were uploaded
    if (!req.files || (!req.files.courseImage && !req.files.courseVideo)) {
      return next(new AppError("Please upload at least an image or a video", 400));
    }

    let imageUrl, videoUrl;

    // Upload image to Cloudinary if it exists
    if (req.files.courseImage) {
      const imageResult = await uploadToCloudinary(
        req.files.courseImage[0].buffer,
        req.files.courseImage[0].mimetype
      );
      imageUrl = imageResult.secure_url;
    }

    // Upload video to Cloudinary if it exists
    if (req.files.courseVideo) {
      const videoResult = await uploadToCloudinary(
        req.files.courseVideo[0].buffer,
        req.files.courseVideo[0].mimetype
      );
      videoUrl = videoResult.secure_url;
    }

    // Create the course with the uploaded file URLs
    const course = await Course.create({
      ...req.body,
      instructor: req.user._id,
      courseImage: imageUrl, // match with schema field name
      courseVideo: videoUrl, // optional if you store video URLs
    });

    if (!course) return next(new AppError("Course creation failed", 400));

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  }),
];

exports.getCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find({}).populate("instructor");

  if (!courses) return next(new AppError("No courses found", 404));

  res.status(200).json({
    message: "Courses retrieved successfully",
    courses,
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

exports.updateCourse = [
  upload.fields([
    { name: "courseImage", maxCount: 1 },
    { name: "courseVideo", maxCount: 1 },
  ]),
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updateData = { ...req.body }; // Avoid direct mutation

    // Upload image to Cloudinary if provided
    if (req.files?.courseImage && req.files.courseImage.length > 0) {
      const imageResult = await uploadToCloudinary(
        req.files.courseImage[0].buffer,
        req.files.courseImage[0].mimetype
      );
      updateData.courseImage = imageResult.secure_url;
    }

    // Upload video to Cloudinary if provided
    if (req.files?.courseVideo && req.files.courseVideo.length > 0) {
      const videoResult = await uploadToCloudinary(
        req.files.courseVideo[0].buffer,
        req.files.courseVideo[0].mimetype
      );
      updateData.courseVideo = videoResult.secure_url;
    }

    // Update the course
    const course = await Course.findByIdAndUpdate(id, updateData, {
      new: true, // Return updated document
      runValidators: true, // Enforce schema validation
    });

    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  }),
];

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) return next(new AppError("Course not found", 404));

  res.status(204).json({
    message: "Course deleted successfully",
  });
});

// crud for section
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

exports.getSection = catchAsync(async (req, res, next) => {
  const { courseId, sectionId } = req.params;

  const course = await Course.findById(courseId).select("sections");

  if (!course) return next(new AppError("Course not found", 404));

  const section = course.sections.find(sec => sec._id.toString() === sectionId);

  if (!section) return next(new AppError("Section not found", 404));

  res.status(200).json({
    message: "Section retrieved successfully",
    section
  });
});

exports.updateSection = catchAsync(async (req, res, next) => {
  const { courseId, sectionId } = req.params;

  const course = await Course.findOneAndUpdate(
    { _id: courseId, "sections._id": sectionId },
    { $set: { "sections.$": req.body } }, // Update the specific section
    { new: true } // Return the updated document
  ).select("sections");

  if (!course) return next(new AppError("Section not found", 404));

  res.status(200).json({
    message: "Section updated successfully",
    section: course.sections.find(sec => sec._id.toString() === sectionId)
  });
});

exports.deleteSection = catchAsync(async (req, res, next) => {
  const { courseId, sectionId } = req.params;

  const course = await Course.findOneAndUpdate(
    { _id: courseId },
    { $pull: { sections: { _id: sectionId } } },
    { new: true } // Return the updated course after deletion
  );

  if (!course) return next(new AppError("Section not found", 404));

  res.status(200).json({ message: "Section deleted successfully" });

});

// crud for lessons
exports.createLesson = [
  upload.fields([
    { name: "video", maxCount: 1 },
  ]),
  catchAsync(async (req, res, next) => {
    const { courseId, sectionId, title, description } = req.body;

    // Validate the request
    if (!req.files?.video) return next(new AppError("No video file uploaded", 400));
    if (!courseId || !sectionId || !title) return next(new AppError("Missing required fields", 400));

    // Upload the video to Cloudinary
    const video = await uploadToCloudinary(req.files.video[0].buffer, req.files.video[0].mimetype);
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