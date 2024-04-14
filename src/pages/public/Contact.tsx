import { useEffect, useState } from "react";

import { useContact, useHome } from "../../hooks";
import PublicLayout from "../../layouts/PublicLayout";
import { Loader } from "../../components";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dataHomePage, handleGetData } = useHome();
  const {
    dataContactPage,
    handleGetData: handleGetDataContact,
    handleSendMail,
  } = useContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onGetData = async () => {
    try {
      await Promise.all([handleGetData(), handleGetDataContact()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const onSendForm = async (data: any) => {
    setIsLoading(true);
    const dataMail = {
      fullname: data.Nombre,
      email: data.Correo,
      service: data.servicio,
      phone: data.Telefono,
      message: data.message,
      asunto: data.Asunto,
    };
    const response = await handleSendMail(dataMail);
    console.log(response);

    if (response) {
      setIsLoading(false);
      toast.success("Mensaje enviado correctamente");
      reset();
    } else {
      toast.error("Error al enviar el mensaje");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onGetData();
  }, []);

  if (
    Object.keys(dataHomePage).length === 0 &&
    Object.keys(dataContactPage).length === 0 &&
    !dataContactPage
  ) {
    return <Loader />;
  }

  return (
    <PublicLayout isBannerSlider={false} dataPage={dataContactPage.hero}>
      <div className="flex flex-col max-w-5xl p-8 mx-auto mt-20">
        <h2 className="mb-4 text-5xl font-bold text-center">
          {dataContactPage?.contact?.title}
        </h2>

        <div className="grid items-center grid-cols-1 mt-20 gap-y-16 justify-items-center">
          <div className="flex flex-col w-full sm:flex-row">
            <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-3">
              {dataContactPage?.contact?.cards.map((card) => (
                <a
                  href={linkToSelectedOption(card.type_link, card.link)}
                  target="_blank"
                  rel="noreferrer"
                  key={card._id}
                  className="flex flex-col items-center justify-center w-full p-4 rounded-md shadow-md gap-y-4"
                >
                  <div className="flex items-center justify-center w-16 h-16 text-white">
                    <img src={card.icon} alt={card.link} />
                  </div>
                  <span className="text-xl">{card.link}</span>
                </a>
              ))}
            </div>
          </div>

          <form
            className="flex flex-col w-full gap-y-4"
            onSubmit={handleSubmit(onSendForm)}
          >
            {dataContactPage?.form?.slice(0, 3).map((field) => (
              <div key={field._id} className="w-full">
                <label
                  htmlFor={field.label}
                  className="block mb-2 text-xl font-bold text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  type={field.form_field.inputType}
                  id={field.label}
                  {...register(field.label, {
                    required: "Este campo es requerido",
                  })}
                  placeholder={field.form_field.placeHolder}
                  className="w-full px-4 py-2 text-xl border rounded-md focus:outline-none focus:border-gray-900 border-[#758896]"
                />
                {errors[field.label] && (
                  <span className="text-red-500">
                    {(errors[field.label] as any).message}
                  </span>
                )}
              </div>
            ))}

            <div className="w-full">
              <label
                htmlFor="services"
                className="block mb-2 text-xl font-bold text-gray-700"
              >
                Servicio
              </label>
              <select
                id="services"
                className="w-full px-4 py-2 text-xl border rounded-md focus:outline-none focus:border-gray-900 border-[#758896]"
                {...register("servicio")}
              >
                {dataHomePage?.projects?.map((project, index) => (
                  <option key={index} value={project.name_project}>
                    {project.name_project}
                  </option>
                ))}
              </select>
            </div>

            {dataContactPage?.form?.slice(3).map((field) => (
              <div key={field._id} className="w-full">
                <label
                  htmlFor={field.label}
                  className="block mb-2 text-xl font-bold text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  type={field.form_field.inputType}
                  id={field.label}
                  {...register(field.label)}
                  placeholder={field.form_field.placeHolder}
                  className="w-full px-4 py-2 text-xl border rounded-md focus:outline-none focus:border-gray-900 border-[#758896]"
                />
              </div>
            ))}

            <div className="w-full">
              <label
                htmlFor="message"
                className="block mb-2 text-xl font-bold text-gray-700"
              >
                Mensaje
              </label>
              <textarea
                rows={5}
                id="message"
                {...register("message")}
                className="w-full h-40 px-4 py-2 text-xl border rounded-md resize-none focus:outline-none focus:border-gray-900 border-[#758896]"
              ></textarea>
            </div>

            <div className="flex justify-center w-full">
              <button
                type="submit"
                disabled={isLoading}
                className="px-12 py-5 mt-4 mb-2 text-sm font-medium text-white transition-all duration-300 bg-transparent bg-black border border-white hover:bg-white focus:outline-none focus:ring-4 hover:text-black hover:border-black disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:hover:border-gray-400 disabled:text-white disabled:hover:text-white disabled:opacity-50"
              >
                Solicitar información
              </button>
            </div>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ContactUs;
