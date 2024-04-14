import { deviozAPI } from "../api/deviozAPI";
import { AxiosError } from "axios";
import { DataHomePageI } from "../interfaces/dataHome";
import { dataHomePageAtom } from "../store/dataPage";
import { useAtom } from "jotai";
import { handleManagmentError } from "../helpers/HookManagmentError";

interface ResponseI {
  response?: string;
  data?: DataHomePageI;
  ok: boolean;
}

const useHome = () => {
  const [dataHomePage, setDataHomePage] = useAtom(dataHomePageAtom);

  const handleGetData = async (): Promise<ResponseI> => {
    try {
      const response = await deviozAPI.get<DataHomePageI>("/api/home-page");

      if (response.status !== 200) {
        throw new Error("Error al momento de traer los datos");
      }

      const data = response.data;
      setDataHomePage(data);
      return { data: data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateDataSectionWithImage = async (data: FormData) => {
    try {
      const response = await deviozAPI.put(
        `/api/home-page/update-with-image`,
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

      setDataHomePage({
        ...dataHomePage,
        [data.get("sectionName") as string]: response.data.data.navbar,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateDataSection = async (data: any) => {
    try {
      const response = await deviozAPI.put(`/api/home-page/update`, data);

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateCharacteristics = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/home-page/update-characteristics`,
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

      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateTechnicals = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/home-page/update-technicals`,
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

      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateProjects = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/home-page/update-projects`,
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

      setDataHomePage({
        ...dataHomePage,
        projects: response.data,
      });

      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateHeros = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/home-page/update-heros`,
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

      setDataHomePage({
        ...dataHomePage,
        heros: response.data,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateOptimized = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/home-page/update-optimized`,
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

      setDataHomePage({
        ...dataHomePage,
        optimized: response.data,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateRotationTime = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/home-page/update-rotation-time`,
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

      setDataHomePage({
        ...dataHomePage,
        rotation_time: response.data,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  return {
    dataHomePage,
    setDataHomePage,
    handleGetData,
    handleUpdateDataSectionWithImage,
    handleUpdateDataSection,
    handleUpdateCharacteristics,
    handleUpdateTechnicals,
    handleUpdateHeros,
    handleUpdateProjects,
    handleUpdateOptimized,
    handleUpdateRotationTime,
  };
};

export default useHome;
