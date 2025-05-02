import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { finishQuiz, nextQuestion } from "./takePlacementTestSlice"

function Footer({ points, secondsRemaining, answer, questionsLength, index }) {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center w-full px-4 mt-4">
      <div className="flex gap-5">
        <span className="text-sm font-semibold text-white bg-accent-500 px-4 py-2 rounded-full shadow-md">
          ⏳ {secondsRemaining}s
        </span>
        <span className="text-sm font-semibold text-gray-500 bg-accent-700 px-4 py-2 rounded-full shadow-md">
          🏆 {points} pts
        </span>
      </div>
      {answer !== null && questionsLength - 1 > index ?
        <Button type="small" onClick={() => dispatch(nextQuestion())}>Next</Button>
        : <Button type="small" onClick={() => dispatch(finishQuiz())}>finish</Button>}
    </div>
  )
}

export default Footer
