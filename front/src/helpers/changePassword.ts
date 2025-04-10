/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IChangePassword } from "@/interfaces/IChangePassword";
import axios from "axios";

export const changePassword = async (
  token: string | null,
  formData: IChangePassword
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { success: true, message: `Contraseña modificada con éxito.` };
  } catch (error: any) {
    const errMsg = error?.response?.data?.message;
    console.log(errMsg)
    const translatedErrors: Record<string, string> = {
      "jwt expired": "Debes volver a ingresar a tu cuenta para realizar esta acción",
      "La contraseña actual es incorrecta.": "Contraseña ingresada incorrecta",
      "La nueva contraseña no puede ser igual a la anterior.": "La nueva contraseña no puede ser igual a la anterior",
    };
    const message = translatedErrors[errMsg] || "Error al cambiar de contraseña.";
    return { success: false, message};
  }
};
