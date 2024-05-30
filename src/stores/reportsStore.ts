import { defineStore } from "pinia";
import { api } from "@/services/api/AppApi";
import { useToast } from "vue-toastification";

import { AvailabilityReport, MovementReport } from "@/models/reports";
import { i18n } from "@/main"; // Импортируем экземпляр i18n
const toast = useToast();

export const useReportsStore = defineStore({
  id: "report",
  state: () => ({
    availability: null as AvailabilityReport[] | null,
    movement: null as MovementReport[] | null,
  }),
  actions: {
    async fetchAvailability() {
      try {
        const queryParams = {
            sort: [],
            filters: [],
            global_search: "",
            per_page: 10000,
            page: 1
        };
          
        const encodedParams = encodeURIComponent(JSON.stringify(queryParams));
        const response = await api.ReportsApi.getAvailability(encodedParams);
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.availability = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },

    async fetchMovement() {
        try {
          const queryParams = {
              sort: [],
              filters: [],
              global_search: "",
              per_page: 10000,
              page: 1
          };
            
          const encodedParams = encodeURIComponent(JSON.stringify(queryParams));
          const response = await api.ReportsApi.getMovement(encodedParams);
          
          console.log(response)
          
          if (response == null) {
            toast.error(i18n.global.t('others.error'));
          } else {
            this.movement = response.data
          }
          
        } catch (error: any) {
          toast.error(error.message);
        }
      },
  },
  getters: {
    getAvailability: (state) => state.availability!,
    getMovement: (state) => state.movement,
  },
});
