import Heading from "../../../ui/Heading";
import spaceMan from "../../../../../../public/assets/spaceMan(7).svg";
import Question from "./Question";
import Options from "./Options";
import { useSelector } from "react-redux";
import { useCreatePlacementTestMutation } from "../../../redux/courses/coursesApi";

function PlacementTest() {
  const questions = useSelector((state) => state.placementTest.questions);
  const currentQuestionIndex = questions.length - 1;
  const [createPlacementTest, { isLoading }] = useCreatePlacementTestMutation();

  const handleSubmitTest = async () => {
    const courseId = "YOUR_COURSE_ID_HERE";

    try {
      await createPlacementTest({ questions, courseId }).unwrap();
      alert("Placement test created successfully!");
      
    } catch (error) {
      console.error("Error submitting placement test", error);
    }
  };

  return (
    <section className="container mx-auto px-4">
      <Heading title="Create Placement Test" img={spaceMan} />
      <div className="flex flex-col gap-4">
        <Question />
        {questions.length > 0 && (
          <>
            <Options questionIndex={currentQuestionIndex} />
            <button
              onClick={handleSubmitTest}
              disabled={isLoading}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              {isLoading ? "Submitting..." : "Submit Placement Test"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default PlacementTest;
