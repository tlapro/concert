/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

interface DeleteUser {
  token: string;
  password: string;
}

export const deleteUser = async ({ token, password }: DeleteUser) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/users/delete-user`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return { success: true, message: "Cuenta eliminada con éxito" };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Hubo un error al eliminar la cuenta.",
    };
  }
};
