import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarBackground from "../ui/StarBackground";

const recommendedItems = [
  { id: 1, title: "Course 1", img: "/assets/course1.jpg" },
  { id: 2, title: "Course 2", img: "/assets/course2.jpg" },
  { id: 3, title: "Course 3", img: "/assets/course3.jpg" },
  { id: 4, title: "Course 4", img: "/assets/course4.jpg" },
];

function Recommended() {
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
          className="mySwiper"
        >
          {recommendedItems.map((course) => (
            <SwiperSlide key={course.id} className="flex justify-center">
              <div className="w-72 bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={course.img} alt={course.title} className="w-full h-48 object-cover" />
                <h3 className="text-lg font-semibold text-center py-3">{course.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Recommended;
