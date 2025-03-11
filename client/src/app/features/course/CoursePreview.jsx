import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../redux/courses/coursesApi";
import LightBulbLoader from "../ui/LightBulbLoader";
import ErrorPage from "../ui/ErrorPage";

function CoursePreview() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCourseQuery(id);

  const course = data?.course;

  if (isLoading) return <LightBulbLoader />;
  if (error) return <ErrorPage />;

  return (
    <section className="h-dvh container mx-auto px-4">
      <h1 className="text-3xl mt-8 capitalize">{course.title}</h1>
      <h3 className="text-xl mt-5">Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps</h3>
      <h4 className="mt-5">created by <strong>Dr. Angela Yu</strong></h4>

      <div>
        <p>what you'll learn</p>
        <ul>
          <li>Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.</li>
          <li>Build 10 web development projects with React, Node, and PostgreSQL.</li>
          <li>Build fully-fledged websites and web apps for your startup or business.</li>
          <li>Work as a freelance web developer.</li>
        </ul>
      </div>
    </section>
  )
}

export default CoursePreview;
