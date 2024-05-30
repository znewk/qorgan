import { defineStore } from "pinia";
import { api } from "@/services/api/AppApi";
import { useToast } from "vue-toastification";
import { Country } from "@/models/countries";
import { i18n } from "@/main"; // Импортируем экземпляр i18n
const toast = useToast();

export const useCountriesStore = defineStore({
  id: "countries",
  state: () => ({
    countries: null as Country[] | null
  }),
  actions: {
    async fetchCountries() {
      try {
        const response = await api.CountriesApi.getCountries();
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.countries = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  },
  getters: {
    getCountriesList: (state) => state.countries,
  },
});
