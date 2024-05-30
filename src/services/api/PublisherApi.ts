import { Publisher } from "@/models/publisher";
import { requests } from "./BaseApi";

export const PublisherApi = {
    getPublishers: () => requests.get<Publisher[]>('/lib-publisher/'),
    createPublisher: (data: any) => requests.post<Publisher>('/lib-publisher',  data),
    deletePublisher: (encodedParams: string) => requests.delete<any>(`lib-publisher?queryParams=${encodedParams}`),
};
