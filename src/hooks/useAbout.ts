import { deviozAPI } from "../api/deviozAPI";
import { AxiosError } from "axios";
import { DataAboutPageI } from "../interfaces/dataAbout";
import { dataAboutPageAtom } from "../store/dataPage";
import { useAtom } from "jotai";
import { handleManagmentError } from "../helpers/HookManagmentError";

interface ResponseI {
  response?: string;
  data?: DataAboutPageI;
  ok: boolean;
}

const useAbout = () => {
  const [dataAboutPage, setDataAboutPage] = useAtom(dataAboutPageAtom);

  const handleGetData = async (): Promise<ResponseI> => {
    try {
      const response = await deviozAPI.get<DataAboutPageI>("/api/about-page");

      if (response.status !== 200) {
        throw new Error("Error al momento de traer los datos");
      }

      const data = response.data;
      setDataAboutPage(data);
      return { data: data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateFundamentals = async (data: FormData) => {
    try {
      const response = await deviozAPI.put(
        `/api/about-page/update-fundamentals`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      setDataAboutPage({
        ...dataAboutPage,
        fundamentals: response.data,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateCompanies = async (data: FormData) => {
    try {
      const response = await deviozAPI.put(
        `/api/about-page/update-clients`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      setDataAboutPage({
        ...dataAboutPage,
        companies: response.data,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdatePrecepts = async (data: FormData) => {
    try {
      const response = await deviozAPI.put(
        `/api/about-page/update-precepts`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      setDataAboutPage({
        ...dataAboutPage,
        organizational_precepts: response.data,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateHero = async (data: FormData) => {
    try {
      const response = await deviozAPI.put(
        `/api/about-page/update-hero`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      setDataAboutPage({
        ...dataAboutPage,
        hero: response.data,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateRotationTime = async (data: {
    sectionName: string;
    rotationTime: string;
  }) => {
    try {
      const response = await deviozAPI.put(
        `/api/about-page/update-rotation-time`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      setDataAboutPage({
        ...dataAboutPage,
        rotation_time: response.data,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  return {
    dataAboutPage,
    setDataAboutPage,
    handleGetData,
    handleUpdateFundamentals,
    handleUpdateCompanies,
    handleUpdatePrecepts,
    handleUpdateHero,
    handleUpdateRotationTime,
  };
};

export default useAbout;
