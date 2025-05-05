require('dotenv').config();
const mongoose = require('mongoose');
const Course = require("./courseModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const cloudinary = require("../../utils/cloudinaryConfig");
const streamifier = require("streamifier");
const multer = require("multer");
const User = require('../users/userModel');
const PlacementTest = require('./PlacementTestModel');
// Store files in memory (useful for Cloudinary, AWS S3, etc.)
const storage = multer.memoryStorage();
// Allow all file types
const upload = multer({ storage });

// Utility to sanitize folder names
const sanitizeFolderName = (name) => {
  return name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
};

const uploadToCloudinary = (buffer, fileType, folder) => {
  return new Promise((resolve, reject) => {
    const resourceType = fileType.startsWith("video") ? "video" : "image";
    const folderName = resourceType === "video"
      ? `courses_videos/${folder}`
      : `courses_images/${folder}`;

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

// main crud for course
exports.createCourse = [
  upload.fields([
    { name: "courseImage", maxCount: 1 },
    { name: "previewVideo", maxCount: 1 },
  ]),
  catchAsync(async (req, res, next) => {
    // Validate file uploads
    if (!req.files || (!req.files.courseImage && !req.files.previewVideo)) {
      return next(new AppError("Please upload at least an image or a video", 400));
    }

    // Sanitize course title for folder usage
    const folder = sanitizeFolderName(req.body.title || "default_course");

    let imageUrl, videoUrl;

    // Upload course image
    if (req.files.courseImage) {
      const imageResult = await uploadToCloudinary(
        req.files.courseImage[0].buffer,
        req.files.courseImage[0].mimetype,
        folder
      );
      imageUrl = imageResult.secure_url;
    }

    // Upload course video
    if (req.files.previewVideo) {
      const videoResult = await uploadToCloudinary(
        req.files.previewVideo[0].buffer,
        req.files.previewVideo[0].mimetype,
        folder
      );
      videoUrl = videoResult.secure_url;
    }

    const { whatYouWillLearn } = req.body;

    const parsedWhatYouWillLearn = Array.isArray(whatYouWillLearn)
      ? whatYouWillLearn
      : JSON.parse(whatYouWillLearn || "[]");

    // Create the course in the database
    const course = await Course.create({
      ...req.body,
      instructor: req.user._id,
      whatYouWillLearn: parsedWhatYouWillLearn,
      courseImage: imageUrl,
      previewVideo: videoUrl,
    });

    if (!course) return next(new AppError("Course creation failed", 400));

    await User.findByIdAndUpdate(req.user._id, {
      $push: { createdCourses: course._id },
    });


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
  const course = await Course.findById(req.params.id).populate({ path: "instructor", select: "name" });

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
    { name: "previewVideo", maxCount: 1 },
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

    if (req.files?.previewVideo && req.files.previewVideo.length > 0) {
      const videoResult = await uploadToCloudinary(
        req.files.previewVideo[0].buffer,
        req.files.previewVideo[0].mimetype
      );
      updateData.previewVideo = videoResult.secure_url;
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
  const { id } = req.params;

  const course = await Course.findByIdAndDelete(id);
  if (!course) return next(new AppError("Course not found", 404));

  const courseId = req.user._id;
  await User.findByIdAndUpdate(courseId, {
    $pull: { createdCourses: id }
  });

  res.status(204).json({
    message: "Course deleted successfully",
  });
});

// additional features
exports.previewCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id)
    .populate({ path: "instructor", select: "name" })
    .select("-enrolledStudents -studentsProgress -createdAt -updatedAt -sections")
    .lean();

  if (!course) return next(new AppError("Course not found", 404));

  res.status(200).json({
    message: "Course preview retrieved successfully",
    course,
  });
});

exports.featuredCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find({})
    .select("-description -previewVideo -whatYouWillLearn -enrolledStudents -studentsProgress -createdAt -updatedAt -sections")
    .populate({ path: "instructor", select: "name" })
    .lean();

  if (!courses) return next(new AppError("Course not found", 404));

  res.status(200).json({
    message: "Course preview retrieved successfully",
    courses,
  });
});

exports.getMyCourses = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate({
      path: "purchasedCourses", select: "-sections -description -previewVideo -whatYouWillLearn -enrolledStudents -createdAt -updatedAt", populate: {
        path: "instructor",
        select: "name -_id",
      }
    }).lean();

  if (!user) return next(new AppError("User not found", 404));

  res.status(200).json({
    message: "Purchased courses retrieved successfully",
    courses: user.purchasedCourses,
  });
});

