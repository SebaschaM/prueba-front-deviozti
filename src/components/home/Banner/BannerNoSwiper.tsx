import { Loader } from "../..";
import { Hero } from "../../../interfaces/dataHome";
import styles from "./Banner.module.css";

interface BannerDataI {
  data: Hero[] | any;
}

export const BannerNoSwiper = ({ data = {} }: BannerDataI) => {
  if (Object.keys(data).length === 0) {
    return <Loader />;
  }
  return (
    <section className="section" id="about">
      <div
        className={`${styles.swiper_slide_custom} flex justify-center items-center !h-[75vh] md:!h-[75vh] lg:!h-[95vh] xl:h-[30vh] 2xl:h-[60vh] `}
      >
        <div
          className={styles.bg_slide_1}
          style={{
            backgroundImage: `url(${data.image})`,
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div
          className={`${styles.grid_custom} grid grid-cols-1 items-center justify-between h-full px-2 pt-20 mx-auto sm:px-10 w-[100%] cus:w-full sm:w-[80%] md:w-[75%]`}
        >
          <div className="flex flex-col items-center justify-center h-full col-span-1 gap-12 px-4 m-auto xl:w-4/6 sm:w-full animate__animated animate__fadeInUp">
            <h1 className="text-4xl font-bold text-center text-white uppercase sm:text-6xl">
              {data.title}
            </h1>
            <p className="text-xl text-center text-white sm:text-2xl">
              {data.description}
              <br />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
