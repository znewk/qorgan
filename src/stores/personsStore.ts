import { defineStore } from "pinia";
import { api } from "@/services/api/AppApi";
import { useTokenStore } from "./tokenStore";
import router from "@/router";
import { useToast } from "vue-toastification";
import { Person } from "@/models/persons";
import { i18n } from "@/main"; // Импортируем экземпляр i18n
const toast = useToast();

export const usePersonsStore = defineStore({
  id: "perosns",
  state: () => ({
    persons: null as Person[] | null,
    personToEditId: null as string | null,
    personToEdit: null as Person | null,
    editPersonShow: false,
    persofVerif: null as Person[] | null
  }),
  actions: {
    async fetchPersons() {
      try {
        const response = await api.PersonsApi.getPersons({
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
          this.persons = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchVerifPerson() {
      try {
        const response = await api.PersonsApi.verifyPerson({
            sort: [],
            filters: [],
            global_search: "",
            per_page: 10000,
            page: 1
          });
        
        console.log(response)
        
        
        this.persofVerif = response.data
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchPersonToEdit(id: string) {
      try {
        const response = await api.PersonsApi.getPersonById(this.personToEditId);
        
        console.log('person uploaded')
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.personToEdit = response.data[0]
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    setEditPersonShow (value: boolean, id: any){
      this.personToEditId = id
      this.editPersonShow = value
    },
  },
  getters: {
    getPersonsList: (state) => state.persons,
    getPersonToEdit: (state) => state.personToEdit,
    getEditPersonShowState: (state) => state.editPersonShow,
    getPersonBookId: (state) => state.personToEditId,
    getVerifPerson: (state) => state.persofVerif,
  },
});
