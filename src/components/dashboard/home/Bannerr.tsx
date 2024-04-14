import { useEffect, useState } from "react";
import { DataHomePageI, Hero } from "../../../interfaces/dataHome";
import { useForm } from "react-hook-form";
import { useHome } from "../../../hooks";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface Props {
  dataPage: DataHomePageI;
  toast: any;
}

const Bannerr = ({ dataPage, toast }: Props) => {
  const { handleUpdateHeros } = useHome();
  const [dataBanner, setDataBanner] = useState<Hero[]>([]);
  const { register, handleSubmit, setValue } = useForm<Hero[] | any>();
  const [isLoadingBanners, setIsLoadingBanners] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any>([] as any);
  const [videoPreview, setVideoPreview] = useState<any>([] as any);

  const handleFileChangeVideo = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const handleReaderLoadEnd = (result: string) => {
      setVideoPreview((prevPreviews: any) => {
        const newPreviews = [...prevPreviews];
        newPreviews[index] = result;
        return newPreviews;
      });

      setValue(
        getFieldName({ sectionIndex: index, fieldName: "video" }) as any,
        file
      );
    };

    const reader = new FileReader();
    reader.onloadend = () => handleReaderLoadEnd(reader.result as string);
    reader.onerror = () => console.error("Error reading the file");
    reader.readAsDataURL(file);
  };

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

      setValue(
        getFieldName({ sectionIndex: index, fieldName: "image" }) as any,
        file
      );
    };

    const reader = new FileReader();
    reader.onloadend = () => handleReaderLoadEnd(reader.result as string);
    reader.onerror = () => console.error("Error reading the file");

    reader.readAsDataURL(file);
  };

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `heros[${sectionIndex}].${fieldName}`;
  };

  const onSubmit = async (data: Hero[] | any) => {
    setIsLoadingBanners(true);
    const formData = new FormData();

    const dataFinal = data.heros
      ? data.heros.map((hero: any, index: any) => ({
          ...hero,
          image: hero.image || dataBanner![index]?.image,
          video: hero.video || dataBanner![index]?.video,
        }))
      : dataBanner!;

    dataFinal.forEach((hero: any, index: any) => {
      const { texts, video, image } = hero;

      formData.append(`heros[${index}][texts][text_1]`, texts.text_1);

      for (let i = 2; i <= 3; i++) {
        if (texts[`text_${i}`]) {
          formData.append(
            `heros[${index}][texts][text_${i}]`,
            texts[`text_${i}`]
          );
        }
      }

      formData.append(`heros[${index}][texts][text_button]`, texts.text_button);

      if (video instanceof File) {
        formData.append(`heroVideo_${index}`, video);
      } else if (typeof video === "string") {
        formData.append(`heros[${index}][video]`, video);
      }

      if (image instanceof File) {
        formData.append(`heroImage_${index}`, image);
      } else if (typeof image === "string") {
        formData.append(`heros[${index}][image]`, image);
      }
    });

    try {
      formData.append(`sectionName`, "heros");
      const { response, ok } = await handleUpdateHeros(formData);

      if (ok) {
        toast.success("Se actualizaron los datos con éxito");
        setIsLoadingBanners(false);
        setDataBanner(response.data);
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar");
      setIsLoadingBanners(false);
    }
  };

  useEffect(() => {
    setDataBanner(dataPage.heros);
  }, []);

  useEffect(() => {
    if (dataBanner) {
      setValue("heros", dataBanner);
    }
  }, [dataBanner]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Heros / Banners</h3>
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
                    Texto 1
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Texto 2
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Texto 3
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Texto del Botón
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Video
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataBanner &&
                  dataBanner.map((hero, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap w-32! ">
                        <div className="relative flex flex-col items-center w-32">
                          <label
                            htmlFor={`dropzone-file-banners-${index}`}
                            className="flex flex-col items-center justify-center w-32 overflow-hidden border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center h-20 pt-5 pb-6">
                              <AiOutlineCloudUpload size={40} />
                              <p className="mb-2 text-sm text-gray-500">
                                Subir icono
                              </p>
                            </div>
                            <input
                              id={`dropzone-file-banners-${index}`}
                              type="file"
                              className="hidden"
                              accept="image/*,video/*"
                              onChange={(e) =>
                                handleFileChangeCharacter(e, index)
                              }
                            />
                            {imagePreviews[index] && (
                              <div className="absolute inset-0 flex items-center justify-center w-32 h-20">
                                {imagePreviews[index].includes("video") ? (
                                  <video
                                    src={imagePreviews[index]}
                                    className="w-full h-20 bg-white object-content"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                  ></video>
                                ) : (
                                  <img
                                    src={imagePreviews[index]}
                                    alt="imagePreview"
                                    className="w-full h-full bg-white rounded-lg object-content"
                                  />
                                )}
                              </div>
                            )}
                          </label>

                          {!imagePreviews[index] && (
                            <div className="absolute w-32 h-20 pointer-events-none object-content">
                              {hero.image.includes("mp4") ? (
                                <video
                                  src={hero.image}
                                  className="w-full h-20 bg-white object-content"
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  preload="metadata"
                                ></video>
                              ) : (
                                <img
                                  src={hero.image}
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
                          placeholder="Texto 1"
                          className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          defaultValue={hero.texts.text_1}
                          {...register(
                            getFieldName({
                              sectionIndex: index,
                              fieldName: "texts.text_1",
                            }) as any
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-32!">
                        {hero.texts.text_2 && (
                          <input
                            type="text"
                            placeholder="Texto 2"
                            className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            defaultValue={hero.texts.text_2}
                            {...register(
                              getFieldName({
                                sectionIndex: index,
                                fieldName: "texts.text_2",
                              }) as any
                            )}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-32!">
                        {hero.texts.text_3 && (
                          <textarea
                            rows={4}
                            placeholder="Texto 3"
                            className="block w-32 p-2.5 max-h-[10rem] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            defaultValue={hero.texts.text_3}
                            {...register(
                              getFieldName({
                                sectionIndex: index,
                                fieldName: "texts.text_3",
                              }) as any
                            )}
                          ></textarea>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-32!">
                        <input
                          type="text"
                          placeholder="Texto del boton"
                          className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          defaultValue={hero.texts.text_button}
                          {...register(
                            getFieldName({
                              sectionIndex: index,
                              fieldName: "texts.text_button",
                            }) as any
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-32!">
                        {index == 0 && (
                          <div className="relative flex items-center w-32">
                            <label
                              htmlFor={`dropzone-file-banners-video-${index}`}
                              className="flex flex-col items-center justify-center w-32 overflow-hidden border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 hover:bg-gray-100"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <AiOutlineCloudUpload size={40} />
                                <p className="mb-2 text-sm text-gray-500">
                                  Subir Video
                                </p>
                              </div>
                              <input
                                id={`dropzone-file-banners-video-${index}`}
                                type="file"
                                className="hidden"
                                accept="video/*"
                                {...register(
                                  getFieldName({
                                    sectionIndex: index,
                                    fieldName: "video",
                                  }) as any
                                )}
                                onChange={(e) =>
                                  handleFileChangeVideo(e, index)
                                }
                              />
                              {(videoPreview[index] || hero.video) && (
                                <div className="absolute inset-0 flex items-center justify-center w-32 h-36">
                                  <video
                                    src={videoPreview[index] || hero.video}
                                    className="w-full bg-white h-36 object-content"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                  ></video>
                                </div>
                              )}
                            </label>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingBanners}
          >
            {isLoadingBanners ? (
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

export default Bannerr;
