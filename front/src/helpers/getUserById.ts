import axios from "axios";

export const getUserById = async (token: string, id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error)
    console.error("Error al obtener tickets:", error);
    throw error;
  }
};
