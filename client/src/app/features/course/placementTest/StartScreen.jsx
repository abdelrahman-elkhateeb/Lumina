import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { startQuiz } from "./takePlacementTestSlice";

function StartScreen({ totalQuestions }) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-5xl">Welcome to placement test by lumina</h2>
      <h3 className="text-3xl text-center">placement test helps us understand your current knowledge level, so we can recommend the course content that's best suited for you</h3>
      <Button type="primary" onClick={() => dispatch(startQuiz(totalQuestions))}>start quiz</Button>
    </div>
  )
}

export default StartScreen;
