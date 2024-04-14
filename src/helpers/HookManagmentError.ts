import { AxiosError, isAxiosError } from "axios";

export const handleManagmentError = (error: AxiosError | Error) => {
  if (isAxiosError(error)) {
    return { response: error.response?.data, ok: false };
  }

  if (error instanceof Error) {
    return { response: error.message, ok: false };
  } else {
    return { response: "Error de inicio de sesión", ok: false };
  }
};
