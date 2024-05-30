export interface Author {
    id: string,
    firstName: string,
    lastName: string,
    fatherName: string,
    birthDate: string,
    dateCreate: string,
    dateUpdate: string,
    country: Country
    birthDateStr: string,
    fio: string
}

export interface createAuthorModel {
    birthDate: string,
    country: {id: string},
    fatherName: string,
    firstName: string,
    lastName: string,
} 

export interface Country {
    id: string,
    iso: string,
    name: string,
    nicename: string,
    iso3: string,
    numcode: number,
    phonecode: number
}
