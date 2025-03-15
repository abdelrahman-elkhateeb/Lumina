import { useGetMyCoursesQuery } from "../../redux/courses/coursesApi";

function MyCourses() {
  const { data, isLoading, error } = useGetMyCoursesQuery();
  console.log(data);

  return (
    <div>

    </div>
  )
}

export default MyCourses;
