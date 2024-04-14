import { ring } from "ldrs";

ring.register();

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#070f26] flex-col gap-y-10">
      <img src="/images/Logo.webp" alt="Logo" className="w-64 h-32" />
      <l-ring
        size="50"
        stroke="5"
        bg-opacity="0"
        speed="2"
        color="white"
      ></l-ring>
    </div>
  );
};

export default Loader;
