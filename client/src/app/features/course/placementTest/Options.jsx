import { useDispatch } from "react-redux";
import { newAnswer } from "./takePlacementTestSlice";
import Button from "../../ui/Button";

function Options({ index, questions, answer }) {
  const dispatch = useDispatch();
  const currentQuestion = questions[index];

  return (
    <div className="flex items-center gap-5 flex-wrap">
      {currentQuestion.options.map((opt, i) => {
        let btnStyle = "";

        if (answer !== null) {
          if (opt === currentQuestion.correctOption) {
            btnStyle = "bg-accent-700 text-gray-500";
          } else if (opt === answer) {
            btnStyle = "bg-red-600 text-white";
          } else {
            btnStyle = "bg-gray-400 text-white";
          }
        }

        return (
          <Button
            key={i}
            type="primary"
            className={btnStyle}
            onClick={() =>
              dispatch(
                newAnswer({
                  answer: opt,
                  correctOption: currentQuestion.correctOption,
                })
              )
            }
            disabled={answer !== null}
          >
            {opt}
          </Button>
        );
      })}
    </div>
  );
}

export default Options
