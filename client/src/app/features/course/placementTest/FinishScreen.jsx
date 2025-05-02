import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../placementTest/takePlacementTestSlice";
import Button from "../../ui/Button";

function FinishScreen() {
  const dispatch = useDispatch();
  const { points, index } = useSelector((state) => state.takePlacementTest);
  console.log("hi");


  const totalQuestions = index + 1;
  const maxPossiblePoints = totalQuestions * 10;
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "🙃";
  else if (percentage > 0) emoji = "🤨";
  else emoji = "🤦‍♂️";

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-4xl font-bold">
        {emoji} You scored <span className="text-accent-500">{points}</span> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </h1>
      <Button
        type="primary"
        to="/"
        onClick={() => dispatch(resetQuiz())}
      >
        home page
      </Button>
    </div>
  );
}

export default FinishScreen;
