import { useDispatch } from "react-redux";
import { newAnswer } from "./takePlacementTestSlice";
import Button from "../../ui/Button";

function Options({ index, questions, answer }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-5">
      {questions[index].options.map((opt, i) => (
        <div key={i}>
          <Button
            type="primary"

            onClick={() =>
              dispatch(newAnswer({
                answer: opt,
                correctOption: questions[index].correctOption,
              }))
            }
            disabled={answer !== null}
          >
            {opt}
          </Button>
        </div>
      ))}
    </div>
  )
}

export default Options
