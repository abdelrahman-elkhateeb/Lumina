import Heading from "../../../ui/Heading";
import spaceMan from "../../../../../../public/assets/spaceMan(7).svg";
import Question from "./Question";
import Options from "./Options";
import { useSelector } from "react-redux";

function PlacementTest() {
  const questions = useSelector((state) => state.placementTest.questions);
  const currentQuestionIndex = questions.length - 1;

  return (
    <section className="container mx-auto px-4">
      <Heading title="Create Placement Test" img={spaceMan} />
      <div className="flex flex-col gap-4">
        <Question />
        {questions.length > 0 && (
          <Options
            questionIndex={currentQuestionIndex}
          />
        )}
      </div>
    </section>
  );
}

export default PlacementTest;
