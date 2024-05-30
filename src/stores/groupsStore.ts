import { defineStore } from "pinia";
import { api } from "@/services/api/AppApi";
import { useToast } from "vue-toastification";
import { Country } from "@/models/countries";
import { Group } from "@/models/groups";
import { i18n } from "@/main"; // Импортируем экземпляр i18n
const toast = useToast();

export const useGroupsStore = defineStore({
  id: "groups",
  state: () => ({
    groups: null as Group[] | null
  }),
  actions: {
    async fetchGroups() {
      try {
        const response = await api.GroupsApi.getGroups();
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.groups = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },

    async fetachCreateGroup(creds: any) {
      try {
        await api.GroupsApi.createGroup(creds)
      } catch (error: any) {
        toast.error(error.message);
      }
    },

    async fetchDeleteGroup(ids: string[]){
      try {
        const queryParams = JSON.stringify(ids.map(id => id));
        const encodedParams = encodeURIComponent(queryParams);

        await api.GroupsApi.deleteGroup(encodedParams);
        toast.success(i18n.global.t('others.succesfullyAdded'));
      } catch (error: any) {
        toast.error(`${error.message}`);
      }
    },
  },
  getters: {
    getGroupsList: (state) => state.groups,
  },
});
