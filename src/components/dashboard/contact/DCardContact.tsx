import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import ResponsivePagination from "react-responsive-pagination";

import { useContact, usePagination } from "../../../hooks";
import {
  DataContactPageI,
  CardContact,
  Cards,
} from "../../../interfaces/dataContact";

interface Props {
  dataPage: DataContactPageI;
  toast: any;
}

const DCardContact = ({ dataPage, toast }: Props) => {
  const [dataCardContact, setDataCardContact] = useState<CardContact>(
    {} as CardContact
  );
  const { handleUpdateContact } = useContact();
  const { register, handleSubmit, setValue, reset } = useForm<
    CardContact | any
  >();
  const [isLoadingCardContact, setIsLoadingCardContact] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any[]>([] as any);
  const [inputNewCard, setInputNewCard] = useState<Cards>({
    icon: "",
    link: "",
    type_link: "",
  });
  const {
    currentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    handlePageChange,
  } = usePagination<Cards>(
    Array.isArray(dataCardContact?.cards) ? dataCardContact?.cards : []
  );

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `contact[cards][${sectionIndex}].${fieldName}`;
  };

  const resetInputsAndImage = () => {
    setInputNewCard({
      icon: "",
      link: "",
      type_link: "",
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
          if (index === dataCardContact?.cards?.length) {
            setInputNewCard((prevInput) => ({
              ...prevInput,
              icon: newIcon as any,
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

  const onSubmit = async (data: any) => {
    setIsLoadingCardContact(true);
    const formData = new FormData();
    const dataFinal: CardContact = {
      title: data.contact.title || dataCardContact?.title || "",
      cards: [],
    };

    if (data.contact.cards && data.contact.cards.length > 0) {
      dataFinal.cards = data.contact.cards.map((card: any, index: any) => ({
        ...card,
        icon: card.icon || dataCardContact?.cards?.[index]?.icon,
      }));
    } else {
      dataFinal.cards = [...dataCardContact.cards];
    }

    if (
      inputNewCard.icon !== "" &&
      inputNewCard.link !== "" &&
      inputNewCard.type_link !== ""
    ) {
      dataFinal.cards.push({ ...inputNewCard });
    }

    formData.append(`contact[title]`, dataFinal.title);
    dataFinal.cards.forEach((card: Cards, index: any) => {
      formData.append(`contact[cards][${index}][link]`, card.link);
      formData.append(`contact[cards][${index}][type_link]`, card.type_link);

      if ((card.icon as any) instanceof File) {
        formData.append(`cardIcon_${index}`, card.icon);
      } else if (typeof card.icon === "string") {
        formData.append(`contact[cards][${index}][icon]`, card.icon);
      }
    });

    try {
      formData.append(`sectionName`, "contact");
      const { ok, response } = await handleUpdateContact(formData);

      if (ok) {
        toast.success("Se actualizaron las características con éxito");
        setIsLoadingCardContact(false);
        setDataCardContact(response.data);
        resetInputsAndImage();
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar las características");
      setIsLoadingCardContact(false);
    }
  };

  const onDeleteCard = async (_id: string) => {
    try {
      const updatedDataCards = dataCardContact?.cards.filter(
        (card) => card._id !== _id
      );

      const updatedDataCardsFinal = {
        title: dataCardContact?.title,
        cards: updatedDataCards!,
      };

      setDataCardContact(updatedDataCardsFinal);
      await onSubmit(updatedDataCardsFinal);
    } catch (error) {
      toast.error("Ocurrió un error al eliminar la característica");
    }
  };

  useEffect(() => {
    setDataCardContact(dataPage.contact);
  }, []);

  useEffect(() => {
    reset(dataCardContact);
  }, [dataCardContact]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Contacto</h3>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap gap-4 overflow-x-auto">
            <input
              type="text"
              placeholder="Titulo"
              defaultValue={dataCardContact?.title}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register(`contact.title`)}
            />
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
                    Tipo de enlace
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Enlace
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
                {currentItems?.map((card, index) => {
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
                              accept="image/*"
                              className="hidden"
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
                                src={card.icon}
                                alt="imagePreview"
                                className="w-full h-20 bg-white"
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          defaultValue={card.type_link}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: `type_link`,
                            }) as any
                          )}
                        >
                          <option value="" disabled>
                            Tipo de enlace
                          </option>
                          <option value="email">Email</option>
                          <option value="social">Red Social</option>
                          <option value="tel">Teléfono</option>
                          <option value="whatsapp">Whatsapp</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Enlace"
                          defaultValue={card.link}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: `link`,
                            }) as any
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => onDeleteCard(card._id!)}
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
                  defaultValue={inputNewCard.icon}
                  onChange={(e) =>
                    handleFileChangeCharacter(e, dataCardContact!.cards.length)
                  }
                />
              </label>

              {imagePreviews[dataCardContact?.cards?.length] && (
                <div className="absolute object-cover pointer-events-none w-fit h-fit">
                  <img
                    src={imagePreviews[dataCardContact?.cards?.length]}
                    alt="imagePreview"
                    className="w-full h-full bg-white"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Tipo de enlace"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) =>
                  setInputNewCard({
                    ...inputNewCard,
                    type_link: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Enlace"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) =>
                  setInputNewCard({
                    ...inputNewCard,
                    link: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingCardContact}
          >
            {isLoadingCardContact ? (
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

export default DCardContact;
