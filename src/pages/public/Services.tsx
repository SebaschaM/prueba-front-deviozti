import { useState } from "react";
import { BsXLg } from "react-icons/bs";

import PublicLayout from "../../layouts/PublicLayout";

const ServicesPage = () => {
  const [showModalDetail, setShowModalDetail] = useState({
    idService: "",
    showModal: false,
  });

  const services = [
    {
      name: "Desarrollo Web",
      image:
        "https://agenciawinners.com/wp-content/uploads/2020/07/desarrollo-web.png",
      description:
        "Creación de sitios web a medida, adaptados a sus requisitos y objetivos comerciales.",
    },
    {
      name: "Cloud",
      image:
        "https://th.bing.com/th/id/OIP.KVI98VJDyteyB9Aw-B0o_wHaEK?rs=1&pid=ImgDetMain",
      description:
        "Creación de sitios web a medida, adaptados a sus requisitos y objetivos comerciales.",
    },
    {
      name: "Data Enginner",
      image:
        "https://th.bing.com/th/id/OIP.KVI98VJDyteyB9Aw-B0o_wHaEK?rs=1&pid=ImgDetMain",
      description:
        "Creación de sitios web a medida, adaptados a sus requisitos y objetivos comerciales.",
    },
  ];

  const data = {
    title: "Nuestros Servicios",
    image: "https://www.concur.pe/sites/default/files/co/nube.jpeg",
    description:
      "Creación de sitios web, gestión de redes sociales, desarrollo de aplicaciones móviles, diseño gráfico, marketing digital, SEO, SEM, SMM, SMO, etc.",
  };

  return (
    <PublicLayout isBannerSlider={false} dataPage={data}>
      <div className="container p-8 mx-auto mt-10">
        <h1 className="mb-8 text-5xl font-bold">Nuestros Servicios</h1>
        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative w-full overflow-hidden rounded-lg shadow-xl cursor-pointer"
            >
              <img
                src={service.image}
                className="object-cover w-full h-64 transition-opacity duration-300 brightness-50"
              />
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center w-full transition-opacity duration-300 bg-gray-400 opacity-0 hover:opacity-100 bg-opacity-70">
                <p className="text-center text-white">{service.description}</p>
                <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md">
                  Saber más
                </button>
              </div> */}
              <div
                className="absolute top-0 flex items-center justify-center w-full h-full text-4xl font-bold text-center text-white hover:underline"
                onClick={() =>
                  setShowModalDetail({
                    idService: String(index),
                    showModal: true,
                  })
                }
              >
                {service.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      {showModalDetail.showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-[#0000005d]">
          <div className="w-full max-w-3xl mx-auto my-6">
            <div className="flex flex-col bg-white border-2 border-gray-300 rounded-md">
              <div className="flex items-center justify-between p-5 border-b border-gray-300">
                <h3 className="text-lg font-semibold">Desarrollo Web</h3>
                <button
                  onClick={() =>
                    setShowModalDetail({ ...showModalDetail, showModal: false })
                  }
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <BsXLg size={20} />
                </button>
              </div>
              <div className="p-5">
                {/* Contenido específico del modal */}
                {/* Puedes agregar aquí tus elementos de texto u otros elementos */}
              </div>
            </div>
          </div>
        </div>
      )}
      ,
    </PublicLayout>
  );
};

export default ServicesPage;
