import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import ResponsivePagination from "react-responsive-pagination";

import { useHome, usePagination } from "../../../hooks";
import { DataHomePageI, TechnicalSkills } from "../../../interfaces/dataHome";

interface Props {
  dataPage: DataHomePageI;
  toast: any;
}

const Technical = ({ dataPage, toast }: Props) => {
  const [dataTechnicals, setDataTechnicals] = useState<TechnicalSkills[]>([]);
  const { handleUpdateTechnicals, handleUpdateRotationTime } = useHome();
  const [rotationTime, setRotationTime] = useState(dataPage.rotation_time);
  const { register, handleSubmit, setValue } = useForm<
    TechnicalSkills[] | any
  >();
  const [isLoadingTechnical, setIsLoadingTechnical] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any[]>([] as any);
  const [inputNewTechnical, setInputNewTechnical] = useState<TechnicalSkills>({
    icon: "",
    skill: "",
  });
  const {
    currentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    handlePageChange,
  } = usePagination<TechnicalSkills>(
    Array.isArray(dataTechnicals) ? dataTechnicals : []
  );

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `technical_skills[${sectionIndex}].${fieldName}`;
  };

  const resetInputsAndImage = () => {
    setInputNewTechnical({
      icon: "",
      skill: "",
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
          if (index === dataTechnicals?.length) {
            setInputNewTechnical((prevInput) => ({
              ...prevInput,
              icon: newIcon,
            }));
          } else {
            setValue(
              getFieldName({
                sectionIndex: index,
                fieldName: "icon",
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

  const onSubmit = async (data: TechnicalSkills[] | any) => {
    setIsLoadingTechnical(true);
    const formData = new FormData();
    const dataFinal: any[] = [];

    if (data.technical_skills && data.technical_skills.length > 0) {
      dataFinal.push(
        ...data.technical_skills.map((technical: any, index: any) => ({
          ...technical,
          icon: technical.icon || dataTechnicals?.[index]?.icon,
        }))
      );
    } else {
      dataFinal.push(...(dataTechnicals || []));
    }

    if (inputNewTechnical.icon !== "" && inputNewTechnical.skill !== "") {
      dataFinal.push({
        ...inputNewTechnical,
        icon: inputNewTechnical.icon,
        skill: inputNewTechnical.skill,
      });
    }

    dataFinal.forEach((technical: any, index: any) => {
      formData.append(`technical_skills[${index}][skill]`, technical.skill);

      if (technical.icon instanceof File) {
        formData.append(`technicalIcon_${index}`, technical.icon);
      } else if (typeof technical.icon === "string") {
        formData.append(`technical_skills[${index}][icon]`, technical.icon);
      }
    });

    try {
      formData.append(`sectionName`, "technical_skills");
      const { ok, response } = await handleUpdateTechnicals(formData);

      if (ok) {
        toast.success("Se actualizaron las características con éxito");
        setIsLoadingTechnical(false);
        setDataTechnicals(response.data);
        resetInputsAndImage();
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar las características");
      setIsLoadingTechnical(false);
    }
  };

  const onDeleteTechnicalSkill = async (_id: string) => {
    try {
      const updatedDataTechnicals = (dataTechnicals || []).filter(
        (technical) => technical._id !== _id
      );

      setDataTechnicals(updatedDataTechnicals);
      await onSubmit({ technical_skills: updatedDataTechnicals });
    } catch (error) {
      toast.error("Ocurrió un error al eliminar la característica");
    }
  };

  const onUpdateTime = async () => {
    try {
      const { ok, response } = await handleUpdateRotationTime({
        sectionName: "rotation_time",
        rotationTime: rotationTime,
      });

      if (ok) {
        toast.success("Se actualizó el tiempo de rotación con éxito");
      }
    } catch (error) {
      toast.error("Ocurrió un error al eliminar la característica");
    }
  };

  useEffect(() => {
    setDataTechnicals(dataPage.technical_skills);
  }, []);

  useEffect(() => {
    if (dataTechnicals) {
      setValue("technical_skills", dataTechnicals);
    }
  }, [dataTechnicals]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Habilidades Técnicas</h3>
      <div className="flex gap-x-4">
        <input
          type="number"
          value={rotationTime}
          placeholder="Duración de rotación en segundos"
          className="bg-gray-50 border w-1/2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          onChange={(e) => setRotationTime(e.target.value)}
        />
        <button
          onClick={() => onUpdateTime()}
          type="button"
          className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
        >
          Actualizar tiempo
        </button>
      </div>
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
                    Habilidad técnica
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
                {currentItems.map((character, index) => {
                  const realIndex = indexOfFirstItem + index;
                  return (
                    <tr key={realIndex}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative flex items-center justify-center h-20 m-auto overflow-hidden w-fit">
                          <label
                            htmlFor={`dropzone-file-technicalss-${realIndex}`}
                            className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center h-20 pt-5 pb-6">
                              <AiOutlineCloudUpload size={40} />
                              <p className="mb-2 text-sm text-gray-500">
                                Subir icono
                              </p>
                            </div>
                            <input
                              id={`dropzone-file-technicalss-${realIndex}`}
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChangeCharacter(e, realIndex)
                              }
                            />
                          </label>

                          {imagePreviews[realIndex] ? (
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
                                src={character.icon}
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
                          placeholder="Habilidad técnica"
                          defaultValue={character.skill}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: "skill",
                            }) as any
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => onDeleteTechnicalSkill(character._id!)}
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
                  <p className="mb-2 text-sm text-gray-500">Subir icono</p>
                </div>
                <input
                  id={`dropzone-file-technical-new`}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  defaultValue={inputNewTechnical.icon}
                  onChange={(e) =>
                    handleFileChangeCharacter(e, dataTechnicals.length)
                  }
                />
              </label>

              {imagePreviews[dataTechnicals.length] && (
                <div className="absolute object-cover pointer-events-none w-fit h-fit">
                  <img
                    src={imagePreviews[dataTechnicals.length]}
                    alt="imagePreview"
                    className="w-full h-full bg-white"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Habilidad técnica"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={inputNewTechnical.skill}
                onChange={(e) =>
                  setInputNewTechnical({
                    ...inputNewTechnical,
                    skill: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingTechnical}
          >
            {isLoadingTechnical ? (
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

export default Technical;
