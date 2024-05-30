import { requests } from "./BaseApi";
import { Person } from "@/models/persons";

export const PersonsApi = {
    getPersons: (queryParams: any) => requests.get<Person[]>('/persons',  {queryParams: encodeURIComponent(JSON.stringify(queryParams))}),
    getPersonById: (id: any) => requests.get<Person[]>(`/persons/${id}`),
    verifyPerson: (queryParams: any) => requests.get<Person[]>(`/persons_verif`,  {queryParams: encodeURIComponent(JSON.stringify(queryParams))}),
}