import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarBackground from "../ui/StarBackground";
import { useGetCourseQuery } from "../redux/courses/coursesApi";

function Recommended() {
  const { data, error, isLoading } = useGetCourseQuery();
  console.log(data);

  return (
    <section className="relative">
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
              <div className="w-max shadow-lg rounded-lg overflow-hidden">
                <img src={course.courseImage} alt={course.title} className="w-full h-48 object-cover" />
                <h3 className="capitalize text-sm my-1">{course.title}</h3>
                <h4 className="capitalize text-xs">{course.instructor.name}</h4>
                <p className="capitalize">{course.enrollmentType}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Recommended;
