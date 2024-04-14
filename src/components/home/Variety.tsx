import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const Variety = () => {
  const arrayDemoContent = [1, 2, 3, 4];

  return (
    <section
      className="mt-20 gap-y-10 sm:w-2/3 md:w-[85%] lg:w-3/5 m-auto
    xl:w-4/6
    w-full
    2xl:w-[55%]"
    >
      <h2 className="text-5xl text-center">Variety of Layouts</h2>
      <div className="flex flex-col items-center px-8 mt-10 swiper-container swiper-slider">
        <img
          src={`/images/variety_layouts/home-11.png`}
          alt={`home-11`}
          width="650"
          height="0"
          className="h-auto"
        />
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          className="swiper-wrapper"
          autoHeight={true}
        >
          {arrayDemoContent.map((item) => (
            <SwiperSlide key={item}>
              <div className="flex justify-center w-full">
                <img
                  src={`/images/variety_layouts/demo-header-0${item}.jpg`}
                  alt={`demo-header-${item}`}
                  width="650"
                  height="0"
                  className="h-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          className="swiper-wrapper h-auto !h-min-[30rem]"
          autoHeight={true}
        >
          {arrayDemoContent.map((item) => (
            <SwiperSlide key={item}>
              <div className="flex justify-center w-full">
                <img
                  src={`/images/variety_layouts/demo-content-0${item}.jpg`}
                  alt={`demo-content-${item}`}
                  width="650"
                  height="0"
                  className="h-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          className="swiper-wrapper"
          autoHeight={true}
        >
          {arrayDemoContent.map((item) => (
            <SwiperSlide key={item}>
              <div className="relative flex justify-center w-full">
                <img
                  src={`/images/variety_layouts/demo-footer-0${item}.jpg`}
                  alt={`demo-footer-${item}`}
                  width="650"
                  height="0"
                  className="h-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
