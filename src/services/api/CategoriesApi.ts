import { Category } from "@/models/categories";
import { requests } from "./BaseApi";

export const CategoriesApi = {
    getCategories: () => requests.get<Category[]>('/lib-categories/'),
    createCategory: (data: any) => requests.post<Category>('/lib-categories',  data),
    deleteCategory: (encodedParams: string) => requests.delete<any>(`lib-categories?queryParams=${encodedParams}`),
};
