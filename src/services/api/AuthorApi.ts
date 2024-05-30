import { Author, createAuthorModel } from "@/models/author";
import { requests } from "./BaseApi";

export const AuthorApi = {
    getAuthors: (queryParams: any) => requests.get<Author[]>('/lib-author',  {queryParams: encodeURIComponent(JSON.stringify(queryParams))}),
    getAuthorById: (id: string) => requests.get<Author[]>('/lib-author/' + id),
    createAuthor: (data: createAuthorModel) => requests.post<Author[]>('/lib-author',  data),
    editAuthor: (data: Author) => requests.post<Author>('/lib-author',  data),
    deleteAuthor: (encodedParams: string) => requests.delete<any>(`lib-author?queryParams=${encodedParams}`),
};
