import Heading from "../../../ui/Heading";
import spaceMan from "/public/assets/spaceMan(7).svg";
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
        {question &&
          <>
            <Options
              options={options}
              onOptionsChange={(newOptions) => dispatch(setOptions(newOptions))}
              correctOption={correctOption}
              onCorrectOptionChange={(option) => dispatch(setCorrectOption(option))}
            />
            <button
              onClick={handleSubmitTest}
              disabled={isLoading}
            className="inline-block text-sm rounded-full bg-primary-500 font-semibold uppercase tracking-wide text-text transition-colors duration-300 hover:bg-accent-500 focus:bg-accent-500 focus:outline-none focus:ring focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed p-4 w-fit ml-auto"
            >
              {isLoading ? "Submitting..." : "Submit Question"}
            </button>
            </>
        }
      </div>
    </section>
  );
}

export default PlacementTest;
