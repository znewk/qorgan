export interface Country {
    id: string,
    iso: string,
    name: string,
    nicename: string,
    iso3: string,
    numcode: number,
    phonecode: number
}

export interface Publisher {
    id: string,
    name: string,
    country: Country
}