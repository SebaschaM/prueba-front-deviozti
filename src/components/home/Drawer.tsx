/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsXCircle } from "react-icons/bs";

interface DrawerProps {
  children: any;
  isOpen: any;
  setIsOpen: any;
}

export const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
  return (
    <div
      className={
        " fixed overflow-hidden inset-0 transform ease-in-out z-50 " +
        (isOpen
          ? " transition-opacity opacity-100 duration-300 translate-x-0  "
          : " transition-all delay-300 opacity-0 translate-x-full !bg-transparent  ")
      }
    >
      <section
        className={
          " w-screen max-w-md right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform p-8 " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <BsXCircle
          size={25}
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 cursor-pointer hover:text-[#d32e2e] transition-all ease-in-out duration-300"
        />
        {children}
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </div>
  );
};
