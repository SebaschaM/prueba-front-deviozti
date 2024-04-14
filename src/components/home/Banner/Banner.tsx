import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { BannerInfo, Hero } from "../../../interfaces/dataHome";
import styles from "./Banner.module.css";

interface BannerDataI {
  data: Hero[];
  dataBanner: BannerInfo;
}

export const Banner = ({ data, dataBanner }: BannerDataI) => {
  const handleDownload = () => {
    const pdfPath = "/brochure/brochure_devioz.pdf";
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="section swiper-container swiper-slider" id="home">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        loop={true}
        navigation
        initialSlide={parseInt(localStorage.getItem("slide") || "0")}
        onSlideChange={(e) => {
          localStorage.setItem("slide", e.realIndex.toString());
        }}
        className="swiper-container swiper-wrapper"
      >
        <SwiperSlide tabIndex={0}>
          <div
            className={`${styles.swiper_slide_custom} relative  flex justify-center items-center !h-[75vh] md:!h-[75vh] lg:!h-[95vh] xl:h-[30vh] 2xl:h-[60vh] `}
          >
            {data[0]?.image.includes("mp4") ? (
              <video
                autoPlay
                loop
                muted
                className="object-cover w-full h-full brightness-50 "
              >
                <source src={data[0]?.image} type="video/mp4" />
                Tu navegador no soporta el tag de video.
              </video>
            ) : (
              <div
                className={styles.bg_slide_1}
                style={{
                  backgroundImage: `url('${data[0]?.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            )}

            <div
              className={`${styles.grid_custom} absolute  grid items-center justify-between h-full px-2 pt-20 mx-auto sm:px-10 cus:grid-cols-2 gap-y-10 w-[100%] cus:w-full sm:w-[80%] md:w-[75%]`}
            >
              {/* Contenido informacion */}
              <div className="flex flex-col items-center justify-center w-full h-full col-span-1 gap-4 px-20 mt-8 animate__animated animate__fadeInUp cus:items-start">
                <h5 className="text-[#2ed3ae] text-3xl lg:text-left text-center">
                  {data[0].texts.text_1}
                </h5>
                <h1 className="text-5xl font-bold text-center text-white lg:text-left">
                  {data[0].texts.text_2}
                </h1>
                <p className="hidden text-xl text-center text-white lg:block cus:text-left">
                  {data[0].texts.text_3}
                  <br />
                </p>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-6 py-3 mt-4 mb-2 text-sm font-medium text-white transition-all duration-300 bg-transparent border border-white hover:bg-white focus:outline-none focus:ring-4 hover:text-black md:py-5 md:px-12"
                >
                  {data[0].texts.text_button}
                </button>
              </div>

              <div className="relative top-0 right-0 z-30 flex flex-col items-end justify-end h-full">
                <div className="right-0 flex items-center justify-center pointer-events-none">
                  <div className="relative top-0 right-0 z-0 w-full h-full">
                    <img
                      className="w-full h-full "
                      src="/images/home-slider-04.webp"
                      alt=""
                    />

                    <div
                      className={`absolute z-20 pointer-events-auto ${styles.width_custom}`}
                    >
                      <video
                        className={`object-cover w-full h-full ${styles.video_custom}`}
                        src={data[0].video}
                        controls
                        loop
                      ></video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide tabIndex={1}>
          <div
            className={`${styles.swiper_slide_custom} flex justify-center items-center !h-[75vh] md:!h-[75vh] lg:!h-[95vh] xl:h-[30vh] 2xl:h-[60vh] `}
          >
            <div
              className={styles.bg_slide_2}
              style={{
                backgroundImage: `url('${data[1].image}')`,
              }}
            ></div>
            <div className="swiper-slide-caption">
              <div className="container flex flex-col items-center justify-center w-full h-full gap-8 px-14 animate__animated animate__fadeInUp">
                <h2 className="text-3xl text-center text-white md:text-6xl">
                  {data[1].texts.text_1}
                </h2>
                <h3 className="hidden text-white md:block md:text-5xl">
                  {data[1].texts.text_2}
                </h3>
                <ul className="group text-xs-nowrap">
                  <li>
                    <button
                      type="button"
                      className="px-10 py-4 text-sm font-bold text-white transition-all duration-300 bg-transparent border-white hover:bg-white hover:text-black border-x border-y"
                    >
                      {data[1].texts.text_button}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide tabIndex={2}>
          <div
            className={`${styles.swiper_slide_custom} flex justify-center items-center !h-[75vh] md:!h-[75vh] lg:!h-[95vh] xl:h-[30vh] 2xl:h-[60vh] `}
          >
            <div
              className={styles.bg_slide_3}
              style={{
                backgroundImage: `url('${data[2].image}')`,
              }}
            ></div>
            <div className="flex items-center justify-center swiper-slide-caption">
              <div className="container flex flex-col items-center justify-center w-full h-full gap-8 px-14 animate__animated animate__fadeInUp">
                <h2 className="text-3xl text-center text-white md:text-6xl">
                  {data[2].texts.text_1}
                </h2>
                <ul className="group text-xs-nowrap">
                  <li>
                    <button
                      type="button"
                      className="px-10 py-4 text-sm font-bold text-white transition-all duration-300 bg-transparent border-white hover:bg-white hover:text-black border-x border-y"
                    >
                      {data[2].texts.text_button}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="banner-contact bg-[#031019] py-14 px-14 flex justify-center items-center flex-col gap-8">
        <h2 className="text-3xl text-center text-white">
          <span className="text-3xl font-bold text-white">
            {dataBanner.text_bold}{" "}
          </span>
          {dataBanner.text}
        </h2>
        <button
          type="button"
          className="bg-white hover:bg-transparent px-10 py-4 text-[#070f26] hover:text-white border-x border-y border-white transition-all duration-300 font-bold text-[12px]"
        >
          {dataBanner.text_button}
        </button>
      </div>
    </section>
  );
};
