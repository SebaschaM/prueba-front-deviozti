import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Projects } from "../../interfaces/dataHome";
import ResponsivePagination from "react-responsive-pagination";

interface ProjectsI {
  data: Projects[];
}

export const Pages = ({ data }: ProjectsI) => {
  const firstSection = data.map((project) => project.name_project)[0];
  const [sectionSelected, setSectionSelected] = useState(firstSection);
  const [currentPage, setCurrentPage] = useState(1);
  const [animationClass, setAnimationClass] = useState(
    "animate__animated animate__zoomIn animate__faster"
  );
  const [resolutionCurrentPage, setResolutionCurrentPage] = useState("top");

  const filteredProjects = data.find(
    (project) => project.name_project == sectionSelected
  );

  const totalItems = filteredProjects
    ? filteredProjects.list_projects.length
    : 0;
  const totalPages = Math.ceil(totalItems / 8);

  const indexOfLastItem = currentPage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;
  const currentItems = filteredProjects
    ? filteredProjects.list_projects.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const onSectionSelected = (section: string) => {
    setSectionSelected(section);
    handleSectionChange();
  };

  const handleSectionChange = () => {
    // Cambiar la clase de animación para reiniciarla
    setAnimationClass("animate__animated animate__zoomIn animate__faster");
  };

  useEffect(() => {
    const handleResize = () => {
      setResolutionCurrentPage(window.innerWidth <= 640 ? "top" : "bottom");
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="flex flex-col w-full mt-20 gap-y-10">
      <h2 className="text-5xl font-bold text-center">Nuestros servicios</h2>
      <div className="flex flex-wrap items-center justify-center gap-8">
        <Swiper
          modules={[Navigation]}
          loop={true}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
            1536: {
              slidesPerView: 5,
            },
            1600: {
              slidesPerView: 6,
            },
          }}
          className={`w-[60%] swiper-container swiper-wrapper py-4 ${
            data.map((project) => project.name_project).length <= 6 &&
            "flex justify-center"
          }`}
        >
          {data.map((project, index) => (
            <SwiperSlide className="text-center" key={project._id}>
              <button
                type="button"
                key={index}
                className={`uppercase text-[0.8rem] hover:text-[#070f26] transition-all duration-300 w-fit ${
                  sectionSelected == project.name_project
                    ? "text-[#070f26]"
                    : "text-gray-400"
                }`}
                onClick={() => onSectionSelected(project.name_project)}
              >
                {project.name_project}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content */}
      {resolutionCurrentPage == "top" && (
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <div className="grid flex-col w-full grid-cols-1 gap-12 mt-4 px-14 lg:grid-cols-4 justify-items-center md:grid-cols-3 sm:grid-cols-2">
        {currentItems.map((proj) => (
          <div
            key={proj._id}
            className={`flex flex-col items-center justify-center gap-8 cursor-pointer ${animationClass} `}
          >
            <div className="transition-all duration-300 shadow-md hover:shadow-2xl hover:scale-105">
              <img
                src={proj.cover}
                alt={proj.name}
                className="max-h-[200px] h-[200px] w-[300px]"
              />
            </div>
            <span className="text-xl text-center">{proj.name}</span>
          </div>
        ))}
      </div>
      {resolutionCurrentPage == "bottom" && (
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};
