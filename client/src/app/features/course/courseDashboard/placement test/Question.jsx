import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../../redux/courses/placementTestSlice";

function Question() {
  const dispatch = useDispatch();
  const [questionText, setQuestionText] = useState("");
  const question = useSelector(state => state.placementTest);
  console.log(question);

  const handleAddQuestion = () => {
    if (!questionText.trim()) return;

    dispatch(addQuestion({ questionText: questionText.trim() }));

    setQuestionText("");
  };

  return (
    <div>
      <div className="w-full p-5 bg-secondary-500/40 rounded-lg font-mono">
        <label htmlFor="question" className="block text-text text-sm font-bold mb-2">
          Question
        </label>

        <input
          type="text"
          name="question"
          placeholder="Enter your question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-accent-500 hover:shadow-lg hover:border-accent-700 bg-gray-100 text-black"
        />
      </div>

      <button
        type="button"
        onClick={handleAddQuestion}
        className="mt-4 px-6 py-2 bg-accent-500 text-white rounded-lg shadow-md hover:bg-accent-700 transition duration-300"
      >
        Add Question
      </button>
    </div>
  );
}

export default Question;
