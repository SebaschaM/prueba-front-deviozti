import { useState } from "react";
import { DataSocialMedia } from "../interfaces/dataSocialMedia";
import { MdContactSupport } from "react-icons/md";

interface ButtonSocialsProps {
  dataSocialMedia: DataSocialMedia[];
}

const ButtonSocials = ({ dataSocialMedia }: ButtonSocialsProps) => {
  const [showAllSocials, setShowAllSocials] = useState(false);

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

  return (
    <div
      className={`fixed z-40 flex flex-col items-end justify-end gap-8 p-2 overflow-hidden rounded-lg shadow-lg bottom-10 left-4 transition-height duration-300 bg-white h-max-fit ${
        showAllSocials ? "h-fit" : "h-16"
      }`}
    >
      {dataSocialMedia.map((social, index) => (
        <a
          key={index}
          href={linkToSelectedOption(social.type_link, social.link)}
          target="_blank"
          className="text-[#48c856]"
        >
          <img
            className="w-[45px] h-[45px] transition-all duration-300 hover:scale-110 hover:drop-shadow-[#48c856] hover:text-[#48c856]"
            src={social.icon as string}
            alt={social.name}
          />
        </a>
      ))}

      <button
        type="button"
        className="text-[#0860e9] "
        onClick={() => setShowAllSocials(!showAllSocials)}
      >
        <MdContactSupport className="sm:!text-[45px] text-[45px] transition-all duration-300 hover:scale-110 hover:shadow-['#0860e9'] hover:shadow-lg" />
      </button>
    </div>
  );
};

export default ButtonSocials;
