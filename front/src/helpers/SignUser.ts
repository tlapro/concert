import axios from "axios";
import { ICredentials } from "@/interfaces/ICredentials";

export const signIn = async (credentials: ICredentials) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      credentials
    );
    console.log(response);
    return {
      message: response.data.message,
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error) {
    console.warn("Error al iniciar sesión:", error);
    return null;
  }
};
