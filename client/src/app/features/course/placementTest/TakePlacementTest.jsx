import Heading from "../../ui/Heading";
import image from "../../../../../public/assets/spaceMan(7).svg";
import { useGetPlacementTestQuery } from "../../redux/courses/coursesApi";
import { useParams } from "react-router-dom";

function PlacementTest() {
  const { courseId } = useParams();
  const { data } = useGetPlacementTestQuery(courseId);

  const questions = data?.data?.questions;
  console.log(questions);

  return (
    <section className="container mx-auto px-4">
      <Heading img={image} title="quiz time" />
    </section>
  )
}

export default PlacementTest;
