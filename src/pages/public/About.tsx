import { useEffect } from "react";
import { useAbout } from "../../hooks";
import PublicLayout from "../../layouts/PublicLayout";
import { Loader } from "../../components";

const AboutUsPage = () => {
  const { dataAboutPage, handleGetData } = useAbout();

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

  if (Object.keys(dataAboutPage).length === 0) {
    return <Loader />;
  }

  return (
    <PublicLayout isBannerSlider={false} dataPage={dataAboutPage.hero}>
      <div className="mt-20">
        {dataAboutPage &&
          dataAboutPage?.fundamentals.map((fundamental, index) => (
            <div
              key={fundamental._id}
              className={`container grid grid-cols-1 md:grid-cols-2 items-center p-8 mx-auto justify-items-center gap-y-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div
                className={`max-w-prose ${index % 2 === 0 ? "md:order-2" : ""}`}
              >
                <div className="section-title style1 left">
                  <h4 className="mb-2 text-3xl font-bold title md:text-6xl">
                    {fundamental.title}
                  </h4>
                  <p className="text-xl leading-relaxed text-justify description">
                    {fundamental.description}
                  </p>
                </div>
              </div>

              {/* Imagen */}
              <div
                className={`w-4/5 md:w-72 ${
                  index % 2 === 0 ? "md:order-1" : ""
                }`}
              >
                <img
                  src={fundamental.image}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
      </div>

      {/* <section className="banner-contact bg-[#031019] py-12 px-7 flex justify-center items-center flex-col overflow-hidden mt-20">
        <h2 className="flex flex-col text-5xl font-bold text-center text-white gap-14">
          Nuestros clientes
        </h2>
        <div className="select-none py-14 px-14">
          <div className="flex overflow-x-hidden whitespace-no-wrap">
            <div className="relative">
              <div
                className="flex animate-marquee"
                style={{
                  "--animation-duration": `${dataAboutPage.rotation_time}s`,
                }}
              >
                {dataAboutPage.companies.map((company) => (
                  <div
                    key={company._id}
                    className="flex flex-col items-center w-32 mx-12 gap-y-4"
                  >
                    <img
                      className="w-full h-full"
                      src={company.icon}
                      alt={company.name}
                    />
                    <span className="w-full font-bold text-center text-white">
                      {company.name}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="absolute top-0 flex animate-marquee2"
                style={{
                  "--animation-duration": `${dataAboutPage.rotation_time}s`,
                }}
              >
                {dataAboutPage.companies.map((company, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-32 mx-12 gap-y-4"
                  >
                    <img
                      className="w-full h-full"
                      src={company.icon}
                      alt={company.name}
                    />
                    <span className="w-full font-bold text-center text-white">
                      {company.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="mt-20">
        <div className="flex flex-col items-center justify-center gap-y-20">
          <h2 className="relative text-5xl font-bold text-center">
            Nuestros valores
          </h2>
          <div className="flex flex-wrap justify-between w-full my-10 px-14 gap-y-24 gap-x-20">
            {dataAboutPage.organizational_precepts.map((precept) => (
              <div
                key={precept._id}
                className="flex flex-col w-full gap-4 text-center lg:w-1/5 md:w-2/5 sm:w-1/2"
              >
                <img
                  className="mx-auto w-[100px] h-[100px]"
                  src={precept.icon}
                  alt={precept.title}
                />
                <span className="text-4xl font-bold">{precept.title}</span>
                <h5 className="text-xl">{precept.description}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AboutUsPage;
