import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarBackground from "../ui/StarBackground";
import { useGetcoursesPreviewQuery } from "../redux/courses/coursesApi";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";

function Recommended() {
  const { data, error, isLoading } = useGetcoursesPreviewQuery();

  return (
    <section className="relative mt-20">
      <StarBackground />
      <div className="overflow-hidden w-full p-6 relative">
        <StarBackground />
        <h2 className="text-3xl font-bold text-center mb-6">Recommended for You</h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 2, spaceBetween: 50 },
            1280: { slidesPerView: 3, spaceBetween: 50 },
          }}
          className="mySwiper custom-swiper"
        >
          {data?.courses.map((course) => (
            <SwiperSlide key={course._id} className="flex justify-center">
              <Link to={`/courses/${course._id}`}>
                <CourseCard course={course} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Recommended;
