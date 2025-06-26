import { useGetCoursesQuery } from "../redux/courses/coursesApi";

import Heading from "../ui/Heading";
import LightBulbLoader from "../ui/LightBulbLoader";
import AdminCourseCard from "./AdminCourseCard";

function AdminDashboard() {
  const { data, isLoading, error } = useGetCoursesQuery();

  if (isLoading) return <LightBulbLoader />;
  return (
    <section className="container mx-auto px-4">
      <Heading title={"dashboard"} img='/public/assets/spaceMan(7).svg' />
      <AdminCourseCard courses={data.courses} />
    </section>
  )
}

export default AdminDashboard;
