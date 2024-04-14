import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import ResponsivePagination from "react-responsive-pagination";

import { useContact, usePagination } from "../../../hooks";
import { DataContactPageI, FormContact } from "../../../interfaces/dataContact";

interface Props {
  dataPage: DataContactPageI;
  toast: any;
}

const DFormContact = ({ dataPage, toast }: Props) => {
  const [dataForm, setDataForm] = useState<FormContact[]>([] as FormContact[]);
  const { handleUpdateFormInputs } = useContact();
  const { register, handleSubmit, reset } = useForm<FormContact[] | any>();
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [inputNewInputForm, setInputNewInputForm] = useState<FormContact>({
    label: "",
    form_field: {
      inputType: "text",
      placeHolder: "",
    },
  });
  const {
    currentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    handlePageChange,
  } = usePagination<FormContact>(Array.isArray(dataForm) ? dataForm : []);

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `form[${sectionIndex}].${fieldName}`;
  };

  const resetInputsAndImage = () => {
    setInputNewInputForm({
      label: "",
      form_field: {
        inputType: "text",
        placeHolder: "",
      },
    });
  };

  const onSubmit = async (data: any) => {
    setIsLoadingForm(true);
    const dataFinal = [];
    console.log(data.form);

    dataFinal.push(
      ...data.form.map((technical: any, _index: any) => ({
        ...technical,
      }))
    );

    if (
      inputNewInputForm.label !== "" &&
      inputNewInputForm.form_field.inputType &&
      inputNewInputForm.form_field.placeHolder !== ""
    ) {
      dataFinal.push(inputNewInputForm);
    }

    console.log(dataFinal);

    try {
      const { ok, response } = await handleUpdateFormInputs(dataFinal);
      if (ok) {
        toast.success("Se actualizaron las características con éxito");
        setIsLoadingForm(false);
        resetInputsAndImage();
        setDataForm(response.data);
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar las características");
      setIsLoadingForm(false);
    }
  };

  const onDeleteTechnicalSkill = async (_id: string) => {
    try {
      const dataFilter = dataForm.filter((form) => form._id !== _id);
      setDataForm(dataFilter);
      await onSubmit({ form: dataFilter });
    } catch (error) {
      toast.error("Ocurrió un error al eliminar la característica");
    }
  };

  useEffect(() => {
    setDataForm(dataPage.form);
  }, []);

  useEffect(() => {
    reset(dataForm);
  }, [dataForm]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Formulario</h3>
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-4 overflow-x-auto">
            <table className="min-w-full overflow-hidden divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Label
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Tipo de campo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Placeholder de campo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems?.map((form, index) => {
                  const realIndex = indexOfFirstItem + index;
                  return (
                    <tr key={realIndex}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Label"
                          defaultValue={form.label}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: `label`,
                            }) as any
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          defaultValue={form.form_field.inputType}
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: `form_field.inputType`,
                            }) as any
                          )}
                        >
                          <option value={"default"} disabled>
                            Seleccione un tipo de proyecto
                          </option>
                          <option value={"text"}>Texto</option>
                          <option value={"number"}>Número</option>
                          <option value={"email"}>Email</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Placeholder del campo"
                          defaultValue={form.form_field.placeHolder}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          {...register(
                            getFieldName({
                              sectionIndex: realIndex,
                              fieldName: `form_field.placeHolder`,
                            }) as any
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => onDeleteTechnicalSkill(form._id!)}
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
            <div className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="Label"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={inputNewInputForm.label}
                onChange={(e) =>
                  setInputNewInputForm({
                    ...inputNewInputForm,
                    label: e.target.value,
                  })
                }
              />
              <select
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                onChange={(e) =>
                  setInputNewInputForm({
                    ...inputNewInputForm,
                    form_field: {
                      ...inputNewInputForm.form_field,
                      inputType: e.target.value as any,
                    },
                  })
                }
                value={inputNewInputForm.form_field.inputType}
              >
                <option value={"default"} disabled>
                  Seleccione un tipo de proyecto
                </option>
                <option value={"text"}>Texto</option>
                <option value={"number"}>Número</option>
                <option value={"email"}>Email</option>
                {/* <option value={"select"}>Select</option> */}
              </select>
              <input
                type="text"
                placeholder="Placeholder del campo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={inputNewInputForm.form_field.placeHolder}
                onChange={(e) =>
                  setInputNewInputForm({
                    ...inputNewInputForm,
                    form_field: {
                      ...inputNewInputForm.form_field,
                      placeHolder: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingForm}
          >
            {isLoadingForm ? (
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

export default DFormContact;
