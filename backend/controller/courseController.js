import catchAsync from "../utils/catchAsync";
import Course from "../models/courseModel";
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

export const getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) return next(new AppError('Course not found', 404));

  res.status(200).json({
    message: 'Course retrieved successfully',
    data: course
  })
});

export const updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!course) return next(new AppError('Course not found', 404));

  res.status(200).json({
    message: 'Course updated successfully',
    data: course
  });
});

export const deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) return next(new AppError('Course not found', 404));

  res.status(200).json({
    message: 'Course deleted successfully',
  })
})