import Heading from "../../ui/Heading";
import image from "../../../../../public/assets/spaceMan(7).svg";
import { useGetPlacementTestQuery } from "../../redux/courses/coursesApi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LightBulbLoader from "../../ui/LightBulbLoader";
import ErrorPage from "../../ui/ErrorPage";
import { newAnswer, nextQuestion, tick } from "./takePlacementTestSlice";
import { useEffect } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Options from "./Options";
import Button from "../../ui/Button";
import Footer from "./Footer";

function PlacementTest() {
  const { courseId } = useParams();
  const { data, isLoading, error } = useGetPlacementTestQuery(courseId);
  const questions = data?.data?.questions;

  const dispatch = useDispatch();
  const {
    index,
    answer,
    points,
    secondsRemaining
  } = useSelector(state => state.takePlacementTest);

  const { status } = useSelector(state => state.takePlacementTest ?? { status: null });


  // useEffect(() => {
  //   if (status === 'active') {
  //     const timer = setInterval(() => dispatch(tick()), 1000);
  //     return () => clearInterval(timer);
  //   }
  // }, [status, dispatch]);

  if (isLoading) return <LightBulbLoader />
  if (error) return <ErrorPage />;
  if (!questions) return null;

  return (
    <section className="container mx-auto px-4">
      <Heading img={image} title="quiz time" />
      {status == "loading" && <StartScreen totalQuestions={questions.length} />}
      {status == "active" && (

        <div className="flex flex-col  gap-5 w-full">
          <Question questions={questions} index={index} />
          <Options questions={questions} index={index} answer={answer} />

          <Footer points={points} secondsRemaining={secondsRemaining} answer={answer} />
        </div>

      )}
    </section>
  )
}

export default PlacementTest;
