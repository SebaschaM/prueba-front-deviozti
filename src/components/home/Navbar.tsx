import { useEffect, useState } from "react";
import { BsList } from "react-icons/bs";
import { Navbar as NavbarI } from "../../interfaces/dataHome";
import { Link, useLocation } from "react-router-dom";

interface NavbarDataI {
  data: NavbarI;
}

export const Navbar = ({ data }: NavbarDataI) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const [navbarBackground, setNavbarBackground] = useState("transparent");

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const changePoint = 100;

    const handleScroll = () => {
      if (window.scrollY > changePoint) {
        setNavbarBackground("[#031019] backdrop-blur-lg");
      } else {
        setNavbarBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <nav
      className={`lg:bg-${navbarBackground} bg-[#031019] fixed top-0 z-20 w-full transition-all duration-300`}
    >
      <div className="flex flex-wrap items-center justify-between px-8 mx-auto max-w-screen-2xl">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={data.logo}
            alt="Devioz Logo"
            style={{
              width: "180px",
              height: "100px",
            }}
          />
        </Link>

        <button
          onClick={toggleCollapse}
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center justify-center w-12 h-10 p-2 text-sm text-gray-500 transition-all duration-300 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-solid-bg"
          aria-expanded={isCollapsed ? "false" : "true"}
        >
          <BsList className="button-burguer group-hover:text-black" />
        </button>
        <div
          className={`w-full lg:flex lg:w-auto ${
            isCollapsed ? "hidden" : "flex"
          }`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col w-full mt-4 font-medium text-center rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent">
            {data.links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.link}
                  className={`transition-all text-xl duration-300 block py-2 px-3 lg:p-0 rounded lg:bg-transparent  hover:text-white ${
                    location.pathname === link.link
                      ? "text-white"
                      : "text-gray-300"
                  }`}
                  aria-current="page"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
