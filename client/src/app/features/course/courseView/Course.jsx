import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../../redux/courses/coursesApi";
import VideoPlayer from "./VideoPlayer";
import Sections from "./Sections";
import CourseOverview from "./CourseOverview";
import { useState } from "react";

function Course() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCourseQuery(id);

  const course = data?.course || {};
  const sections = data?.course.sections || [];
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(course.previewVideo || "");
  console.log(selectedVideoUrl);


  return (
    <section className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Content (Video & Overview) */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer videoUrl={selectedVideoUrl} />
          <CourseOverview course={course} />
        </div>

        {/* Right Sidebar (Sections) */}
        <aside className=" bg-primary-500 p-6 rounded-xl h-96 overflow-y-auto">
          <Sections sections={sections} setSelectedVideoUrl={setSelectedVideoUrl} />
        </aside>

      </div>
    </section>
  )
}

export default Course;
