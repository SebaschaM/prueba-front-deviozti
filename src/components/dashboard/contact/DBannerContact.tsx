import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { DataContactPageI, HeroContact } from "../../../interfaces/dataContact";
import { useContact } from "../../../hooks";

interface Props {
  dataPage: DataContactPageI;
  toast: any;
}

const DBannerContact = ({ dataPage, toast }: Props) => {
  const { handleUpdateHero } = useContact();
  const [dataBanner, setDataBanner] = useState<HeroContact>();
  const { register, handleSubmit, setValue } = useForm<HeroContact>();
  const [isLoadingBanner, setIsLoadingBanner] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any>([] as any);

  const handleFileChangeCharacter = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const handleReaderLoadEnd = (result: string) => {
      setImagePreviews((prevPreviews: any) => {
        const newPreviews = [...prevPreviews];
        newPreviews[index] = result;
        return newPreviews;
      });

      setValue("image", file as any);
    };

    const reader = new FileReader();
    reader.onloadend = () => handleReaderLoadEnd(reader.result as string);
    reader.onerror = () => console.error("Error reading the file");

    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: HeroContact | any) => {
    setIsLoadingBanner(true);
    setIsLoadingBanner(false);

    const formData = new FormData();

    const dataFinal = {
      ...data,
      image: data?.image || dataBanner?.image,
    };

    const { title, description, image } = dataFinal;
    formData.append(`hero[title]`, title);
    formData.append(`hero[description]`, description);

    if (image instanceof File) {
      formData.append(`heroImage_0`, image);
    } else if (typeof image === "string") {
      formData.append(`hero[image]`, image);
    }

    try {
      formData.append(`sectionName`, "hero");
      const { response, ok } = await handleUpdateHero(formData);

      if (ok) {
        toast.success("Se actualizaron los datos con éxito");
        setIsLoadingBanner(false);
        setDataBanner(response.data);
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar");
      setIsLoadingBanner(false);
    }
  };

  useEffect(() => {
    setDataBanner(dataPage.hero);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Hero</h3>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap gap-4 overflow-x-auto">
            <table className="min-w-full overflow-hidden divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Banner
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Titulo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Descripción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataBanner && dataBanner.title && (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap w-32! ">
                      <div className="relative flex flex-col items-center w-32">
                        <label
                          htmlFor={`dropzone-file-banners-about`}
                          className="flex flex-col items-center justify-center w-32 overflow-hidden border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center h-20 pt-5 pb-6">
                            <AiOutlineCloudUpload size={40} />
                            <p className="mb-2 text-sm text-gray-500">
                              Subir icono
                            </p>
                          </div>
                          <input
                            id={`dropzone-file-banners-about`}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileChangeCharacter(e, 0)}
                          />
                          {imagePreviews[0] && (
                            <div className="absolute inset-0 flex items-center justify-center w-32 h-20">
                              {imagePreviews[0].includes("video") ? (
                                <video
                                  src={imagePreviews[0]}
                                  className="w-full h-20 bg-white object-content"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  preload="metadata"
                                ></video>
                              ) : (
                                <img
                                  src={imagePreviews[0]}
                                  alt="imagePreview"
                                  className="w-full h-full bg-white rounded-lg object-content"
                                />
                              )}
                            </div>
                          )}
                        </label>

                        {!imagePreviews[0] && (
                          <div className="absolute w-32 h-20 pointer-events-none object-content">
                            {dataBanner?.image?.includes("mp4") ? (
                              <video
                                src={dataBanner.image}
                                className="w-full h-20 bg-white object-content"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                              ></video>
                            ) : (
                              <img
                                src={dataBanner?.image}
                                alt="imagePreview"
                                className="w-full h-full bg-white rounded-lg object-content"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-32!">
                      <input
                        type="text"
                        placeholder="Titulo"
                        className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        defaultValue={dataBanner?.title}
                        {...register("title")}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-32!">
                      <input
                        type="text"
                        placeholder="Descripción"
                        className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        defaultValue={dataBanner?.description}
                        {...register("description")}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingBanner}
          >
            {isLoadingBanner ? (
              <l-ring size="19" speed="2" color="white" stroke={4}></l-ring>
            ) : (
              "Guardar cambios"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DBannerContact;
