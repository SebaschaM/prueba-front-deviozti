import { useEffect } from "react";
import { Loader, Pages } from "../components";
import { useHome } from "../hooks";
import PublicLayout from "../layouts/PublicLayout";

declare module "react" {
  interface CSSProperties {
    "--animation-duration"?: string;
  }
}

export default function Home() {
  const { dataHomePage, handleGetData } = useHome();

  const onGetData = async () => {
    try {
      await handleGetData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    onGetData();
  }, []);

  console.log(dataHomePage)

  if (Object.keys(dataHomePage).length === 0) {
    return <Loader />;
  }

  return (
    <PublicLayout isBannerSlider={true}>
      <section className="mt-20">
        <div className="flex flex-col items-center justify-center gap-y-20">
          <h2 className="relative text-5xl font-bold text-center">
            Características
          </h2>
          <div className="flex flex-wrap justify-between w-full my-10 px-14 gap-y-24">
            {dataHomePage.characteristics.map(
              (characteristic, index) =>
                characteristic.isVisibled && (
                  <div
                    className="flex flex-col w-full gap-4 text-center lg:w-1/5 md:w-2/5 sm:w-1/2"
                    key={index}
                  >
                    <img
                      className="mx-auto w-[100px] h-[100px]"
                      src={characteristic.icon}
                      alt={characteristic.text}
                    />
                    <span className="text-4xl font-bold">
                      {characteristic.quantity}
                    </span>
                    <h5 className="text-xl">{characteristic.text}</h5>
                  </div>
                )
            )}
          </div>
        </div>
      </section>

      <section className="banner-contact bg-[#031019] py-14 px-14 flex justify-center items-center flex-col gap-14 overflow-hidden mt-20">
        <h2 className="text-5xl font-bold text-center text-white">
          Nuestras habilidades técnicas
        </h2>
        <div className="select-none">
          <div className="flex overflow-x-hidden whitespace-no-wrap">
            <div className="relative">
              <div
                className="flex animate-marquee"
                style={{
                  "--animation-duration": `${dataHomePage.rotation_time}s`,
                }}
              >
                {dataHomePage.technical_skills.map((skill, index) => (
                  <div
                    className="flex flex-col items-center w-32 mx-12 gap-y-4"
                    key={index}
                  >
                    <img
                      className="w-full h-full"
                      src={skill.icon}
                      alt={skill.skill}
                    />
                    <span className="w-full font-bold text-center text-white">
                      {skill.skill}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="absolute top-0 flex animate-marquee2"
                style={{
                  "--animation-duration": `${dataHomePage.rotation_time}s`,
                }}
              >
                {dataHomePage.technical_skills.map((skill, index) => (
                  <div
                    className="flex flex-col items-center w-32 mx-12 gap-y-4"
                    key={index}
                  >
                    <img
                      className="w-full h-full"
                      src={skill.icon}
                      alt={skill.skill}
                    />
                    <span className="w-full font-bold text-center text-white">
                      {skill.skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pages data={dataHomePage.projects} />

      <section className="flex items-center bg-[#031019] gap-x-8 px-10 mt-20 py-20 lg:py-0">
        <div className="hidden lg:block">
          <img
            className="mb-[-55px] relative w-[60rem] h-[30rem] lg:block hidden lg:pt-20 pt-0"
            src={dataHomePage.optimized.img}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center lg:items-start gap-11">
          <h2 className="text-4xl font-bold text-center text-white md:text-left md:text-5xl ">
            {dataHomePage.optimized.title_main}
          </h2>
          <div className="flex flex-col items-center md:flex-row gap-x-6 gap-y-6 lg:items-start">
            <div className="flex flex-col items-center w-9/12 md:w-1/2 lg:items-start">
              <div className="flex flex-col items-center gap-3 sm:flex-row ">
                <img
                  src={dataHomePage.optimized.icon_1}
                  alt="Icon 1"
                  className="w-12 h-12"
                />
                <h5 className="text-xl font-bold text-white">
                  {dataHomePage.optimized.title_1}
                </h5>
              </div>
              <p className="mt-5 text-xl text-center text-white lg:text-start">
                {dataHomePage.optimized.text_1}
              </p>
            </div>
            <div className="flex flex-col items-center w-9/12 md:w-1/2 lg:items-start">
              <div className="flex flex-col items-center gap-3 sm:flex-row ">
                <img
                  src={dataHomePage.optimized.icon_2}
                  alt="Icon 2"
                  className="w-12 h-12"
                />
                <h5 className="text-xl font-bold text-white">
                  {dataHomePage.optimized.title_2}
                </h5>
              </div>
              <p className="mt-5 text-xl text-center text-white lg:text-start">
                {dataHomePage.optimized.text_2}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center mt-24 px-14 gap-14">
        <h2 className="text-5xl font-bold text-center text-black">
          Obten el mejor plan de DevOps
        </h2>
        <div className="flex flex-col items-center justify-center w-full gap-20 mt-10 lg:flex-row">
          {dataHomePage.payment_plans.map((plan, index) => (
            <div
              className="w-full bg-white border-2 lg:w-1/4 sm:w-1/2"
              style={{
                borderColor: plan.color,
                transform:
                  plan.title_1 === "Ultimate" ? "scale(1.2)" : "scale(1)",
              }}
              key={index}
            >
              <div
                className="w-full h-3"
                style={{
                  backgroundColor: plan.color,
                }}
              ></div>
              <div className="p-8 ">
                <img
                  className="m-auto"
                  src="/images/sales/confetti-1.png"
                  alt="confetti"
                />
                <div className="flex flex-col items-center justify-center py-4 mb-4">
                  <h3 className="text-4xl font-bold">{plan.title_1}</h3>
                  <p className="text-xl text-center">{plan.text_title_1}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-5xl">${plan.price}</span>
                  <span className="ml-1 text-lg text-center text-gray-600">
                    {plan.text_1}
                  </span>
                  <span className="mb-4 text-lg text-center text-gray-600">
                    {plan.span_1}
                  </span>
                </div>

                <button
                  type="button"
                  className={`hover:bg-black w-full p-3 text-xl font-bold transition-all duration-300 border-2 border-black rounded-lg hover:text-white`}
                >
                  Solicitar
                </button>
                <ul className="mt-4 text-gray-600 list-disc list-inside">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="text-xl">
                      {benefit.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <Variety /> */}
      {/* <Content /> */}
    </PublicLayout>
  );
}
