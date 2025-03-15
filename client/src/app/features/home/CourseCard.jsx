import { useState } from "react";
import { PlayCircle } from "lucide-react";

function CourseCard({ course }) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="w-80 bg-site-background shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={course.courseImage}
          alt={`${course.title} Cover`}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => setShowPreview(true)}
          className="absolute inset-0 flex items-center justify-center bg-site-background bg-opacity-40 hover:bg-opacity-60 transition"
        >
          <PlayCircle className="w-12 h-12 text-white" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold capitalize mb-1">{course.title}</h3>
        <h4 className="text-sm text-gray-500 capitalize mb-2">
          By {course.instructor.name}
        </h4>
        <p className="text-sm text-gray-400 mb-3 line-clamp-3">
          {course.description}
        </p>
        <div className="flex justify-between items-center text-sm">
          <span className={`font-semibold ${course.price === 0 ? "text-green-500" : "text-blue-500"}`}>
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>
          <span className="capitalize bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
            {course.enrollmentType}
          </span>
        </div>
      </div>
    </div>
  )
};

export default CourseCard;
