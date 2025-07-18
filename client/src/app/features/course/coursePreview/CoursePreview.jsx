import { useParams } from "react-router-dom";
import { useGetCoursePreviewQuery } from "../../redux/courses/coursesApi";
import LightBulbLoader from "../../ui/LightBulbLoader";
import ErrorPage from "../../ui/ErrorPage";
import PreviewVideo from "./PreviewVideo";
import WhatYouWillLearn from "./WhatYouWillLearn";
import Button from "../../ui/Button";
import Instructor from "./Instructor";
import Heading from "../../ui/Heading";
import Description from "./Description";
import Category from "./Category";


function CoursePreview() {
  const { courseId } = useParams();
  const { data, error, isLoading } = useGetCoursePreviewQuery(courseId);

  const course = data?.course;

  if (isLoading) return <LightBulbLoader />;

  if (error) return <ErrorPage />;

  return (
    <section className="container px-4 mx-auto h-full grid grid-cols-1 md:grid-cols-2 gap-20">
      <div>
        <PreviewVideo previewVideo={course.previewVideo} />

        <Instructor instructor={course.instructor} />

        <Category category={course.category} />

        <Description description={course.description} />
      </div>

      <div className="space-y-5">
        <Heading img="/public/assets/spaceMan.svg" title={course.title} />

        <WhatYouWillLearn whatYouWillLearn={course.whatYouWillLearn} />

        <div className="flex gap-5">
          <Button type="small" to="/payment">
            buy now
          </Button>
          <Button type="small" to={`/placement-test/${courseId}`}>
            placement test
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CoursePreview;
