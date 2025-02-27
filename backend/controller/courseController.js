import Course from "../models/course/courseModel";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import cloudinary from "../utils/cloudinaryConfig";

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

export const createCourse = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError('No video file uploaded', 400));

  // Upload video to Cloudinary
  const uploadResult = await uploadToCloudinary(req.file.buffer);

  // Create new course with Cloudinary video URL
  const course = new Course({
    ...req.body, // Spread request body data
    videoUrl: uploadResult.secure_url, // Add Cloudinary video URL
  });

  await course.save();

  res.status(201).json({
    message: 'Course created successfully',
    data: course,
  });
});


export const getCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find();

  if (!courses) return next(new AppError('No courses found'));

  res.status(200).json({
    message: 'Courses retrieved successfully',
    data: courses
  })
});
