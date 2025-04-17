import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../../redux/courses/coursesApi";
import VideoPlayer from "./VideoPlayer";
import Sections from "./Sections";
import CourseOverview from "./CourseOverview";
import { useState } from "react";
import CodeEditor from "../../ui/codeEditor/CodeEditor";

function Course() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCourseQuery(id);

  const course = data?.course || {};
  const sections = data?.course.sections || [];
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(course.previewVideo || "");

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side: Video, Overview, and IDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* Video Player */}
          <VideoPlayer videoUrl={selectedVideoUrl} />

          {/* Course Overview */}
          <CourseOverview course={course} />
        </div>

        {/* Right Sidebar: Sections */}
        <aside className="bg-primary-500 p-6 rounded-xl h-96 overflow-y-auto">
          <Sections sections={sections} setSelectedVideoUrl={setSelectedVideoUrl} />
        </aside>
      </div>
      {/* Embedded CodePen IDE */}
      <div className="bg-black rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Try It Yourself </h2>
        <CodeEditor />
      </div>
    </section>
  );
}

export default Course;
