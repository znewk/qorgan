import { defineStore } from "pinia";
import { api } from "@/services/api/AppApi";
import { useToast } from "vue-toastification";
import { Country } from "@/models/countries";
import { Publisher } from "@/models/books";
import { i18n } from "@/main"; // Импортируем экземпляр i18n
const toast = useToast();

export const usePublisherStore = defineStore({
  id: "publisher",
  state: () => ({
    publishers: null as Publisher[] | null
  }),
  actions: {
    async fetchPublishers() {
      try {
        const response = await api.PublisherApi.getPublishers();
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.publishers = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },

    async fetchCreatePublisher(creds: any) {
      try {
        await api.PublisherApi.createPublisher(creds)
      } catch (error: any) {
        toast.error(error.message);
      }
    },

    async fetchDeletePublisher(ids: string[]){
      try {
        const queryParams = JSON.stringify(ids.map(id => id));
        const encodedParams = encodeURIComponent(queryParams);

        await api.PublisherApi.deletePublisher(encodedParams);
        toast.success(i18n.global.t('others.succesfullyAdded'))
      } catch (error: any) {
        toast.error(`${error.message}`);
      }
    },

  },
  getters: {
    getPublishersList: (state) => state.publishers,
  },
});
