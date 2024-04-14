import { useEffect, useState } from "react";
import { Characteristics, DataHomePageI } from "../../../interfaces/dataHome";
import { useForm } from "react-hook-form";
import { useHome, usePagination } from "../../../hooks";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import ResponsivePagination from "react-responsive-pagination";

interface Props {
  dataPage: DataHomePageI;
  toast: any;
}

const CharacteristicsC = ({ dataPage, toast }: Props) => {
  const [dataCharacteristics, setDataCharacteristics] = useState<
    Characteristics[]
  >([]);
  const { handleUpdateCharacteristics } = useHome();
  const { register, handleSubmit, setValue } = useForm<
    Characteristics[] | any
  >();
  const [isLoadingCharacteristics, setIsLoadingCharacteristics] =
    useState(false);
  const [imagePreviews, setImagePreviews] = useState<any>([] as any);
  const [inputNewCharacter, setInputNewCharacter] = useState<Characteristics>({
    icon: "",
    quantity: "",
    text: "",
    isVisibled: false,
  });
  const {
    currentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    handlePageChange,
  } = usePagination<Characteristics>(
    Array.isArray(dataCharacteristics) ? dataCharacteristics : []
  );

  const resetInputsAndImage = () => {
    setInputNewCharacter({
      icon: "",
      quantity: "",
      text: "",
      isVisibled: false,
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
          if (index === dataCharacteristics?.length) {
            setInputNewCharacter((prevInput: any) => ({
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
    return `characteristics[${sectionIndex}].${fieldName}`;
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoadingCharacteristics(true);

      const formData = new FormData();
      const updatedCharacteristics = data.characteristics
        ? data.characteristics.map((character: any, index: any) => ({
            ...character,
            icon: character.icon || dataCharacteristics![index]?.icon,
          }))
        : dataCharacteristics || [];

      if (
        inputNewCharacter.icon ||
        inputNewCharacter.text ||
        inputNewCharacter.quantity
      ) {
        updatedCharacteristics.push({
          ...inputNewCharacter,
          isVisibled: inputNewCharacter.isVisibled,
        });
      }

      updatedCharacteristics.forEach((character: any, index: any) => {
        formData.append(
          `characteristics[${index}][quantity]`,
          character.quantity
        );
        formData.append(`characteristics[${index}][text]`, character.text);
        formData.append(
          `characteristics[${index}][isVisibled]`,
          character.isVisibled
        );

        if (character.icon instanceof File) {
          formData.append(`characterIcon_${index}`, character.icon);
        } else if (typeof character.icon === "string") {
          formData.append(`characteristics[${index}][icon]`, character.icon);
        }
      });

      formData.append(`sectionName`, "characteristics");

      const { response, ok } = await handleUpdateCharacteristics(formData);

      if (ok) {
        toast.success("Se actualizaron las características con éxito");
        setIsLoadingCharacteristics(false);
        setDataCharacteristics(response.data);
        resetInputsAndImage();
      }
    } catch (error) {
      console.error(
        "Ocurrió un error al actualizar las características",
        error
      );
      toast.error("Ocurrió un error al actualizar las características");
      setIsLoadingCharacteristics(false);
    }
  };

  const onDeleteCharacter = async (_id: string) => {
    try {
      const dataFilter = dataCharacteristics?.filter(
        (character) => character._id !== _id
      );

      setDataCharacteristics(dataFilter);
      await onSubmit({ characteristics: dataFilter });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDataCharacteristics(dataPage.characteristics);
  }, []);

  useEffect(() => {
    if (dataCharacteristics) {
      setValue("characteristics", dataCharacteristics);
    }
  }, [dataCharacteristics]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Características</h3>
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
                    Cantidad
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Caracteristica
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Visible
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
                            htmlFor={`dropzone-file-characteristics-${realIndex}`}
                            className="flex flex-col items-center justify-center h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer w-fit bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center h-20 pt-5 pb-6">
                              <AiOutlineCloudUpload size={40} />
                              <p className="mb-2 text-sm text-gray-500">
                                Subir icono
                              </p>
                            </div>
                            <input
                              id={`dropzone-file-characteristics-${realIndex}`}
                              type="file"
                              className="hidden"
                              accept="image/*"
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
                          placeholder="Cantidad"
                          defaultValue={character.quantity}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: "quantity",
                            }) as any
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Caracteristica"
                          defaultValue={character.text}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: "text",
                            }) as any
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            defaultChecked={character.isVisibled}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            {...register(
                              getFieldName({
                                sectionIndex: realIndex,
                                fieldName: "isVisibled",
                              }) as any
                            )}
                          />
                          <label
                            htmlFor="checked-checkbox"
                            className="text-gray-900 ms-2"
                          >
                            Visible
                          </label>
                        </div>
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
                htmlFor={`dropzone-file-characteristic-new`}
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <AiOutlineCloudUpload size={40} />
                  <p className="mb-2 text-sm text-gray-500">Subir icono</p>
                </div>
                <input
                  id={`dropzone-file-characteristic-new`}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  defaultValue={inputNewCharacter.icon}
                  onChange={(e) =>
                    handleFileChangeCharacter(e, dataCharacteristics.length)
                  }
                />
              </label>

              {imagePreviews[dataCharacteristics.length] && (
                <div className="absolute object-contain pointer-events-none w-fit h-fit">
                  <img
                    src={imagePreviews[dataCharacteristics.length]}
                    alt="imagePreview"
                    className="object-contain w-full h-full bg-white"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Cantidad"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={inputNewCharacter.quantity}
                onChange={(e) =>
                  setInputNewCharacter({
                    ...inputNewCharacter,
                    quantity: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Caracteristica"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={inputNewCharacter.text}
                onChange={(e) =>
                  setInputNewCharacter({
                    ...inputNewCharacter,
                    text: e.target.value,
                  })
                }
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-blue-600 border-blue-600 rounded focus:ring-blue-500"
                  checked={inputNewCharacter.isVisibled}
                  onChange={(e) =>
                    setInputNewCharacter({
                      ...inputNewCharacter,
                      isVisibled: e.target.checked,
                    })
                  }
                />
                <label
                  htmlFor="checked-checkbox"
                  className="text-gray-900 ms-2"
                >
                  Visible
                </label>
              </div>
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingCharacteristics}
          >
            {isLoadingCharacteristics ? (
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

export default CharacteristicsC;
