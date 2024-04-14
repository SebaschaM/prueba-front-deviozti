import { useEffect, useState } from "react";
import {
  BannerInfo as BannerInfoI,
  DataHomePageI,
} from "../../../interfaces/dataHome";
import { useHome } from "../../../hooks";
import { useForm } from "react-hook-form";

interface Props {
  dataPage: DataHomePageI;
  toast: any;
}

const BannerInfo = ({ dataPage, toast }: Props) => {
  const { handleUpdateDataSection } = useHome();
  const { register, handleSubmit, setValue } = useForm<BannerInfoI | any>();
  const [isLoadingBannerInfo, setIsLoadingBannerInfo] = useState(false);
  const [dataBannerInfo, setDataBannerInfo] = useState<BannerInfoI | any>();

  const onSubmit = async (data: BannerInfoI | any) => {
    try {
      setIsLoadingBannerInfo(true);
      const { ok, response } = await handleUpdateDataSection({
        newData: data,
        sectionName: "banner_info",
      });

      if (ok) {
        toast.success("Sección actualizada correctamente");
        setIsLoadingBannerInfo(false);
        setDataBannerInfo(response.data.banner_info);
      } else {
        toast.error("Ocurrió un error al actualizar la sección");
        setIsLoadingBannerInfo(false);
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar la sección");
      setIsLoadingBannerInfo(false);
    }
  };

  useEffect(() => {
    setDataBannerInfo(dataPage.banner_info);
  }, []);

  useEffect(() => {
    if (dataBannerInfo) {
      setValue("banner_info", dataBannerInfo);
    }
  }, [dataBannerInfo]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Banner Info</h3>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-64 p-3 mb-4 transition-all duration-300 gap-y-2 gap-x-8 bg-slate-100 hover:bg-slate-200 h-fit">
            <div>
              <input
                type="text"
                placeholder="Texto resaltado"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue={dataBannerInfo?.text_bold}
                {...register("text_bold")}
              />
            </div>
            <div>
              <input
                type="text"
                defaultValue={dataBannerInfo?.text_button}
                placeholder="Boton de texto"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("text_button")}
              />
            </div>
            <div>
              <textarea
                rows={4}
                className="block p-2.5 w-full max-h-[10rem] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Texto"
                defaultValue={dataBannerInfo?.text}
                {...register("text")}
              ></textarea>
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingBannerInfo}
          >
            {isLoadingBannerInfo ? (
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

export default BannerInfo;
