import axios from "axios";

export const getAllUsers = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener users:", error);
    throw error;
  }
};
