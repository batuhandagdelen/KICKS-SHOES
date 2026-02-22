import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product, ProductValues, Response } from "../types";
import api from "./api";
import { toast } from "react-toastify";

const productService = {
  getAll: () => api.get<Response<Product[]>>("/shoes"),
  getOne: (id: string) => api.get<Response<Product>>(`/shoes/${id}`),
  delete: (id: string) => api.delete<Response<null>>(`/shoes/${id}`),
  create: (data: ProductValues) => api.post<Response<Product>>(`/shoes`, data),
  update: (id: string, data: ProductValues) =>
    api.put<Response<Product>>(`/shoes/${id}`, data),
};

// tüm ürünleri getir

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
    select: (res) => res.data.data,
  });
};

// detay sayfası için ürün getir

export const useGetProduct = (id?: string) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => productService.getOne(id!),
    select: (res) => res.data.data,
    enabled: !!id,
  });
};

// ürün sil

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      toast.success("Ürün kaldırıldı");
      // shoes sorgusunun verilerini tazeledik
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// ürün oluştur

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductValues) => productService.create(data),
    onSuccess: () => {
      toast.success("Ürün başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Bir hata oluştu");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductValues }) =>
      productService.update(id, data),
    onSuccess: () => {
      toast.success("Ürün güncellendi");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("İşlem başarısız"),
  });
};
