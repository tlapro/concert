import axios from "axios";

export const getAllTickets = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/alltickets`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener tickets:", error);
    throw error;
  }
};
