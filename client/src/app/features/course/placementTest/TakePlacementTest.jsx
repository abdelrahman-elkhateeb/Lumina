import Heading from "../../ui/Heading";
import { useGetPlacementTestQuery } from "../../redux/courses/coursesApi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LightBulbLoader from "../../ui/LightBulbLoader";
import ErrorPage from "../../ui/ErrorPage";
import { tick } from "./takePlacementTestSlice";
import { useEffect } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Options from "./Options";
import Footer from "./Footer";
import FinishScreen from "./FinishScreen";

function PlacementTest() {
  const { courseId } = useParams();
  const { data, isLoading, error } = useGetPlacementTestQuery(courseId);
  const questions = data?.data?.questions;

  const dispatch = useDispatch();
  const {
    status,
    index,
    answer,
    points,
    secondsRemaining
  } = useSelector(state => state.takePlacementTest);

  useEffect(() => {
    if (status === 'active') {
      const timer = setInterval(() => dispatch(tick()), 1000);
      return () => clearInterval(timer);
    }
  }, [status, dispatch]);

  if (isLoading) return <LightBulbLoader />;
  if (error) return <ErrorPage />;
  if (!questions) return null;

  const questionsLength = questions.length;

  return (
    <section className="container mx-auto px-4">
      <Heading img="/assets/spaceMan(7).svg" title="quiz time" />
      {status === "loading" && <StartScreen totalQuestions={questionsLength} />}
      {status === "active" && index < questionsLength && (
        <div className="flex flex-col gap-5 w-full">
          <Question questions={questions} index={index} />
          <Options questions={questions} index={index} answer={answer} />
          <Footer
            points={points}
            questionsLength={questionsLength}
            secondsRemaining={secondsRemaining}
            answer={answer}
            index={index}
          />
        </div>
      )}
      {status === "finished" && <FinishScreen />}
    </section>
  );
}

export default PlacementTest;
