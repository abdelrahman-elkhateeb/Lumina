import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "course-videos", // Folder name in Cloudinary
    resource_type: "video", // Video type
    allowed_formats: ["mp4", "avi", "mov", "mkv"],
  },
});

const upload = multer({ storage });

export default upload;