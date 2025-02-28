const Course = require("./courseModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const cloudinary = require("../../utils/cloudinaryConfig");

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
  if (!req.file) return next(new AppError('No video file uploaded', 400));

  // Create new course with Cloudinary video URL
  const course = await Course.create({
    ...req.body,
    videoUrl: uploadResult.secure_url, // Add Cloudinary video URL
  });

  //save the course 
  await course.save();

  res.status(201).json(
    {
      message: "Course created successfully",
      data: course
    }
  )
})