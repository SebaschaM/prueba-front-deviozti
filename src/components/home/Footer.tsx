import { Link } from "react-router-dom";
import { Footer as FooterI } from "../../interfaces/dataHome";
import { DataSocialMedia } from "../../interfaces/dataSocialMedia";

interface FooterDataI {
  data: FooterI[];
  dataSocialMedia: DataSocialMedia[];
}

const Footer = ({ data, dataSocialMedia }: FooterDataI) => {
  const linkToSelectedOption = (type_link: string, link: string) => {
    switch (type_link) {
      case "email":
        return `mailto:${link}`;
      case "social":
        return link;
      case "tel":
        return `tel:${link}`;
      case "whatsapp":
        return `https://wa.me/${link}`;
      default:
        return link;
    }
  };

  if (!data) {
    return null;
  }

  return (
    <footer className="mt-20">
      <div className="mt-4 bg-[#031019] px-14 grid gap-y-10 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-12 py-14">
        <div className={`flex flex-col gap-y-${data.length}`}>
          <h2 className="text-3xl font-bold text-center text-white lg:text-left">
            {data[0].title_1}
          </h2>
          <p className="text-xl text-center text-white lg:text-left">
            {data[0].text}
          </p>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-3xl font-bold text-center text-white">
            {data[1].title_2}
          </h2>
          <ul className="flex flex-col items-center">
            {data[1].links?.map((link, index) => (
              <li
                key={index}
                className="text-xl text-white transition-all duration-300 hover:text-gray-200"
              >
                <a href={link.link}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col mx-auto gap-y-4">
          <h2 className="text-3xl font-bold text-center text-white">
            {data[2].title_3}
          </h2>
          <div className="grid grid-cols-3 gap-8 justify-items-center">
            {dataSocialMedia.map((socialMedia, index) => (
              <a
                key={index}
                href={`${linkToSelectedOption(
                  socialMedia.type_link,
                  socialMedia.link
                )}`}
                target="_blank"
                className="text-2xl text-white transition-all duration-300 hover:text-gray-200"
              >
                <img
                  src={socialMedia.icon as string}
                  alt={socialMedia.name}
                  className="w-10 h-10"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-3xl font-bold text-center text-white lg:text-left">
            {data[3].title_4}
          </h2>
          <div className="flex flex-col gap-y-2">
            <span className="text-xl text-center text-white lg:text-left">
              {data[3].text}
            </span>
            <span className="text-xl text-center text-white lg:text-left">
              {data[3].text_2}
            </span>
          </div>
        </div>
      </div>

      <div className="py-4 text-center copyrigth text-[#888]">
        Devioz © 2023. Todos los derechos reservados. - Desarrollado por
        <Link to="/devioz">
          <span className="text-[#888]"> Devioz</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
