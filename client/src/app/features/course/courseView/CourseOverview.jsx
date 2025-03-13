import Heading from "../../ui/Heading";
import spaceMan from "../../../../../public/assets/spaceMan(7).svg";

function CourseOverview({ course }) {
  return (
    <section>
      <Heading title={course.title} img={spaceMan} />
      <div className="p-6 mt-5 rounded-xl bg-site-secondary">
        <h2 className="text-2xl font-bold text-primary mb-4">Course Description</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {course.description}
        </p>
      </div>
    </section>
  )
}

export default CourseOverview;
