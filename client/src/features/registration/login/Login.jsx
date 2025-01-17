import img1 from "../../../../public/assets/registration (1).jpg";
import img2 from "../../../../public/assets/registration (2).jpg";
import img3 from "../../../../public/assets/registration (3).jpg";
import img4 from "../../../../public/assets/registration (4).jpg";
import img5 from "../../../../public/assets/registration (5).jpg";
import img6 from "../../../../public/assets/registration (6).jpg";
import img8 from "../../../../public/assets/registration (8).jpg";
import img9 from "../../../../public/assets/registration (9).jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Autoplay, Pagination } from "swiper/modules"; // Removed Navigation
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";

function Login() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-dvh">
      {/* Login Form Section */}
      <form className="flex flex-col justify-center items-center p-8 bg-gray-50">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Lumina</h1>
          <h2 className="text-lg text-gray-600">Light the dark / Learn Brighter</h2>
        </div>
        <div className="w-full max-w-md">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Welcome back!
          </button>
          <div className="text-center">
            <h4 className="text-gray-600">Don't have an account?</h4>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-600 focus:outline-none"
            >
              Sign up
            </button>
          </div>
          <div className="flex justify-center mt-6 space-x-4">
            <button
              type="button"
              className="p-2 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
            >
              <i className="fa-brands fa-google"></i>
            </button>
            <button
              type="button"
              className="p-2 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
            >
              <i className="fa-brands fa-github"></i>
            </button>
          </div>
        </div>
      </form>

      {/* Image Section */}
      <div className="hidden md:block h-dvh p-4 md:p-20 cursor-grab">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={false}
          modules={[Autoplay, Pagination]} // Removed Navigation
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
                src={img2}
                alt="Slide 2"
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
                src={img4}
                alt="Slide 4"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full flex items-center justify-center">
              <img
                src={img5}
                alt="Slide 5"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full flex items-center justify-center">
              <img
                src={img6}
                alt="Slide 6"
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

          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Login;