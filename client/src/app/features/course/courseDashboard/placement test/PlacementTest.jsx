import Heading from "../../../ui/Heading";
import spaceMan from "../../../../../../public/assets/spaceMan(7).svg";
import Question from "./Question";
import Options from "./Options";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePlacementTestMutation } from "../../../redux/courses/coursesApi";
import { useParams } from "react-router-dom";
import { resetQuestion, setCorrectOption, setLoading, setOptions, setQuestion } from "../../../redux/courses/placementTestSlice";

function PlacementTest() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [createPlacementTest] = useCreatePlacementTestMutation();

  // Direct access to current question fields
  const { question, options, correctOption, isLoading } = useSelector(
    (state) => state.placementTest
  );

  console.log(question, options, correctOption);


  const handleSubmitTest = async () => {
    try {
      dispatch(setLoading(true));
      await createPlacementTest({
        question,
        options,
        correctOption,
        courseId
      }).unwrap();

      // Reset form after successful submission
      dispatch(resetQuestion());
      alert("Question submitted successfully!");
    } catch (error) {
      console.error("Error submitting question", error);
      alert("Failed to submit question");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section className="container mx-auto px-4">
      <Heading title="Create Placement Test" img={spaceMan} />
      <div className="flex flex-col gap-4">
        <Question
          value={question}
          onChange={(e) => dispatch(setQuestion(e.target.value))}
        />
        <Options
          options={options}
          onOptionsChange={(newOptions) => dispatch(setOptions(newOptions))}
          correctOption={correctOption}
          onCorrectOptionChange={(option) => dispatch(setCorrectOption(option))}
        />
        <button
          onClick={handleSubmitTest}
          disabled={isLoading}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          {isLoading ? "Submitting..." : "Submit Question"}
        </button>
      </div>
    </section>
  );
}

export default PlacementTest;
