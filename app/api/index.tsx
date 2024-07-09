import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

const client = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log("error 401");
      toast({
        description: "حدث خطأ",
        variant: "destructive",
        duration: 3000,
        title: "خطأ",
      });
    }
    if (error.response.status === 403) {
      console.log("error 403");
      toast({
        description: "حدث خطأ",
        variant: "destructive",
        duration: 3000,
        title: "خطأ",
      });
    }
    if (error.response.status === 404) {
      console.log("error 404");
      toast({
        description: "حدث خطأ",
        variant: "destructive",
        duration: 3000,
        title: "خطأ",
      });
    }
    return Promise.reject(error);
  }
);
client.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const api = client;

export function getStagiaires() {
  return async () => {
    // TODO checks and params to all custom hooks

    const token = getCookie("token");
    console.log(token);
    const { data } = await api.get("/stagiaire/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };
}

export function getUsers() {
  return async () => {
    const token = getCookie("token");
    const { data } = await api.get("/auth/getUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };
}
const tokenPayload = async () => {
  const token = await getCookie("token");
  if (!token) return null;
  const payload = token?.split(".")[1];
  const decodedPayload = await atob(payload);
  const tokenPay = JSON.parse(decodedPayload);
  return tokenPay?.sub;
};
export function getCurrentUser() {
  return async () => {
    const email = await tokenPayload();
    if (!email) return null;
    const token = getCookie("token");
    const { data } = await api.get("/auth/email/" + email, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };
}