exports.purchaseCourses = catchAsync(async (req, res, next) => {
  const { courseIds } = req.body;

  // Validate input
  if (!Array.isArray(courseIds) || courseIds.length === 0) {
    return next(new AppError("courseIds must be a non-empty array", 400));
  }

  // Validate each ID format
  const invalidIds = courseIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
  if (invalidIds.length > 0) {
    return next(new AppError(`Invalid Course IDs: ${invalidIds.join(", ")}`, 400));
  }

  // Fetch user
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Fetch valid courses from the database
  const validCourses = await Course.find({ _id: { $in: courseIds } });

  if (validCourses.length === 0) {
    return next(new AppError("No valid courses found", 404));
  }

  // Add valid courses to the user's purchasedCourses using $addToSet to avoid duplicates
  const addedCourses = validCourses.map(course => course._id);

  // Update user and add the courses to purchasedCourses array
  await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { purchasedCourses: { $each: addedCourses } } },
    { new: true }  // Return the updated user document
  );

  res.status(200).json({
    status: "success",
    message: `${addedCourses.length} course(s) purchased successfully`,
    purchasedCourses: addedCourses,
  });
});

exports.displayInstructorCourses = catchAsync(async (req, res, next) => {
  const instructor = await User.findById(req.user._id).populate("createdCourses");

  if (!instructor) {
    return next(new AppError("Instructor not found", 404));
  }

  res.status(200).json({
    status: "success",
    courses: instructor.createdCourses,
  });
});

exports.createCoursePlacementTest = catchAsync(async (req, res, next) => {
  const { question, options, correctOption, courseId } = req.body;

  // Validate inputs
  if (
    !question ||
    !correctOption ||
    !options ||
    !Array.isArray(options) ||
    options.length === 0
  ) {
    return res.status(400).json({
      status: "fail",
      message: "Question, options, and correctOption are required.",
    });
  }

  // Check if course exists and populate placementTest
  const course = await Course.findById(courseId).populate("placementTest");

  if (!course) {
    return res.status(404).json({
      status: "fail",
      message: "Course not found.",
    });
  }

  const newQuestion = {
    question,
    options,
    correctOption,
  };

  let placementTest;

  if (!course.placementTest) {
    // Create a new placement test with the first question
    placementTest = new PlacementTest({
      questions: [newQuestion],
    });

    await placementTest.save();

    // Link the placement test to the course
    course.placementTest = placementTest._id;
    await course.save();
  } else {
    // Add a new question to existing placement test
    placementTest = course.placementTest;
    placementTest.questions.push(newQuestion);
    await placementTest.save();
  }

  res.status(201).json({
    status: "success",
    data: placementTest,
  });
});

exports.getPlacementTest = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  if (!courseId) {
    return next(new AppError('Please provide a courseId', 400));
  }

  const course = await Course.findById(courseId).populate('placementTest');
  if (!course || !course.placementTest) {
    return next(new AppError('No placement test found for this course', 404));
  }

  res.status(200).json({
    status: 'success',
    data: course.placementTest,
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
  upload.single("video"),
  catchAsync(async (req, res, next) => {
    const { courseId, sectionId, title, description } = req.body;

    if (!req.file) {
      return next(new AppError("No video file uploaded", 400));
    }

    if (!courseId || !sectionId || !title) {
      return next(new AppError("Missing required fields", 400));
    }

    const folder = courseId;

    const video = await uploadToCloudinary(
      req.file.buffer,
      req.file.mimetype,
      folder
    );

    if (!video) return next(new AppError("Failed to upload video to Cloudinary", 400));

    const course = await Course.findById(courseId);
    if (!course) return next(new AppError("Course not found", 404));

    const section = course.sections.id(sectionId);
    if (!section) return next(new AppError("Section not found", 404));

    const lesson = {
      title,
      description,
      videoUrl: video.secure_url,
    };

    if (!Array.isArray(section.lessons)) section.lessons = [];
    section.lessons.push(lesson);

    await course.save();

    res.status(201).json({
      message: "Lesson created successfully",
      lesson,
    });
  }),
];

exports.updateLesson = [
  upload.fields([
    { name: "videoUrl", maxCount: 1 },
  ]),
  catchAsync(async (req, res, next) => {
    const { courseId, lessonId } = req.params;
    const updatedData = { ...req.body };
    if (req.files?.videoUrl) {
      const updateVideo = await uploadToCloudinary(
        req.files.videoUrl[0].buffer,
        req.files.videoUrl[0].mimetype,
      );
      updatedData.videoUrl = updateVideo.secure_url;
    }
    const course = await Course.findOneAndUpdate(
      { _id: courseId, "sections.lessons._id": lessonId },
      { $set: { "sections.$[].lessons.$[lesson]": updatedData } },
      {
        arrayFilters: [{ "lesson._id": lessonId }],
        new: true,
      }
    );

    if (!course) return next(new AppError("Course not found", 404));
    res.status(200).json({ message: "Lesson updated successfully", course });
  })
]