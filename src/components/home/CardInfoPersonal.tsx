import { useState } from "react";

export default function CardInfoPersonal() {
  const [buttons, setButtons] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center w-[40vh] h-auto bg-[#ffffff] text-black rounded-xl shadow-2xl px-[2rem] py-[1rem] gap-y-3 pb-6 "
      onMouseEnter={() => setButtons(true)}
      onMouseLeave={() => setButtons(false)}
    >
      <img
        src="https://cutesolution.com/html/techvio/assets/img/icon/feature-icon-1.svg"
        alt="photo_img"
        className={`w-[26vh] mb-7 cursor-pointer transition-transform transform hover:scale-90 ${
          buttons ? "brightness-50 scale-90" : "" // Aplicar el brillo solo al hacer hover
        } relative`}
      />
      {buttons ? (
        <div className="absolute flex flex-row gap-x-5">
          {/* 3 REDES SOCIALES MAS IMPORTANTES */}
          <button
            type="button"
            className="text-white border-[2px] border-white hover:bg-[#266d5d] hover:text-white hover:border-[#266d5d] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm p-2.5 text-center inline-flex items-center"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </div>
      ) : null}
      {/* foto.img */}
      <h5 className="text-[1.3rem] text-center font-semibold">
        Flexibility & Responsive
      </h5>
      <h5 className="text-[#256658] font-semibold text-[1.3rem]">Perú</h5>
    </div>
  );
}
