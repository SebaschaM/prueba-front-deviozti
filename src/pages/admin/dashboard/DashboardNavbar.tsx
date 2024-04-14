import { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { ring } from "ldrs";
import { ToastContainer, toast } from "react-toastify";

import { Footer, Navbar } from "../../../interfaces/dataHome";
import { useHome } from "../../../hooks";
import Sidebar from "../../../components/Sidebar";
import { Loader } from "../../../components";

ring.register();

const DashboardNavbar = () => {
  const [dataNavbar, setDataNavbar] = useState<Navbar>({} as Navbar);
  const [dataFooter, setDataFooter] = useState<Footer[]>([]);
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [inputNewLink, setInputNewLink] = useState<{
    name: string;
    link: string;
  }>({ name: "", link: "" });
  const [inputNewLinkFooter, setInputNewLinkFooter] = useState<{
    name: string;
    link: string;
  }>({ name: "", link: "" });
  const { register, handleSubmit, setValue, reset } = useForm<Navbar | any>();
  const {
    register: registerFooter,
    handleSubmit: handleSubmitFooter,
    reset: resetFooter,
  } = useForm<Footer[] | any>();
  const {
    handleGetData,
    handleUpdateDataSection,
    handleUpdateDataSectionWithImage,
    dataHomePage,
  } = useHome();

  const onGetData = async () => {
    try {
      await handleGetData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `[${sectionIndex}].${fieldName}`;
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
      setValue("logo", file);
    }
  };

  const onSubmit = async (data: Navbar) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      const nuevoLink = { name: inputNewLink.name, link: inputNewLink.link };
      const dataOriginal = {
        ...data,
        logo: data.logo.length > 1 ? data.logo : dataHomePage.navbar.logo,
        links: [
          ...data.links.map((link) => ({ name: link.name, link: link.link })),
        ],
      };

      if (nuevoLink.name.trim() !== "" && nuevoLink.link.trim() !== "") {
        dataOriginal.links.push(nuevoLink);
      }

      formData.append("sectionName", "navbar");
      formData.append("newData", JSON.stringify(dataOriginal));
      formData.append("image", data.logo || dataHomePage.navbar.logo);

      const { ok, response } = await handleUpdateDataSectionWithImage(formData);

      if (ok) {
        toast.success("Datos actualizados correctamente");
        setImagePreview(null);
        setInputNewLink({ name: "", link: "" });
        setDataNavbar(response.data.navbar);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error al actualizar datos");
    }
  };

  const onDeleteLinkNavbar = async (_id: string) => {
    const dataFilter = dataNavbar.links.filter((link) => link._id !== _id);
    setDataNavbar({ ...dataNavbar, links: dataFilter });
    const dataFilter2 = {
      ...dataNavbar,
      links: dataFilter,
    };
    await onSubmit(dataFilter2);
  };

  const onUpdateFooter = async (data: Footer[]) => {
    try {
      setIsLoading2(true);

      if (
        (inputNewLinkFooter.name !== "" && inputNewLinkFooter.link !== "") ||
        (inputNewLinkFooter.name.trim() !== "" &&
          inputNewLinkFooter.link.trim() !== "")
      ) {
        data[1].links!.push({
          name: inputNewLinkFooter.name,
          link: inputNewLinkFooter.link,
        });
        setInputNewLinkFooter({ name: "", link: "" });
      }

      const { ok, response } = await handleUpdateDataSection({
        sectionName: "footer",
        newData: data,
      });
      if (ok) {
        setIsLoading2(false);
        toast.success("Datos actualizados correctamente");
        setInputNewLinkFooter({ name: "", link: "" });
        setDataFooter(response.data.footer);
      }
    } catch (error) {
      setIsLoading2(false);
      toast.error("Error al actualizar datos");
    }
  };

  const onDeleteLinkFooter = async (_id: string) => {
    const updatedDataFooter = [
      ...dataFooter.slice(0, 1),
      {
        ...dataFooter[1],
        links: dataFooter[1].links!.filter((link) => link._id !== _id),
      },
      ...dataFooter.slice(2),
    ];

    await onUpdateFooter(updatedDataFooter);
  };

  useEffect(() => {
    onGetData();
  }, []);

  useEffect(() => {
    if (Object.keys(dataHomePage).length > 0) {
      setDataNavbar(dataHomePage.navbar);
      setDataFooter(dataHomePage.footer);
    }
  }, [dataHomePage]);

  useEffect(() => {
    reset(dataNavbar);
  }, [dataNavbar]);

  useEffect(() => {
    resetFooter(dataFooter);
  }, [dataFooter]);

  if (
    Object.keys(dataNavbar).length === 0 ||
    Object.keys(dataFooter).length === 0
  ) {
    return <Loader />;
  }

  return (
    <>
      <Sidebar />
      <div className="p-4 mt-8 md:ml-64 md:mt-0">
        <div className="p-4 border-gray-200 rounded-lg">
          <div className="flex flex-col gap-y-16">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-bold">Navbar</h3>
              <div className="bg-[#070f26] flex items-center justify-center">
                <div className="flex items-center justify-between w-full gap-2 p-2 px-4">
                  <img className="w-40" src={dataNavbar?.logo} alt="" />
                  <div className="flex gap-x-4">
                    {dataNavbar.links?.map((link) => (
                      <p
                        key={uuidv4()}
                        className="text-sm font-bold text-white"
                      >
                        {link.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <form
                  className="flex flex-wrap gap-4"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {dataNavbar?.links?.map((link, index) => (
                    <div
                      className="flex items-center justify-center p-3 mb-4 transition-all duration-300 gap-x-8 bg-slate-100 hover:bg-slate-200 w-52"
                      key={index}
                    >
                      <div>
                        <input
                          type="text"
                          defaultValue={link.name}
                          className="w-full bg-transparent"
                          {...register(`links.${index}.name`)}
                        />
                        <input
                          type="text"
                          defaultValue={link.link}
                          className="w-full bg-transparent"
                          {...register(`links.${index}.link`)}
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => onDeleteLinkNavbar(link._id!)}
                        >
                          <BsTrash
                            size={20}
                            className="transition-all duration-300 hover:text-red-500"
                          />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* New Input navbar */}
                  <div className="flex flex-col items-center justify-center p-3 mb-4 transition-all duration-300 gap-x-8 bg-slate-100 hover:bg-slate-200 w-52">
                    <input
                      type="text"
                      placeholder="Nuevo nombre"
                      className="w-full bg-transparent"
                      value={inputNewLink.name}
                      onChange={(e) =>
                        setInputNewLink({
                          ...inputNewLink,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Nuevo enlace"
                      className="w-full bg-transparent"
                      value={inputNewLink.link}
                      onChange={(e) =>
                        setInputNewLink({
                          ...inputNewLink,
                          link: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="relative flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineCloudUpload size={40} />
                        <p className="mb-2 text-sm text-gray-500">
                          Sube tu logo
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        src={dataNavbar.logo}
                        {...register("logo")}
                        onChange={handleFileChange}
                      />
                    </label>

                    {imagePreview ? (
                      <div className="h-full w-[30rem] object-cover absolute pointer-events-none">
                        <img
                          src={imagePreview}
                          alt="imagePreview"
                          className="w-full h-full bg-white"
                          {...register("logo")}
                        />
                      </div>
                    ) : (
                      <div className="h-full w-[30rem] object-cover absolute pointer-events-none">
                        <img
                          src={dataNavbar.logo}
                          alt="imagePreview"
                          className="w-full h-full bg-white"
                          {...register("logo")}
                        />
                      </div>
                    )}
                  </div>

                  <button
                    className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <l-ring
                        size="19"
                        speed="2"
                        color="white"
                        stroke={4}
                      ></l-ring>
                    ) : (
                      "Guardar cambios"
                    )}
                  </button>
                  {imagePreview && (
                    <button
                      className="px-4 py-2 font-bold text-white transition-all duration-300 bg-red-500 rounded hover:bg-red-700"
                      type="button"
                      onClick={() => setImagePreview(null)}
                    >
                      Eliminar imagen
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-bold">Footer</h3>
              <div className="bg-[#070f26] flex items-center justify-center">
                <div className="grid items-start w-full grid-cols-4 gap-2 p-2 px-4 justify-items-center">
                  {/* Devioz */}
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">
                      {dataFooter[0]?.title_1}
                    </h3>
                    <p>{dataFooter[0]?.text}</p>
                  </div>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">
                      {dataFooter[1]?.title_2}
                    </h3>
                    <ul className="text-center">
                      {dataFooter[1]?.links?.map((link, index) => (
                        <li key={index}>
                          <p>{link.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">
                      {dataFooter[2]?.title_3}
                    </h3>
                    ICONOS DE REDES
                    {/* <p>{dataPage.footer[2].text}</p> */}
                  </div>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">
                      {dataFooter[3]?.title_4}
                    </h3>
                    <p>{dataFooter[3]?.text}</p>
                    <p>{dataFooter[3]?.text_2}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <form
                  className="grid items-start grid-cols-4 gap-4"
                  onSubmit={handleSubmitFooter(onUpdateFooter)}
                >
                  {/* Sección 1 */}
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      defaultValue={dataFooter[0]?.title_1}
                      className="w-full text-2xl font-bold bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 0,
                          fieldName: "title_1",
                        }) as any
                      )}
                    />
                    <textarea
                      defaultValue={dataFooter[0]?.text}
                      className="w-full bg-transparent resize-none h-44"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 0,
                          fieldName: "text",
                        }) as any
                      )}
                    ></textarea>
                  </div>

                  {/* Sección 2 */}
                  <div className="flex flex-col gap-y-4">
                    <input
                      type="text"
                      defaultValue={dataFooter[1]?.title_2}
                      className="w-full text-2xl font-bold text-center bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 1,
                          fieldName: "title_2",
                        }) as any
                      )}
                    />
                    {dataFooter[1]?.links?.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center p-3 mb-4 transition-all duration-300 gap-x-8 bg-slate-100 hover:bg-slate-200"
                      >
                        <div>
                          <input
                            type="text"
                            defaultValue={link.name}
                            className="w-full bg-transparent"
                            {...registerFooter(
                              getFieldName({
                                sectionIndex: 1,
                                fieldName: `links.${index}.name`,
                              }) as any
                            )}
                          />
                          <input
                            type="text"
                            defaultValue={link.link}
                            className="w-full bg-transparent"
                            {...registerFooter(
                              getFieldName({
                                sectionIndex: 1,
                                fieldName: `links.${index}.link`,
                              }) as any
                            )}
                          />
                        </div>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() => onDeleteLinkFooter(link._id!)}
                          >
                            <BsTrash
                              size={20}
                              className="transition-all duration-300 hover:text-red-500"
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-center p-3 mb-4 transition-all duration-300 gap-x-8 bg-slate-100 hover:bg-slate-200">
                      <div>
                        <input
                          type="text"
                          className="w-full bg-transparent"
                          placeholder="Nuevo nombre"
                          value={inputNewLinkFooter.name}
                          onChange={(e) =>
                            setInputNewLinkFooter({
                              ...inputNewLinkFooter,
                              name: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          className="w-full bg-transparent"
                          placeholder="Nuevo enlace"
                          value={inputNewLinkFooter.link}
                          onChange={(e) =>
                            setInputNewLinkFooter({
                              ...inputNewLinkFooter,
                              link: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sección 3 */}
                  <div className="flex flex-col">
                    <input
                      type="text"
                      defaultValue={dataFooter[2]?.title_3}
                      className="w-full text-2xl font-bold text-center bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 2,
                          fieldName: "title_3",
                        }) as any
                      )}
                    />
                  </div>

                  {/* Sección 4 */}
                  <div className="flex flex-col">
                    <input
                      type="text"
                      defaultValue={dataFooter[3]?.title_4}
                      className="w-full text-2xl font-bold bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 3,
                          fieldName: "title_4",
                        }) as any
                      )}
                    />
                    <input
                      type="text"
                      defaultValue={dataFooter[3]?.text}
                      className="w-full bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 3,
                          fieldName: "text",
                        }) as any
                      )}
                    />
                    <input
                      type="text"
                      defaultValue={dataFooter[3]?.text_2}
                      className="w-full bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 3,
                          fieldName: "text_2",
                        }) as any
                      )}
                    />
                  </div>

                  {/* Botón de enviar */}
                  <button
                    className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 w-fit"
                    type="submit"
                    disabled={isLoading2}
                  >
                    {isLoading2 ? (
                      <l-ring
                        size="19"
                        speed="2"
                        color="white"
                        stroke={4}
                      ></l-ring>
                    ) : (
                      "Guardar cambios"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default DashboardNavbar;
