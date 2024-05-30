import { Group } from "@/models/groups";
import { requests } from "./BaseApi";

export const GroupsApi = {
    getGroups: () => requests.get<Group[]>('/lib-groups/'),
    createGroup: (data: any) => requests.post<Group>('/lib-groups',  data),
    deleteGroup: (encodedParams: string) => requests.delete<any>(`lib-groups?queryParams=${encodedParams}`),
};
