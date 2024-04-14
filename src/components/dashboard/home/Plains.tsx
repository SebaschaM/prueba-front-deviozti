import { useEffect, useState } from "react";
import { DataHomePageI, PaymentPlan } from "../../../interfaces/dataHome";
import { useHome } from "../../../hooks";
import { useForm } from "react-hook-form";
import { BsTrash } from "react-icons/bs";

interface Props {
  dataPage: DataHomePageI;
  toast: any;
}

const Plains = ({ dataPage, toast }: Props) => {
  const { handleUpdateDataSection } = useHome();
  const [dataPaymentPlain, setDataPaymentPlain] = useState<PaymentPlan[]>([]);
  const { register, handleSubmit, setValue, reset } = useForm<
    PaymentPlan[] | any
  >();
  const [isLoadingPlains, setIsLoadingPlains] = useState(false);

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `payment_plans[${sectionIndex}].${fieldName}`;
  };

  const onSubmit = async (data: any) => {
    setIsLoadingPlains(true);

    try {
      for (let i = 0; i < data.payment_plans.length; i++) {
        data.payment_plans[i].benefits = data.payment_plans[i].benefits.filter(
          (benefit: any) => benefit.name != ""
        );
      }

      const { ok, response } = await handleUpdateDataSection({
        newData: data.payment_plans,
        sectionName: "payment_plans",
      });

      if (ok) {
        toast.success("Sección actualizada correctamente");
        setIsLoadingPlains(false);
        reset();
        setDataPaymentPlain(response.data.payment_plans);
      } else {
        toast.error("Ocurrió un error al actualizar la sección");
        setIsLoadingPlains(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteBenefit = async (_id: string) => {
    try {
      const dataFilter = (dataPaymentPlain || []).map((plain) => ({
        ...plain,
        benefits: plain.benefits.filter((benefit) => benefit._id !== _id),
      }));

      setDataPaymentPlain(dataFilter);
      await onSubmit({ payment_plans: dataFilter });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDataPaymentPlain(dataPage.payment_plans);
  }, []);

  useEffect(() => {
    if (dataPaymentPlain) {
      setValue("payment_plans", dataPaymentPlain);
    }
  }, [dataPaymentPlain]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Planes</h3>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap gap-8">
            {dataPaymentPlain.map((plain, index) => (
              <div
                className={`w-full bg-white border-2 border-black lg:w-1/4 sm:w-1/2 ${
                  index == 1 && "scale-110"
                }`}
                key={index}
              >
                <div className={`w-full h-3 bg-[${plain.color}]`}>
                  <input
                    type="color"
                    defaultValue={plain.color}
                    className="w-full"
                    {...register(
                      getFieldName({
                        sectionIndex: index,
                        fieldName: "color",
                      }) as any
                    )}
                  />
                </div>
                <div className="flex flex-col items-center justify-center py-4 mb-4">
                  <input
                    type="text"
                    placeholder="Título"
                    defaultValue={plain.title_1}
                    className="w-full text-3xl font-bold text-center bg-transparent"
                    {...register(
                      getFieldName({
                        sectionIndex: index,
                        fieldName: "title_1",
                      }) as any
                    )}
                  />
                  <input
                    type="text"
                    placeholder="Subtitulo"
                    defaultValue={plain.text_title_1}
                    className="w-full px-4 text-center bg-transparent text-md"
                    {...register(
                      getFieldName({
                        sectionIndex: index,
                        fieldName: "text_title_1",
                      }) as any
                    )}
                  />
                  <input
                    type="text"
                    placeholder="Precio"
                    defaultValue={plain.price}
                    className="w-full text-2xl font-bold text-center bg-transparent"
                    {...register(
                      getFieldName({
                        sectionIndex: index,
                        fieldName: "price",
                      }) as any
                    )}
                  />
                  <input
                    type="text"
                    placeholder="Precio"
                    defaultValue={plain.span_1}
                    className="w-full text-center bg-transparent"
                    {...register(
                      getFieldName({
                        sectionIndex: index,
                        fieldName: "span_1",
                      }) as any
                    )}
                  />
                  <input
                    type="text"
                    placeholder="Precio"
                    defaultValue={plain.text_1}
                    className="w-full text-center bg-transparent"
                    {...register(
                      getFieldName({
                        sectionIndex: index,
                        fieldName: "text_1",
                      }) as any
                    )}
                  />
                  <ul className="flex flex-col gap-2 mt-4">
                    {plain.benefits.map((benefit, index2) => (
                      <li key={index2} className="flex w-full list-disc">
                        <input
                          type="text"
                          className="w-full"
                          defaultValue={benefit.name}
                          {...register(
                            getFieldName({
                              sectionIndex: index,
                              fieldName: `benefits[${index2}].name`,
                            }) as any
                          )}
                        />

                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => onDeleteBenefit(benefit._id)}
                        >
                          <BsTrash
                            size={20}
                            className="transition-all duration-300 hover:text-red-500"
                          />
                        </button>
                      </li>
                    ))}

                    <li>
                      <input
                        type="text"
                        className="w-full"
                        placeholder="Nuevo beneficio"
                        {...register(
                          getFieldName({
                            sectionIndex: index,
                            fieldName: `benefits[${plain.benefits.length}].name`,
                          }) as any
                        )}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingPlains}
          >
            {isLoadingPlains ? (
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

export default Plains;
