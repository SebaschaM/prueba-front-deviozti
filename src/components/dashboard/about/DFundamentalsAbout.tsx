import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ResponsivePagination from "react-responsive-pagination";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import { useAbout, usePagination } from "../../../hooks";
import {
  DataAboutPageI,
  FundamentalsAbout,
} from "../../../interfaces/dataAbout";

interface Props {
  dataPage: DataAboutPageI;
  toast: any;
}

const DFundamentalsAbout = ({ dataPage, toast }: Props) => {
  const { handleUpdateFundamentals } = useAbout();
  const [isLoadingFundamentals, setIsLoadingFundamentals] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any[]>([] as any);
  const [dataFundamentals, setDataFundamentals] = useState<FundamentalsAbout[]>(
    []
  );
  const { register, handleSubmit, setValue, reset } = useForm<
    FundamentalsAbout[] | any
  >();
  const [inputNewFundamental, setInputNewFundamental] =
    useState<FundamentalsAbout>({
      title: "",
      description: "",
      image: "",
    });
  const {
    currentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    handlePageChange,
  } = usePagination<FundamentalsAbout>(
    Array.isArray(dataFundamentals) ? dataFundamentals : []
  );

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `fundamentals[${sectionIndex}].${fieldName}`;
  };

  const resetInputsAndImage = () => {
    setInputNewFundamental({
      image: "",
      title: "",
      description: "",
    });
    setImagePreviews([]);
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

        const updateTechnicalIcon = (newIcon: File) => {
          if (index === dataFundamentals?.length) {
            setInputNewFundamental((prevInput) => ({
              ...prevInput,
              image: newIcon as any,
            }));
          } else {
            setValue(
              getFieldName({
                sectionIndex: index,
                fieldName: "image",
              }) as any,
              newIcon
            );
          }
        };

        updateTechnicalIcon(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FundamentalsAbout[] | any) => {
    setIsLoadingFundamentals(true);
    const formData = new FormData();
    const dataFinal: any[] = [];

    if (data.fundamentals && data.fundamentals.length > 0) {
      dataFinal.push(
        ...data.fundamentals.map((fundamental: any, index: any) => ({
          ...fundamental,
          image: fundamental.image || dataFundamentals?.[index]?.image,
        }))
      );
    } else {
      dataFinal.push(...dataFundamentals);
    }

    if (
      inputNewFundamental.image !== "" &&
      inputNewFundamental.title !== "" &&
      inputNewFundamental.description !== ""
    ) {
      dataFinal.push({
        ...inputNewFundamental,
      });
    }

    dataFinal.forEach((fundamental: any, index: any) => {
      formData.append(`fundamentals[${index}][title]`, fundamental.title);
      formData.append(
        `fundamentals[${index}][description]`,
        fundamental.description
      );

      if (fundamental.image instanceof File) {
        formData.append(`fundamentalIcon_${index}`, fundamental.image);
      } else if (typeof fundamental.image === "string") {
        formData.append(`fundamentals[${index}][image]`, fundamental.image);
      }
    });

    try {
      formData.append(`sectionName`, "fundamentals");
      const { ok, response } = await handleUpdateFundamentals(formData);

      if (ok) {
        toast.success("Se actualizaron los fundamentos con éxito");
        setIsLoadingFundamentals(false);
        setDataFundamentals(response.data);
        resetInputsAndImage();
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar las características");
      setIsLoadingFundamentals(false);
    }
  };

  const onDeleteFundamental = async (_id: string) => {
    try {
      const updatedDataTechnicals = (dataFundamentals || []).filter(
        (technical) => technical._id !== _id
      );

      setDataFundamentals(updatedDataTechnicals);
      await onSubmit({ fundamentals: updatedDataTechnicals });
    } catch (error) {
      toast.error("Ocurrió un error al eliminar la característica");
    }
  };

  useEffect(() => {
    setDataFundamentals(dataPage.fundamentals);
  }, []);

  useEffect(() => {
    reset(dataFundamentals);
  }, [dataFundamentals]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Fundamentos</h3>
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
                    Icono
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Fundamento
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Descrición
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems?.map((character, index) => {
                  const realIndex = indexOfFirstItem + index;
                  return (
                    <tr key={realIndex}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative flex items-center justify-center h-20 m-auto overflow-hidden w-fit">
                          <label
                            htmlFor={`dropzone-file-fundamentals-${realIndex}`}
                            className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center h-20 pt-5 pb-6">
                              <AiOutlineCloudUpload size={40} />
                              <p className="mb-2 text-sm text-gray-500">
                                Subir icono
                              </p>
                            </div>
                            <input
                              id={`dropzone-file-fundamentals-${realIndex}`}
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChangeCharacter(e, realIndex)
                              }
                            />
                          </label>

                          {imagePreviews.length > 0 &&
                          imagePreviews[realIndex] ? (
                            <div className="absolute object-contain pointer-events-none w-max-60 h-max-60">
                              <img
                                src={imagePreviews[realIndex]}
                                alt="imagePreview"
                                className="w-full h-20 bg-white"
                              />
                            </div>
                          ) : (
                            <div className="absolute object-contain pointer-events-none w-max-60 h-max-60">
                              <img
                                src={character.image}
                                alt="imagePreview"
                                className="w-full h-20 bg-white"
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Fundamento"
                          defaultValue={character.title}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: "title",
                            }) as any
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <textarea
                          rows={4}
                          placeholder="Texto proyecto"
                          className="max-h-[8rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 md:w-full"
                          defaultValue={character.description}
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: "description",
                            }) as any
                          )}
                        ></textarea>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => onDeleteFundamental(character._id!)}
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
            onPageChange={handlePageChange}
          />

          <div className="flex justify-center p-3 mb-4 transition-all duration-300 bg-gray-100 rounded-md shadow-md w-fit gap-y-2 gap-x-8 hover:bg-gray-200">
            <div className="relative flex items-center justify-center overflow-hidden h-fit">
              <label
                htmlFor={`dropzone-file-technical-new`}
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <AiOutlineCloudUpload size={40} />
                  <p className="mb-2 text-sm text-gray-500">Subir imagen</p>
                </div>
                <input
                  id={`dropzone-file-technical-new`}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  defaultValue={inputNewFundamental.image}
                  onChange={(e) =>
                    handleFileChangeCharacter(e, dataFundamentals.length)
                  }
                />
              </label>

              {imagePreviews.length > 0 &&
                imagePreviews[dataFundamentals.length] && (
                  <div className="absolute object-cover pointer-events-none w-fit h-fit">
                    <img
                      src={imagePreviews[dataFundamentals.length]}
                      alt="imagePreview"
                      className="w-full h-full bg-white"
                    />
                  </div>
                )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Fundamento"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={inputNewFundamental.title}
                onChange={(e) =>
                  setInputNewFundamental({
                    ...inputNewFundamental,
                    title: e.target.value,
                  })
                }
              />
              <textarea
                rows={4}
                placeholder="Texto proyecto"
                className="max-h-[8rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 md:w-full"
                value={inputNewFundamental.description}
                onChange={(e) =>
                  setInputNewFundamental({
                    ...inputNewFundamental,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingFundamentals}
          >
            {isLoadingFundamentals ? (
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

export default DFundamentalsAbout;
