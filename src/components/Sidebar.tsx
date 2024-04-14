import { useEffect, useState } from "react";
import { BsList } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const arrayLinks = [
  {
    name: "NavFooter",
    path: "/admin/dashboard/navfooter",
    hover: "hover:bg-[#070f26]",
    itemName: "navfooter",
  },
  {
    name: "Inicio",
    path: "/admin/dashboard/inicio",
    hover: "hover:bg-[#070f26]",
    itemName: "inicio",
  },
  {
    name: "Nosotros",
    path: "/admin/dashboard/nosotros",
    hover: "hover:bg-[#070f26]",
    itemName: "nosotros",
  },
  {
    name: "Productos",
    path: "/admin/dashboard/productos",
    hover: "hover:bg-[#070f26]",
    itemName: "productos",
  },
  {
    name: "Servicios",
    path: "/admin/dashboard/servicios",
    hover: "hover:bg-[#070f26]",
    itemName: "servicios",
  },
  {
    name: "Contacto",
    path: "/admin/dashboard/contacto",
    hover: "hover:bg-[#070f26]",
    itemName: "contacto",
  },
  {
    name: "Redes Sociales",
    path: "/admin/dashboard/redes-sociales",
    hover: "hover:bg-[#070f26]",
    itemName: "redes-sociales",
  },
  {
    name: "Cerrar Sesión",
    path: "/",
    hover: "hover:bg-red-500",
    itemName: "cerrar-sesion",
  },
];

const Sidebar = () => {
  const [sideElementSelected, setSideElementSelected] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[3];
    const pathSelected = path ? path : "navfooter";
    setSideElementSelected(pathSelected);
  }, []);

  return (
    <>
      <div className="fixed top-0 z-50 w-full pb-2 bg-gray-100 md:hidden">
        <button
          type="button"
          className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          <BsList className="w-6 h-6" />
        </button>
      </div>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-[99] w-64 h-screen transition-transform ${
          isSidebarOpen
            ? "translate-x-0 w-full"
            : "-translate-x-full md:translate-x-0 w-64"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#f9fafc]">
          <a href="#" className="flex items-center ps-2.5 mb-5">
            <img
              src="/images/Logo_icon.webp"
              className="w-16 h-14 me-3"
              alt="Devioz Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Devioz
            </span>
          </a>
          <hr />
          <ul className="space-y-2 font-medium">
            {arrayLinks.map((link) => (
              <li
                key={link.name}
                onClick={() => {
                  navigate(link.path);
                  setSideElementSelected(link.itemName);
                  setIsSidebarOpen(false);
                }}
              >
                <div
                  className={`flex items-center p-2 pb-4 pt-4 text-[#070f26] rounded-lg group cursor-pointer ${
                    link.hover
                  } hover:text-white
                    ${
                      sideElementSelected === link.itemName &&
                      "bg-[#070f26] text-[#fff] font-bold"
                    }
                    `}
                  onClick={() => setSideElementSelected(link.itemName)}
                >
                  <span className="ms-3">{link.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
