import React, { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";

import { useHome, useSocialMedia } from "../hooks";
import {
  Banner,
  BannerNoSwiper,
  ButtonSocials,
  Drawer,
  Footer,
  Loader,
  Navbar,
} from "../components";

interface PublicLayoutProps {
  children: React.ReactNode;
  isBannerSlider?: boolean;
  dataPage?: any;
}

const PublicLayout = ({
  children,
  isBannerSlider,
  dataPage,
}: PublicLayoutProps) => {
  const { dataHomePage, handleGetData } = useHome();
  const { dataSocialMedia, handleGetData: handleGetDataSocial } =
    useSocialMedia();
  const [isOpen, setIsOpen] = useState(false);
  const [sectionProjectSelected, setSectionProjectSelected] = useState("");

  const onGetData = async () => {
    try {
      await Promise.all([handleGetData(), handleGetDataSocial()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    onGetData();
  }, []);

  if (
    Object.keys(dataHomePage).length === 0 &&
    Object.keys(dataSocialMedia).length === 0 &&
    !dataPage
  ) {
    return <Loader />;
  }

  return (
    <div className={`page-transition ${isOpen ? "overflow-hidden" : ""}`}>
      <div>
        <Navbar data={dataHomePage.navbar} />
        {isBannerSlider ? (
          <Banner
            data={dataHomePage.heros}
            dataBanner={dataHomePage.banner_info}
          />
        ) : (
          <BannerNoSwiper data={dataPage} />
        )}
      </div>
      {children}
      <Footer data={dataHomePage.footer} dataSocialMedia={dataSocialMedia} />
      <button
        type="button"
        className="fixed bottom-0 right-0 z-50 p-2 m-auto text-black translate-x-0 bg-white shadow-lg -top-60 h-fit"
        onClick={() => setIsOpen(true)}
      >
        <BsChevronLeft className="sm:!text-[35px] text-[20px]" />
      </button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col items-center justify-center gap-2 overflow-hidden">
          {/* <button
            type="button"
            className="bg-[#2ed3ae] p-4 text-white font-bold"
          >
            Button
          </button> */}

          <div className="flex flex-wrap items-center justify-center w-full gap-6 mt-16">
            <select
              id="countries"
              defaultValue={"DEFAULT"}
              onChange={(e) => setSectionProjectSelected(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value={"DEFAULT"} disabled>
                Selecciona tipo de proyecto
              </option>
              {dataHomePage?.projects?.map((project, index) => (
                <option key={index} value={project.name_project}>
                  {project.name_project}
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="grid grid-cols-2 gap-4 mt-8 overflow-y-auto items-start h-[calc(70vh)] w-full overflow-x-hidden">
            {dataHomePage?.projects?.map((project, index) => {
              return (
                <React.Fragment key={index}>
                  {project.list_projects.map(
                    (eleme, index) =>
                      sectionProjectSelected == project.name_project && (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center gap-4 cursor-pointer animate__animated animate__zoomIn animate__faster h-fit"
                        >
                          <div className="transition-all duration-300 shadow-md hover:shadow-2xl">
                            <img
                              src={eleme.cover}
                              alt={eleme.name}
                              className="min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px]"
                            />
                          </div>
                          <span className="text-base text-center">
                            {eleme.name}
                          </span>
                        </div>
                      )
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </Drawer>
      <ButtonSocials dataSocialMedia={dataSocialMedia} />
    </div>
  );
};

export default PublicLayout;
