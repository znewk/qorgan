import { Book, GivenBook, AvBook } from "@/models/books";
import { requests } from "./BaseApi";

export const BooksApi = {
    getBooks: (queryParams: any) => requests.get<Book[]>('/lib-books',  {queryParams: encodeURIComponent(JSON.stringify(queryParams))}),
    getBookById: (id: any) => requests.get<Book[]>(`/lib-books/${id}`),
    createBook: (data: any) => requests.post<Book[]>('/lib-books',  data),
    deleteBook: (encodedParams: string) => requests.delete<any>(`lib-books?queryParams=${encodedParams}`),
    getGivenToPersonBooks: (queryString: string) => requests.get<GivenBook[]>(`/lib-books/given-to-person?${queryString}`),
    getAvBooks: (queryString: string) => requests.get<AvBook[]>(`/lib-av-books?${queryString}`),
    giveBook: (queryString: string) => requests.get<any>(`/lib-books/operate-books?${queryString}`),
    returnBooks: (queryString: string) => requests.get<any>(`/lib-books/operate-books?${queryString}`),
    getDocsTrans: (queryString: string) => requests.get<any>(`/lib-books/trans-docs?${queryString}`),
};
