/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ICredentials } from "@/interfaces/ICredentials";
import { IUser } from "@/interfaces/IUser";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { IRegisterUser } from "@/interfaces/IRegisterUser";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (credentials: ICredentials) => Promise<{ success: boolean, message: string } | undefined>;
  register: (form: IRegisterUser) => Promise<{ success: boolean, message: string } | undefined>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedUser = Cookies.get("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error al parsear el usuario de la cookie", e);
      }
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-blue-500"></div>
      </div>
    );
  }
  

  const login = async (credentials: ICredentials): Promise<{ success: boolean, message: string } | undefined> => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        credentials
      );
  
      if (!response.data || !response.data.token || !response.data.user) {
        return { success: false, message: "Credenciales incorrectas o respuesta inválida del servidor"}
      }

      Cookies.set("token", response.data.token, {
        expires: 7,
        sameSite: "Lax",
      });
  
      Cookies.set("user", JSON.stringify(response.data.user), {
        expires: 7,
        sameSite: "Lax",
      });
      
      setToken(response.data.token);
      setUser(response.data.user);
  
      return { success: true, message: `¡Bienvenido/a, ${response.data.user.name}!` };

    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
    
      const translatedErrors: Record<string, string> = {
        "User not found": "Email no registrado.",
        "Invalid email or password.": "Email o contraseña incorrectos",
      };
    
      const message = translatedErrors[errMsg] || "Error al iniciar sesión";
      return { success: false, message};
    }
    
  };
  const register = async (form: IRegisterUser): Promise<{ success: boolean, message: string } | undefined> => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        form
      );
      return { success: true, message: `¡Registro exitoso!` };

    } catch (error: any) {
      const errMsg = error?.response?.data?.message;
    
      const translatedErrors: Record<string, string> = {
        "Email already in use.": "El email ya se encuentra registrado",
        "Passwords does not match": "Las contraseñas no coinciden",
        "Role not found": "Error inesperado al registrar el usuario",
        "Inesperated error": "Error inesperado al registrar el usuario",
      };
    
      const message = translatedErrors[errMsg] || "Error al registrar el usuario";
      return { success: false, message};
    }
    
  };
  

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
