
import { requests } from "./BaseApi";
import { EatsGroups, createEatsGroupsModel } from "@/models/eatsGroups";

var methodName = 'eats-groups';

export const EatsGroupsApi = {
    getEatsGroups: (queryParams: any) => requests.get<EatsGroups[]>(methodName, { queryParams: encodeURIComponent(JSON.stringify(queryParams)) }),
    getEatsGroupById: (id: string) => requests.get<EatsGroups[]>(methodName + id),
    createEatsGroup: (data: createEatsGroupsModel) => requests.post<createEatsGroupsModel[]>(methodName, data),
    editEatsGroup: (data: createEatsGroupsModel) => requests.post<createEatsGroupsModel>(methodName, data),
    deleteEatsGroup: (encodedParams: string) => requests.delete<any>(methodName + `?queryParams=${encodedParams}`),
    getEatsMonitoringDatat: (queryParams: any) => requests.get<any>('eats-mon-pers', { queryParams: encodeURIComponent(JSON.stringify(queryParams)) }),
    getEatsDevices: (queryParams: any) => requests.get<any>('/device', { queryParams: encodeURIComponent(JSON.stringify(queryParams)) }),
    getEatsMonitoringPersData: (id: number) => requests.get<any>(`eats-mon-pers-details/dep-group-persons?groupId=${id}&selectMode=1`),
    verifyPerson: (queryParams: any) => requests.get<any>(`/eats-persons-verif`,  {queryParams: encodeURIComponent(JSON.stringify(queryParams))}),
    eatsCurrentGroups: (queryString: string) => requests.get<any>(`/eats-groups-persons/dep-group-persons${queryString}`),
    eatsAllGroups: (queryString: string) => requests.get<any>(`/eats-groups-persons/dep-group-persons${queryString}`),
    eatsLastsPersons: (queryParams: any) => requests.get<any>(`/eats-facts-persons/top3`,  {queryParams: encodeURIComponent(JSON.stringify(queryParams))}),
    eatsListPersons: (queryParams: any) => requests.get<any>(`/eats-facts-persons/person-list`,  {queryParams: encodeURIComponent(JSON.stringify(queryParams))}),
    eatsListLastsPersons: (queryParams: any) => requests.get<any>(`/eats-facts-pers-otsut`,  {queryParams: encodeURIComponent(JSON.stringify(queryParams))}),
    eatsGroupsPersonsDto: (data: any) => requests.post<any>('/eats-groups/persons', data),
    eatsGroupsPersonAcceptDecline: (data: any) => requests.post<any>('/eats-facts-persons', data),
};
