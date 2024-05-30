import { defineStore } from "pinia";
import { api } from "@/services/api/AppApi";
import { useToast } from "vue-toastification";
import { Country } from "@/models/countries";
import { Category } from "@/models/categories";
import { i18n } from "@/main"; // Импортируем экземпляр i18n
const toast = useToast();

export const useCategoriesStore = defineStore({
  id: "categories",
  state: () => ({
    categories: null as Category[] | null
  }),
  actions: {
    async fetchCategories() {
      try {
        const response = await api.CategoriesApi.getCategories();
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.categories = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },

    async fetachCreateCategory(creds: any) {
      try {
        await api.CategoriesApi.createCategory(creds)
      } catch (error: any) {
        toast.error(error.message);
      }
    },

    async fetchDeleteCategory(ids: string[]){
      try {
        const queryParams = JSON.stringify(ids.map(id => id));
        const encodedParams = encodeURIComponent(queryParams);

        await api.CategoriesApi.deleteCategory(encodedParams);
        toast.success(i18n.global.t('others.succesfullyAdded'))
      } catch (error: any) {
        toast.error(i18n.global.t('others.error1') + `\n${error.message}`);
      }
    },
  },
  getters: {
    getCategoriesList: (state) => state.categories,
  },
});
