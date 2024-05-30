import { Country } from "@/models/countries";
import { requests } from "./BaseApi";

export const CountriesApi = {
    getCountries: () => requests.get<Country[]>('/lib-country/'),
};
