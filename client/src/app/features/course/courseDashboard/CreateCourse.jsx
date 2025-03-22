import { useCreateCourseMutation } from "../../redux/courses/coursesApi";

function CreateCourse() {
  const [createCourse, { isLoading, error }] = useCreateCourseMutation();

  return (
    <section className="container mx-auto px-4">
      hi
    </section>
  )
}

export default CreateCourse;
