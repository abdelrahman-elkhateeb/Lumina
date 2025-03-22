import { useCreateCourseMutation } from "../../redux/courses/coursesApi";

function CreateCourse() {
  const [createCourse, { isLoading, error }] = useCreateCourseMutation();

  return (
    <div>
      hi
    </div>
  )
}

export default CreateCourse;
