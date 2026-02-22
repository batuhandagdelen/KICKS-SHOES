import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  LoginFormValues,
  RegisterFormValues,
  Response,
  User,
} from "../types";
import api from "./api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
// service nesnesi içinde endpointler-gönderilen ve gelen veri tiplerini tanımla

export const authService = {
  login: (data: LoginFormValues) =>
    api.post<Response<User>>("auth/login", data),
  register: (data: RegisterFormValues) =>
    api.post<Response<User>>("auth/register", data),
  refresh: () => api.post<Response<string>>("auth/refresh"),
  logout: () => api.post<Response<undefined>>("auth/logout"),
  me: () => api.get<Response<User>>("auth/me"),
};

// login anında atılacak mutation
export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginFormValues) => authService.login(data),
    onSuccess: () => {
      navigate("/");
      toast.success("Oturum açıldı");
    },
    onError: (error: AxiosError<Response<string>>) => {
      toast.error(error.response?.data?.message || "Bir hata oluştu");
    },
  });
};

// register anında atılacak mutation

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RegisterFormValues) => authService.register(data),
    onSuccess: () => {
      toast.success("Hesabınız başarıyla oluşturuldu");
      navigate("/");
    },
    onError: (error: AxiosError<Response<string>>) => {
      toast.error(error.response?.data?.message || "Bir hata oluştu");
    },
  });
};

// profil bilgilerini alacak fonksiyon

export const useProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => authService.me(),
    select: (res) => res.data.data,
  });

  return { user: data, isLoading, error };
};

// çıkış yapma

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      navigate("/login");
      toast.warning("Oturum kapatıldı");
    },
  });
};
