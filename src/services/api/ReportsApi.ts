import { requests } from "./BaseApi";
import { AvailabilityReport, MovementReport } from "@/models/reports";

export const ReportsApi = {
    getAvailability: (queryParams: string) => requests.get<AvailabilityReport[]>(`v-lib-report1?queryParams=${queryParams}`),
    getMovement: (queryParams: string) => requests.get<MovementReport[]>(`v-lib-report2?queryParams=${queryParams}`),
};
