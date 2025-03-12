import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../redux/courses/coursesApi";
import LightBulbLoader from "../ui/LightBulbLoader";
import ErrorPage from "../ui/ErrorPage";
import spaceMan from "../../../../public/assets/spaceMan.svg";

function CoursePreview() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCourseQuery(id);

  const course = data?.course;

  if (isLoading) return <LightBulbLoader />;
  if (error) return <ErrorPage />;

  return (
    <section className="min-h-dvh container mx-auto p-6 flex flex-col-reverse lg:flex-row gap-8">
      {/* Course Info */}
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-32">
            <img src={spaceMan} alt="Spaceman" />
          </div>
          <h1 className="text-4xl font-bold capitalize text-primary">{course.title}</h1>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">{course.category}</p>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center gap-3 mt-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {course.instructor.name[0]}
            </span>
          </div>
          <h4 className="text-md text-gray-800 dark:text-gray-200">
            Created by <span className="font-semibold">{course.instructor.name}</span>
          </h4>
        </div>

        {/* What You Will Learn */}
        <div className="ml-8 mt-8">
          <h2 className="text-2xl font-bold capitalize text-primary mb-4">What You Will Learn :</h2>
          <ul className="space-y-3">
            {course.whatYouWillLearn?.map((item, index) => (
              <li key={index} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-2">
                <span className="w-2 h-2 mt-2 bg-site-primary rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button className="mt-6 px-6 py-3 bg-site-primary text-site-text rounded-xl shadow-lg hover:bg-site-primary/80 transition">
          Start Course
        </button>
      </div>

      {/* Course video */}
      <div className="flex-1 w-full shadow-lg rounded-2xl overflow-hidden">
        <video
          src={course.previewVideo}
          controlsList="nodownload noplaybackrate"
          controls
          className="w-full rounded-2xl"
        ></video>
      </div>
    </section>

  )
}

export default CoursePreview;
