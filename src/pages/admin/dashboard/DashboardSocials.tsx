import { ring } from "ldrs";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsPencil, BsTrash, BsXLg } from "react-icons/bs";
import ResponsivePagination from "react-responsive-pagination";

import { useSocialMedia } from "../../../hooks";
import Sidebar from "../../../components/Sidebar";
import { DataSocialMedia } from "../../../interfaces/dataSocialMedia";
import { Loader } from "../../../components";

ring.register();

const DashboardSocials = () => {
  const tableHeaders = ["Icono", "Red Social", "Tipo", "Enlace", "Acciones"];
  const [showModal, setShowModal] = useState({
    show: false,
    type: "add",
    id: "",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [dataSocialMediaSelected, setdataSocialMediaSelected] = useState(
    {} as DataSocialMedia
  );
  const {
    dataSocialMedia,
    handleGetData,
    handleUpdateData,
    handleAddData,
    handleDeleteData,
  } = useSocialMedia();
  const [imagePreviews, setImagePreviews] = useState<any[]>([] as any);
  const [dataSocialMediaState, setDataSocialMediaState] = useState<
    DataSocialMedia[]
  >([]);
  const [isLoadingSocialMedia, setIsLoadingSocialMedia] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm<
    DataSocialMedia[] | any
  >([{} as DataSocialMedia]);
  const [inputNewSocialMedia, setInputNewSocialMedia] =
    useState<DataSocialMedia>({
      name: "",
      icon: "",
      link: "",
      type_link: "",
    });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dataSocialMediaState.length / 5);
  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = (currentPage - 1) * 5;
  const currentItems = dataSocialMediaState.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const onGetData = async () => {
    try {
      await handleGetData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getImageToShow = (index: number) => {
    if (imagePreviews[index]) {
      return imagePreviews[index];
    } else if (dataSocialMediaState[index]?.icon) {
      return dataSocialMediaState[index].icon;
    }
    return null;
  };

  const handleFileChangeCharacter = (event: any, index: number) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev: any) => {
          const newPreviews = [...prev];
          newPreviews[index] = reader.result;
          return newPreviews;
        });

        const updateSocialMediaIcon = (newIcon: File) => {
          if (index === dataSocialMediaState?.length) {
            setInputNewSocialMedia((prevInput: any) => ({
              ...prevInput,
              icon: newIcon,
            }));
          } else {
            setValue(`[${index}].icon`, newIcon);
          }
        };

        updateSocialMediaIcon(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const onAddSocialMedia = async (_data: any) => {
    try {
      setIsLoadingSocialMedia(true);

      const formData = new FormData();
      formData.append(`socialMediaData[0][name]`, inputNewSocialMedia.name);
      formData.append(`socialMediaData[0][link]`, inputNewSocialMedia.link);
      formData.append(`socialMediaData[0][type_link]`, selectedOption);
      formData.append(`SocialIcon_0`, inputNewSocialMedia.icon);

      const { ok, response } = await handleAddData(formData);

      if (ok) {
        toast.success("Se agregó la red social con éxito");
        setIsLoadingSocialMedia(false);
        setInputNewSocialMedia({
          name: "",
          icon: "",
          link: "",
          type_link: "",
        });
        setImagePreviews([]);
        setDataSocialMediaState([]);
        setDataSocialMediaState(response.data);
      }
    } catch (error) {
      console.error("Error al agregar la red social:", error);
      toast.error("Ocurrió un error al agregar la red social");
      setIsLoadingSocialMedia(false);
    }
  };

  const onUpdateSocialMedia = async (_id: string) => {
    try {
      setIsLoadingSocialMedia(true);

      const formData = new FormData();
      formData.append(`socialMediaData[0][_id]`, dataSocialMediaSelected._id!);
      formData.append(`socialMediaData[0][name]`, dataSocialMediaSelected.name);
      formData.append(`socialMediaData[0][link]`, dataSocialMediaSelected.link);
      formData.append(
        `socialMediaData[0][type_link]`,
        dataSocialMediaSelected.type_link!
      );
      formData.append(`SocialIcon_0`, dataSocialMediaSelected.icon);

      const { ok, response } = await handleUpdateData(formData);

      if (ok) {
        toast.success("Se agregó la red social con éxito");
        setIsLoadingSocialMedia(false);
        setdataSocialMediaSelected({} as DataSocialMedia);
        setImagePreviews([]);
        setDataSocialMediaState([]);
        setDataSocialMediaState(response.data);
        setShowModal({ show: false, type: "", id: "" });
      }
    } catch (error) {
      toast.error("Ocurrió un error al agregar la red social");
      setIsLoadingSocialMedia(false);
    }
  };

  const onDeleteSocialMedia = async (_id: string) => {
    try {
      const updateDataSocialMedia = (dataSocialMediaState || []).filter(
        (social_media) => social_media._id !== _id
      );

      setDataSocialMediaState(updateDataSocialMedia);
      const { ok, response } = await handleDeleteData(_id);

      if (ok) {
        toast.success("Se eliminó la red social con éxito");
        setDataSocialMediaState(response.data);
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar las redes sociales");
    }
  };

  useEffect(() => {
    setDataSocialMediaState(dataSocialMedia || []);
  }, [dataSocialMedia]);

  useEffect(() => {
    onGetData();
  }, []);

  if (dataSocialMediaState.length === 0) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <Sidebar />
      <div className="p-4 mt-8 md:ml-64 md:mt-0 ">
        <div className="p-4 border-gray-200 rounded-lg">
          <div className="flex flex-col gap-y-16">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-bold">Redes sociales</h3>
              <button
                className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
                type="button"
                onClick={() =>
                  setShowModal({
                    show: true,
                    type: "add",
                    id: "",
                  })
                }
              >
                Agregar red social
              </button>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-4 overflow-x-auto">
                    <table className="min-w-full overflow-hidden divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {tableHeaders.map((header, index) => (
                            <th
                              key={index}
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((social, index) => {
                          const realIndex = indexOfFirstItem + index;
                          return (
                            <tr key={realIndex}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="relative flex items-center justify-center h-20 m-auto overflow-hidden w-fit">
                                  <label
                                    htmlFor={`dropzone-file-social-media-${realIndex}`}
                                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100"
                                  >
                                    <div className="flex flex-col items-center justify-center h-20 pt-5 pb-6">
                                      <AiOutlineCloudUpload size={40} />
                                      <p className="mb-2 text-sm text-gray-500">
                                        Subir icono
                                      </p>
                                    </div>
                                    <input
                                      type="file"
                                      className="hidden"
                                      src={social.icon as string}
                                    />
                                  </label>

                                  <div className="absolute object-contain pointer-events-none w-max-60 h-max-60">
                                    <img
                                      src={getImageToShow(realIndex)}
                                      alt="imagePreview"
                                      className="w-full h-20 bg-white"
                                      {...register(`[${realIndex}].icon`)}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                  {social.name}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                  {social.type_link}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                  {social.link}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                <button
                                  type="button"
                                  className="pr-4 cursor-pointer"
                                  onClick={() => {
                                    setShowModal({
                                      show: true,
                                      type: "edit",
                                      id: social._id!,
                                    });
                                    setdataSocialMediaSelected(social);
                                  }}
                                >
                                  <BsPencil
                                    size={20}
                                    className="transition-all duration-300 hover:text-red-500"
                                  />
                                </button>
                                <button
                                  type="button"
                                  className="cursor-pointer"
                                  onClick={() =>
                                    onDeleteSocialMedia(social._id!)
                                  }
                                >
                                  <BsTrash
                                    size={20}
                                    className="transition-all duration-300 hover:text-red-500"
                                  />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Paginación */}
                  <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal.show && showModal.type === "add" && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-[100] bg-[#00000073] h-screen w-screen flex justify-center items-center overflow-hidden">
          <div className="absolute p-4 bg-white rounded-lg">
            <div className="flex justify-end w-full">
              <BsXLg
                className="cursor-pointer top-4"
                onClick={() => setShowModal({ show: false, type: "", id: "" })}
                size={20}
              />
            </div>
            <form
              className="flex flex-col justify-center p-3 mb-4 transition-all duration-300 w-[18rem] gap-y-2 gap-x-8"
              onSubmit={handleSubmit(onAddSocialMedia)}
            >
              <div className="relative flex items-center justify-center overflow-hidden h-fit">
                <label
                  htmlFor={`dropzone-file-social-media-new`}
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-lg cursor-pointer h-36 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineCloudUpload size={40} />
                    <p className="mb-2 text-sm text-gray-500">Subir icono</p>
                  </div>
                  <input
                    id={`dropzone-file-social-media-new`}
                    type="file"
                    className="hidden"
                    defaultValue={inputNewSocialMedia.icon as string}
                    onChange={(e) =>
                      handleFileChangeCharacter(e, dataSocialMediaState.length)
                    }
                  />
                </label>

                {imagePreviews[dataSocialMediaState.length] && (
                  <div className="absolute object-cover pointer-events-none w-fit h-fit">
                    <img
                      src={imagePreviews[dataSocialMediaState.length]}
                      alt="imagePreview"
                      className="w-full h-full bg-white"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-y-2">
                <input
                  type="text"
                  placeholder="Red Social"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={inputNewSocialMedia.name}
                  onChange={(e) =>
                    setInputNewSocialMedia({
                      ...inputNewSocialMedia,
                      name: e.target.value,
                    })
                  }
                />
                <select
                  value={""}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="" disabled>
                    Tipo de enlace
                  </option>
                  <option value="email">Email</option>
                  <option value="social">Red Social</option>
                  <option value="tel">Teléfono</option>
                  <option value="whatsapp">Whatsapp</option>
                </select>
                <input
                  type="text"
                  placeholder="Enlace / Teléfono / Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={inputNewSocialMedia.link}
                  onChange={(e) =>
                    setInputNewSocialMedia({
                      ...inputNewSocialMedia,
                      link: e.target.value,
                    })
                  }
                />
              </div>

              <button
                className="w-full px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400"
                type="submit"
              >
                {isLoadingSocialMedia ? (
                  <l-ring size="19" speed="2" color="white" stroke={4}></l-ring>
                ) : (
                  "Agregar red social"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal actualizar */}
      {showModal.show && showModal.type === "edit" && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-[100] bg-[#00000073] h-screen w-screen flex justify-center items-center overflow-hidden">
          <div className="absolute p-4 bg-white rounded-lg">
            <div className="flex justify-end w-full">
              <BsXLg
                className="cursor-pointer top-4"
                onClick={() => setShowModal({ show: false, type: "", id: "" })}
                size={20}
              />
            </div>
            <form
              className="flex flex-col justify-center p-3 mb-4 transition-all duration-300 w-[18rem] gap-y-2 gap-x-8"
              onSubmit={handleSubmit(onUpdateSocialMedia)}
            >
              <div className="relative flex items-center justify-center overflow-hidden h-fit">
                <label
                  htmlFor={`dropzone-file-social-media-edit`}
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 rounded-lg cursor-pointer h-36 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineCloudUpload size={40} />
                    <p className="mb-2 text-sm text-gray-500">Subir icono</p>
                  </div>
                  <input
                    id={`dropzone-file-social-media-edit`}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      handleFileChangeCharacter(e, 0);
                      setdataSocialMediaSelected({
                        ...dataSocialMediaSelected,
                        icon: e.target.files ? e.target.files[0] : "",
                      });
                    }}
                  />
                </label>

                {imagePreviews[0] ? (
                  <div className="absolute object-cover pointer-events-none w-fit h-fit">
                    <img
                      src={imagePreviews[0]}
                      alt="imagePreview"
                      className="w-full h-full bg-white"
                    />
                  </div>
                ) : (
                  <div className="absolute object-cover pointer-events-none w-fit h-fit">
                    <img
                      src={dataSocialMediaSelected.icon as string}
                      alt="imagePreview"
                      className="w-full h-full bg-white"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-y-2">
                <input
                  type="text"
                  placeholder="Red Social"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={dataSocialMediaSelected.name}
                  onChange={(e) =>
                    setdataSocialMediaSelected({
                      ...dataSocialMediaSelected,
                      name: e.target.value,
                    })
                  }
                />
                <select
                  value={dataSocialMediaSelected?.type_link || ""}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                    setdataSocialMediaSelected({
                      ...dataSocialMediaSelected,
                      type_link: e.target.value,
                    });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="" disabled>
                    Tipo de enlace
                  </option>
                  <option value="email">Email</option>
                  <option value="social">Red Social</option>
                  <option value="tel">Teléfono</option>
                  <option value="whatsapp">Whatsapp</option>
                </select>
                <input
                  type="text"
                  placeholder="Enlace / Teléfono / Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={dataSocialMediaSelected.link}
                  onChange={(e) =>
                    setdataSocialMediaSelected({
                      ...dataSocialMediaSelected,
                      link: e.target.value,
                    })
                  }
                />
              </div>

              <button
                className="w-full px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400"
                type="submit"
              >
                {isLoadingSocialMedia ? (
                  <l-ring size="19" speed="2" color="white" stroke={4}></l-ring>
                ) : (
                  "Actualizar red social"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default DashboardSocials;
