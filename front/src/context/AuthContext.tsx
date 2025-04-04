/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { signIn } from "@/helpers/SignUser";
import { ICredentials } from "@/interfaces/ICredentials";
import { IUser } from "@/interfaces/IUser";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (credentials: ICredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [token, setToken] = useState<string | null>(null)
    useEffect(() => {
        const savedToken = Cookies.get("token");
        if (savedToken) {
            setToken(savedToken)
        }
    }, [])
    const login = async (credentials: ICredentials) => {
        try {
          const response = await signIn(credentials);
      
          if (!response || !response.token || !response.user) {
            console.warn("Credenciales incorrectas o respuesta inválida del servidor");
            return;
          }
      
          Cookies.set("token", response.token, { expires: 7, sameSite: "Lax" });
          setToken(response.token);
          setUser(response.user);
          return 'Login exitoso'
        } catch (error: any) {
          console.log("Ocurrió un error al iniciar sesión");
        }
      };
      

      const logout = () => {
        Cookies.remove("token");
        setToken(null);
        setUser(null);
      };

      return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
  };
