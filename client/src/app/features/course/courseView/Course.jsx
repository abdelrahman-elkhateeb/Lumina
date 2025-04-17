import { Link, useParams } from "react-router-dom";
import { useGetCourseQuery } from "../../redux/courses/coursesApi";
import VideoPlayer from "./VideoPlayer";
import Sections from "./Sections";
import CourseOverview from "./CourseOverview";
import { useState } from "react";
import Heading from "../../ui/Heading";
import spaceMan from "../../../../../public/assets/spaceMan(7).svg";
import spaceMan2 from "../../../../../public/assets/spaceMan.svg";

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

        <div className="grid grid-cols-1 col- md:grid-cols-3 gap-5 md:gap-5">

          <div className="md:col-span-2">
            <VideoPlayer videoUrl={selectedVideoUrl} />
            <CourseOverview course={course} />
          </div>

          <div>
            <aside className="bg-primary-500 p-6 rounded-xl h-96 overflow-y-auto">
              <Sections sections={sections} setSelectedVideoUrl={setSelectedVideoUrl} />
            </aside>
            <Link to="/codeEditor" className="flex flex-col items-center">
              <div className="w-56">
                <img src={spaceMan2} alt="" />
              </div>
              <span className="mt-2 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-500 via-primary-500 to-secondary-500 hover:from-secondary-500 hover:via-accent-500 hover:to-primary-500 transition-all duration-500 drop-shadow-md">
                code it ?!
              </span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Course;
