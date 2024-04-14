import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ResponsivePagination from "react-responsive-pagination";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import { DataAboutPageI, CompaniesAbout } from "../../../interfaces/dataAbout";
import { useAbout, usePagination } from "../../../hooks";

interface Props {
  dataPage: DataAboutPageI;
  toast: any;
}

const DCompaniesAbout = ({ dataPage, toast }: Props) => {
  const [dataCompanies, setDataCompanies] = useState<CompaniesAbout[]>(
    [] as CompaniesAbout[]
  );
  const { handleUpdateCompanies, handleUpdateRotationTime } = useAbout();
  const [rotationTime, setRotationTime] = useState(dataPage.rotation_time);
  const { register, handleSubmit, setValue, reset } =
    useForm<CompaniesAbout[]>();
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any[]>([]);
  const [inputNewCompanie, setInputNewCompanie] = useState<CompaniesAbout>({
    icon: "",
    name: "",
  });
  const {
    currentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    handlePageChange,
  } = usePagination<CompaniesAbout>(
    Array.isArray(dataCompanies) ? dataCompanies : []
  );

  // const currentItems = dataCompanies.slice(indexOfFirstItem, indexOfLastItem);

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `companies[${sectionIndex}].${fieldName}`;
  };

  const resetInputsAndImage = () => {
    setInputNewCompanie({
      icon: "",
      name: "",
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
          if (index === dataCompanies?.length) {
            setInputNewCompanie((prevInput) => ({
              ...prevInput,
              icon: newIcon as any,
            }));
          } else {
            setValue(
              getFieldName({
                sectionIndex: index,
                fieldName: "icon",
              }) as any,
              newIcon as any
            );
          }
        };

        updateTechnicalIcon(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CompaniesAbout[] | any) => {
    setIsLoadingCompanies(true);
    const formData = new FormData();
    const dataFinal: any[] = [];

    if (data.companies && data.companies.length > 0) {
      dataFinal.push(
        ...data.companies.map((companie: any, index: any) => ({
          ...companie,
          icon: companie.icon || dataCompanies?.[index]?.icon,
        }))
      );
    } else {
      dataFinal.push(...(dataCompanies || []));
    }

    if (inputNewCompanie.icon !== "" && inputNewCompanie.name !== "") {
      dataFinal.push({
        ...inputNewCompanie,
        icon: inputNewCompanie.icon,
        name: inputNewCompanie.name,
      });
    }

    dataFinal.forEach((companie: any, index: any) => {
      formData.append(`companies[${index}][name]`, companie.name);

      if (companie.icon instanceof File) {
        formData.append(`companieIcon_${index}`, companie.icon);
      } else if (typeof companie.icon === "string") {
        formData.append(`companies[${index}][icon]`, companie.icon);
      }
    });

    try {
      formData.append(`sectionName`, "companies");
      const { ok, response } = await handleUpdateCompanies(formData);

      if (ok) {
        toast.success("Se actualizaron las características con éxito");
        setIsLoadingCompanies(false);
        setDataCompanies(response.data);
        resetInputsAndImage();
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar las características");
      setIsLoadingCompanies(false);
    }
  };

  const onDeleteCompanie = async (_id: string) => {
    try {
      const updatedDataCompanies = (dataCompanies || []).filter(
        (technical) => technical._id !== _id
      );

      setDataCompanies(updatedDataCompanies);
      await onSubmit({ companies: updatedDataCompanies });
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
    setDataCompanies(dataPage.companies);
  }, []);

  useEffect(() => {
    reset(dataCompanies);
  }, [dataCompanies]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Clientes / Compañias</h3>
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
                    Nombre cliente
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
                            htmlFor={`dropzone-file-companies-a-${realIndex}`}
                            className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center h-20 pt-5 pb-6">
                              <AiOutlineCloudUpload size={40} />
                              <p className="mb-2 text-sm text-gray-500">
                                Subir icono
                              </p>
                            </div>
                            <input
                              id={`dropzone-file-companies-a-${realIndex}`}
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
                          placeholder="Nombre cliente"
                          defaultValue={character.name}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: "name",
                            }) as any
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => onDeleteCompanie(character._id!)}
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
                htmlFor={`dropzone-file-companie-new`}
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <AiOutlineCloudUpload size={40} />
                  <p className="mb-2 text-sm text-gray-500">Subir icono</p>
                </div>
                <input
                  id={`dropzone-file-companie-new`}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  defaultValue={inputNewCompanie.icon}
                  onChange={(e) =>
                    handleFileChangeCharacter(e, dataCompanies.length)
                  }
                />
              </label>

              {imagePreviews.length > 0 &&
                imagePreviews[dataCompanies.length] && (
                  <div className="absolute object-cover pointer-events-none w-fit h-fit">
                    <img
                      src={imagePreviews[dataCompanies.length]}
                      alt="imagePreview"
                      className="w-full h-full bg-white"
                    />
                  </div>
                )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Nombre cliente"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={inputNewCompanie.name}
                onChange={(e) =>
                  setInputNewCompanie({
                    ...inputNewCompanie,
                    name: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingCompanies}
          >
            {isLoadingCompanies ? (
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

export default DCompaniesAbout;
