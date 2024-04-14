import { deviozAPI } from "../api/deviozAPI";
import { AxiosError } from "axios";
import { dataContactPageAtom } from "../store/dataPage";
import { useAtom } from "jotai";
import { DataContactPageI } from "../interfaces/dataContact";
import { handleManagmentError } from "../helpers/HookManagmentError";

interface ResponseI {
  response?: string;
  data?: DataContactPageI;
  ok: boolean;
}

const useContact = () => {
  const [dataContactPage, setDataContactPage] = useAtom(dataContactPageAtom);

  const handleGetData = async (): Promise<ResponseI> => {
    try {
      const response = await deviozAPI.get<DataContactPageI>(
        "/api/contact-page"
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de traer los datos");
      }

      const data = response.data;
      setDataContactPage(data);
      return { data: data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateHero = async (data: FormData) => {
    try {
      const response = await deviozAPI.put(
        `/api/contact-page/update-hero`,
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

      setDataContactPage({
        ...dataContactPage,
        hero: response.data,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateContact = async (data: FormData) => {
    try {
      const response = await deviozAPI.put(
        `/api/contact-page/update-contact`,
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

      setDataContactPage({
        ...dataContactPage,
        contact: response.data,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateFormInputs = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/contact-page/update-for-inputs`,
        data
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      setDataContactPage({
        ...dataContactPage,
        form: response.data,
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleSendMail = async (data: any) => {
    try {
      const response = await deviozAPI.post(`/api/contact-mail`, data);

      if (response.status !== 200) {
        throw new Error("Error al momento de enviar el correo");
      }

      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  return {
    dataContactPage,
    setDataContactPage,
    handleGetData,
    handleUpdateHero,
    handleUpdateContact,
    handleUpdateFormInputs,
    handleSendMail,
  };
};

export default useContact;
