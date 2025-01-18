import img1 from "../../../../public/assets/registration (1).jpg";
import img3 from "../../../../public/assets/registration (3).jpg";
import img8 from "../../../../public/assets/registration (8).jpg";
import img9 from "../../../../public/assets/registration (9).jpg";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";

function ImageCarousel() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="hidden bg-background-900 md:block h-dvh p-4 md:p-20 cursor-grab">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={false}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-full"
      >
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
            <img
              src={img1}
              alt="Slide 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
            <img
              src={img3}
              alt="Slide 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
            <img
              src={img8}
              alt="Slide 7"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
            <img
              src={img9}
              alt="Slide 8"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </SwiperSlide>

        {/* Autoplay Progress Circle */}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="var(--accent-500)"
              strokeWidth="4"
              fill="none"
            />
          </svg>
          <span
            ref={progressContent}
            className="text-accent-500 font-bold text-sm"
          ></span>
        </div>
      </Swiper>
    </div>
  );
}

export default ImageCarousel;
