import { useParams } from "react-router-dom";
import { useGetCourseLearnQuery } from "../../redux/courses/coursesApi";
import VideoPlayer from "./VideoPlayer";
import Sections from "./Sections";
import CourseOverview from "./CourseOverview";

function Course() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCourseLearnQuery(id);

  const course = data?.course || {};
  const sections = data?.course.sections || [];

  return (
    <section className="h-dvh container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Content (Video & Overview) */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer />
          <CourseOverview course={course} />
        </div>

        {/* Right Sidebar (Sections) */}
        <aside className="hidden lg:block border-l p-4 h-screen overflow-y-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <Sections sections={sections} />
        </aside>

      </div>
    </section>
  )
}

export default Course;
