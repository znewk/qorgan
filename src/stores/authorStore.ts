import { defineStore } from "pinia";
import { api } from "@/services/api/AppApi";
import { useToast } from "vue-toastification";
import { Author, createAuthorModel } from "@/models/author";
import { i18n } from "@/main"; // Импортируем экземпляр i18n
const toast = useToast();

export const useAuthorStore = defineStore({
  id: "author",
  state: () => ({
    authors: null as Author[] | null,
    authorToEdit: null as Author | null
  }),
  actions: {
    async fecthAuthors() {
      try {
        const response = await api.AuthorApi.getAuthors({
            sort: [],
            filters: [],
            global_search: "",
            per_page: 10000,
            page: 1
          });
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.authors = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fecthAuthorById(id: string) {
      try {
        const response = await api.AuthorApi.getAuthorById(id)
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.authorToEdit = response.data[0]
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchCreateAuthor (creds: createAuthorModel) {
      try {
        const response = await api.AuthorApi.createAuthor(creds);
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchEditAuthor (creds: Author) {
      try {
        const response = await api.AuthorApi.editAuthor(creds);
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchDeleteAuthor(ids: string[]){
      try {
        const queryParams = JSON.stringify(ids.map(id => id));
        const encodedParams = encodeURIComponent(queryParams);

        await api.AuthorApi.deleteAuthor(encodedParams)

        toast.success(i18n.global.t('others.succesfullyAdded'));
      } catch (error: any) {
        toast.error(i18n.global.t('others.error1') + `\n${error.message}`);
      }
    },
  },
  getters: {
    getAuthorsList: (state) => state.authors,
    getAuthorToEdit: (state) => state.authorToEdit,
  },
});
