import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ResponsivePagination from "react-responsive-pagination";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import { useAbout, usePagination } from "../../../hooks";
import {
  DataAboutPageI,
  OrganizationalPreceptsAbout,
} from "../../../interfaces/dataAbout";

interface Props {
  dataPage: DataAboutPageI;
  toast: any;
}

const DPreceptsAbout = ({ dataPage, toast }: Props) => {
  const [dataOrganizationalPrecepts, setDataOrganizationalPrecepts] = useState<
    OrganizationalPreceptsAbout[]
  >([]);
  const { handleUpdatePrecepts } = useAbout();
  const { register, handleSubmit, setValue } = useForm<
    OrganizationalPreceptsAbout[] | any
  >();
  const [isLoadingOrganizationalPrecepts, setIsLoadingOrganizationalPrecepts] =
    useState(false);
  const [imagePreviews, setImagePreviews] = useState<any[]>([]);
  const [inputNewPrecept, setInputNewPrecept] =
    useState<OrganizationalPreceptsAbout>({
      icon: "",
      title: "",
      description: "",
    });

  const {
    currentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    handlePageChange,
  } = usePagination<OrganizationalPreceptsAbout>(
    Array.isArray(dataOrganizationalPrecepts) ? dataOrganizationalPrecepts : []
  );

  const resetInputsAndImage = () => {
    setInputNewPrecept({
      icon: "",
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

        const updateCharacterIcon = (newIcon: File) => {
          if (index === dataOrganizationalPrecepts?.length) {
            setInputNewPrecept((prevInput: any) => ({
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

        updateCharacterIcon(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `organizational_precepts[${sectionIndex}].${fieldName}`;
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoadingOrganizationalPrecepts(true);

      const formData = new FormData();
      const updatedOrganizational_precepts = data.organizational_precepts
        ? data.organizational_precepts.map(
            (organizational_precept: any, index: any) => ({
              ...organizational_precept,
              icon:
                organizational_precept.icon ||
                dataOrganizationalPrecepts![index]?.icon,
            })
          )
        : dataOrganizationalPrecepts || [];

      if (
        inputNewPrecept.icon ||
        inputNewPrecept.title ||
        inputNewPrecept.description
      ) {
        updatedOrganizational_precepts.push({
          ...inputNewPrecept,
        });
      }

      updatedOrganizational_precepts.forEach(
        (organizational_precept: any, index: any) => {
          formData.append(
            `organizational_precepts[${index}][title]`,
            organizational_precept.title
          );
          formData.append(
            `organizational_precepts[${index}][description]`,
            organizational_precept.description
          );

          if (organizational_precept.icon instanceof File) {
            formData.append(
              `preceptIcon_${index}`,
              organizational_precept.icon
            );
          } else if (typeof organizational_precept.icon === "string") {
            formData.append(
              `organizational_precepts[${index}][icon]`,
              organizational_precept.icon
            );
          }
        }
      );

      formData.append(`sectionName`, "organizational_precepts");

      const { response, ok } = await handleUpdatePrecepts(formData);

      if (ok) {
        toast.success("Se actualizaron las características con éxito");
        setIsLoadingOrganizationalPrecepts(false);
        setDataOrganizationalPrecepts(response.data);
        resetInputsAndImage();
      }
    } catch (error) {
      console.error(
        "Ocurrió un error al actualizar las características",
        error
      );
      toast.error("Ocurrió un error al actualizar las características");
      setIsLoadingOrganizationalPrecepts(false);
    }
  };

  const onDeleteCharacter = async (_id: string) => {
    try {
      const dataFilter = dataOrganizationalPrecepts?.filter(
        (organizational_precept) => organizational_precept._id !== _id
      );

      setDataOrganizationalPrecepts(dataFilter);
      await onSubmit({ organizational_precepts: dataFilter });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDataOrganizationalPrecepts(dataPage.organizational_precepts);
  }, []);

  useEffect(() => {
    if (dataOrganizationalPrecepts) {
      setValue("organizational_precepts", dataOrganizationalPrecepts);
    }
  }, [dataOrganizationalPrecepts]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Valores</h3>
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
                    Valor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Descripcion
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
                        <div className="relative flex items-center justify-center h-20 overflow-hidden">
                          <label
                            htmlFor={`dropzone-file-precepts-${realIndex}`}
                            className="flex flex-col items-center justify-center h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer w-fit bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center h-20 pt-5 pb-6">
                              <AiOutlineCloudUpload size={40} />
                              <p className="mb-2 text-sm text-gray-500">
                                Subir icono
                              </p>
                            </div>
                            <input
                              id={`dropzone-file-precepts-${realIndex}`}
                              type="file"
                              className="hidden"
                              onChange={(e) =>
                                handleFileChangeCharacter(e, realIndex)
                              }
                            />
                          </label>

                          {imagePreviews[realIndex] ? (
                            <div className="absolute object-cover h-20 pointer-events-none">
                              <img
                                src={imagePreviews[realIndex]}
                                alt="imagePreview"
                                className="w-full h-20 bg-white"
                              />
                            </div>
                          ) : (
                            <div className="absolute object-cover h-20 pointer-events-none">
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
                          placeholder="Titulo"
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
                        <input
                          type="text"
                          placeholder="Descripcion"
                          defaultValue={character.description}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: "description",
                            }) as any
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          className="m-auto cursor-pointer"
                          onClick={() => onDeleteCharacter(character._id!)}
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

          {/* Paginacion */}
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={handlePageChange}
          />

          <div className="flex justify-center p-3 mb-4 transition-all duration-300 bg-gray-100 rounded-md shadow-md w-fit gap-y-2 gap-x-8 hover:bg-gray-200">
            <div className="relative flex items-center justify-center overflow-hidden h-fit">
              <label
                htmlFor={`dropzone-file-precept-new`}
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <AiOutlineCloudUpload size={40} />
                  <p className="mb-2 text-sm text-gray-500">Subir icono</p>
                </div>
                <input
                  id={`dropzone-file-precept-new`}
                  type="file"
                  className="hidden"
                  defaultValue={inputNewPrecept.icon}
                  onChange={(e) =>
                    handleFileChangeCharacter(
                      e,
                      dataOrganizationalPrecepts.length
                    )
                  }
                />
              </label>

              {imagePreviews.length > 0 &&
                imagePreviews[dataOrganizationalPrecepts.length] && (
                  <div className="absolute object-contain pointer-events-none w-fit h-fit">
                    <img
                      src={imagePreviews[dataOrganizationalPrecepts.length]}
                      alt="imagePreview"
                      className="object-contain w-full h-full bg-white"
                    />
                  </div>
                )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Titulo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={inputNewPrecept.title}
                onChange={(e) =>
                  setInputNewPrecept({
                    ...inputNewPrecept,
                    title: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Descripcion"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={inputNewPrecept.description}
                onChange={(e) =>
                  setInputNewPrecept({
                    ...inputNewPrecept,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingOrganizationalPrecepts}
          >
            {isLoadingOrganizationalPrecepts ? (
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

export default DPreceptsAbout;
