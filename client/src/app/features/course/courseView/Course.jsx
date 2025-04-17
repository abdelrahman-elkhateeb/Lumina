import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../../redux/courses/coursesApi";
import VideoPlayer from "./VideoPlayer";
import Sections from "./Sections";
import CourseOverview from "./CourseOverview";
import { useState } from "react";
import CodeEditor from "../../ui/codeEditor/CodeEditor";
import Heading from "../../ui/Heading";
import spaceMan from "../../../../../public/assets/spaceMan(7).svg";

function Course() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCourseQuery(id);

  const course = data?.course || {};
  const sections = data?.course.sections || [];
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(course.previewVideo || "");

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="">
        <Heading title={course.title} img={spaceMan} />

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">

          <div className="col-span-2">
            <VideoPlayer videoUrl={selectedVideoUrl} />
          </div>

          <aside className="bg-primary-500 p-6 rounded-xl h-96 overflow-y-auto">
            <Sections sections={sections} setSelectedVideoUrl={setSelectedVideoUrl} />
          </aside>
        </div>
        <CourseOverview course={course} />
      </div>

      <div className="bg-background-500 rounded-lg shadow-md p-4 mt-10">
        <CodeEditor />
      </div>
    </section>
  );
}

export default Course;
