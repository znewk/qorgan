export interface EatsGroups {
    id: string,
    groupName: string,
    groupDate: string,
    graph: string,
    departmentName: string,
    personCount: number,
    status: number,
    isCurrent: number
}


export interface createEatsGroupsModel {
    author: string,
    dateCreate: string,
    dateFinish: string,
    dateStart: string,
    dateUpdate: string,
    description: string,
    editor: string,
    graphEndTime: string,
    graphStartTime: string,
    name: string,
    status: number
}

export interface eatsMonitoringData {
    id: string,
    groupId: number,
    planCount: number,
    factCount: number,
    dateCreate: string,
    otsutCount: number
}

export interface monPersonsInterface {
    id: string,
    groupId: number,
    fio: string,
    depId: string,
    dateCreate: string,
    planPers: string,
    departmentName: string,
    status: number
}

export interface eatsMonitoringPersData {
    id: string,
    name: string,
    fio: string,
    persons: any[],
    monPersons: any[]
}

export interface eatsCurrentGroupsPerson {
    id: string,
    depId: string,
    eatsGroupId: number,
    fio: string,
    departmentName: string
}

export interface eatsCurrentGroupsArray {
    id: string,
    name: string,
    persons: eatsCurrentGroupsPerson[]
} 

export interface eatsLastsPersons {
    id: number,
    groupName: string,
    fio: string,
    departmentName: string,
    factDate: string
}
export interface eatsLastsPersonsDataModel{
    data: eatsLastsPersons [],
    total: number
}

export interface eatsListPersons {
    id: number,
    groupName: string,
    fio: string,
    departmentName: string,
    factDate: string,
    eatsGroupsId: string,
    depId: string,
    personId: string,
    found: number,
    again: number
}

export interface eatsListPersonsDataModel{
    data: eatsListPersons [],
    total: number
}

export interface eatsGroupPerson {
    id: string,
    eventTime: string,
    fio: string,
    iin: number,
    division_id: string,
    division: string,
    groupName: string,
    identification: string,
    found: number,
    photo: string
}

export interface Device {
    id: string,
    hardNumber: number,
    ipAddr: string,
    name: string,
    netMask: string,
    macAddress: string,
    isRemovedText: string,
    accessZone1: string,
    accessZone2: string
}