import Course from "../models/courseModel";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const createCourse = catchAsync(async (req, res, next) => {
  const course = new Course(req.body);

  if (!course) return next(new AppError('Invalid course data'));

  await course.save();

  res.status(201).json({
    message: 'Course created successfully',
    data: course
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


export const uploadVideo = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { lessonId, sectionId } = req.body;
  const videoUrl = req.file.path; // Cloudinary URL

  const course = await Course.findById(courseId);
  if (!course) return next(new AppError('Course not found', 404));

  const section = await course.sections.findById(sectionId);
  if (!section) return next(new AppError('Section not found', 404));

  const lesson = await section.lessons.findById(lessonId);
  if (!lesson) return next(new AppError('Lesson not found', 404));

  lesson.videoUrl = videoUrl;
  await course.save();

  res.status(200).json({
    message: 'Video uploaded successfully',
    videoUrl
  })
});