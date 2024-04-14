import { DataSocialMedia } from "../interfaces/dataSocialMedia";
import { deviozAPI } from "../api/deviozAPI";
import { useAtom } from "jotai";
import { dataSocialMediaAtom } from "../store/dataSocialMedia";
import { AxiosError, isAxiosError } from "axios";

interface ResponseI {
  response?: string;
  data?: DataSocialMedia[];
  ok: boolean;
}

const useSocialMedia = () => {
  const [dataSocialMedia, setDataSocialMedia] = useAtom(dataSocialMediaAtom);

  const handleGetData = async (): Promise<ResponseI> => {
    try {
      const response = await deviozAPI.get<DataSocialMedia[]>(
        "/api/social-media"
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de traer los datos");
      }

      const data = response.data;
      setDataSocialMedia(data);
      return { data: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleAddData = async (data: FormData) => {
    try {
      const response = await deviozAPI.post("/api/social-media/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Error al momento de agregar los datos");
      }

      setDataSocialMedia(response.data.data);
      return { ok: true, response: response.data };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleDeleteData = async (id: string) => {
    try {
      const response = await deviozAPI.delete(`/api/social-media/delete/${id}`);

      if (response.status !== 200) {
        throw new Error("Error al momento de eliminar los datos");
      }

      setDataSocialMedia(response.data.data);
      return { ok: true, response: response.data };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateData = async (data: FormData) => {
    try {
      const response = await deviozAPI.put("/api/social-media/update", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      setDataSocialMedia(response.data.data);
      return { ok: true, response: response.data };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleManagmentError = (error: AxiosError | Error) => {
    if (isAxiosError(error)) {
      return { response: error.response?.data, ok: false };
    }

    if (error instanceof Error) {
      return { response: error.message, ok: false };
    } else {
      return { response: "Error de inicio de sesión", ok: false };
    }
  };

  return {
    dataSocialMedia,
    setDataSocialMedia,
    handleGetData,
    handleAddData,
    handleDeleteData,
    handleUpdateData,
  };
};

export default useSocialMedia;
