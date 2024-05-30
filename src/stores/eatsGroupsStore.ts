import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { EatsGroups, createEatsGroupsModel, eatsCurrentGroupsArray, 
  eatsLastsPersons, eatsListPersons, eatsMonitoringData, eatsMonitoringPersData,
  eatsListPersonsDataModel, eatsLastsPersonsDataModel, eatsGroupPerson, Device } from "@/models/eatsGroups";
import { EatsGroupsApi } from "@/services/api/EatsGroupsApi";
import { i18n } from "@/main"; // Импортируем экземпляр i18n

const toast = useToast();

export const useEatsGroupsStore = defineStore({
  id: "eat-groups",
  state: () => ({
    eatsGroups: null as EatsGroups[] | null,
    eatsGroupToEdit: null as createEatsGroupsModel | null,
    eatsMonitoringData: null as eatsMonitoringData[] | null,
    eatsMonitoringPersData: null as eatsMonitoringPersData[] | null,
    eatsPersonVerif: null as eatsGroupPerson[] | null,
    eatsCurrentGroups: null as eatsCurrentGroupsArray[] | null,
    eatsAllGroups: null as eatsCurrentGroupsArray[] | null,
    eatsLastsPersonsData: null as eatsLastsPersonsDataModel | null,
    eatsListPersonsData: null as eatsListPersonsDataModel | null,
    eatsListPersonsOtsutData: null as eatsListPersonsDataModel | null,
    eatsGroupsPersonsDtoData: null as any | null,
    eatsDevices: null as Device[] | null
  }),
  actions: {
    async fetchEatsGroups() {
      try {
        const response = await EatsGroupsApi.getEatsGroups({
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
          this.eatsGroups = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchEatsGroupsById(id: string) {
      try {
        const response = await EatsGroupsApi.getEatsGroupById(id)
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.eatsGroupToEdit = response.data[0]
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchCreateEatsGroups (creds: createEatsGroupsModel) {
      try {
        const response = await EatsGroupsApi.createEatsGroup(creds);
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchEditEatsGroups (creds: createEatsGroupsModel) {
      try {
        const response = await EatsGroupsApi.editEatsGroup(creds);
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchDeleteEatsGroups(ids: string[]){
      try {
        const queryParams = JSON.stringify(ids.map(id => id));
        const encodedParams = encodeURIComponent(queryParams);

        await EatsGroupsApi.deleteEatsGroup(encodedParams)

        toast.success(i18n.global.t('others.succesfullyAdded'));
      } catch (error: any) {
        toast.error(i18n.global.t('others.error1') + `\n${error.message}`);
      }
    },
    async fetchEatsMonitoringData() {
      try {
        const response = await EatsGroupsApi.getEatsMonitoringDatat({
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
          this.eatsMonitoringData = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchEatsMonitoringPersData(id: number) {
      try {
        const response = await EatsGroupsApi.getEatsMonitoringPersData(id);
        
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.eatsMonitoringPersData = response
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchVerifPerson(deviceId: string) {
      try {
        const response = await EatsGroupsApi.verifyPerson({
            sort: [],
            filters: [
              {
                name: "devId",
                type: "simple",
                text: deviceId
              }
            ],
            global_search: "",
            per_page: 10000,
            page: 1
          });
        
        console.log(response)
        
        
        this.eatsPersonVerif = response.data
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchEatsAllGroups(groupId: string) {
      try {
        const queryString = `?groupId=${groupId}&selectMode=0`
        const response = await EatsGroupsApi.eatsAllGroups(queryString)
        
        // console.log('fetchEatsCurrentGroups', response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.eatsAllGroups = response
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchEatsCurrentGroups(groupId: number) {
      try {
        const queryString = `?groupId=${groupId}&selectMode=1`
        const response = await EatsGroupsApi.eatsCurrentGroups(queryString)
        
        // console.log('fetchEatsCurrentGroups', response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.eatsCurrentGroups = response
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchEatsLastsPersons(page: number, deviceId: string) {
      try {
        const response = await EatsGroupsApi.eatsLastsPersons({
          sort: [],
          filters: [
            {
              name: "deviceId",
              type: "simple",
              text: deviceId
            }
          ],
          global_search: "",
          per_page: 3,
          page: page
        });
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.eatsLastsPersonsData = response
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchEatsListPersons(page: number) {
      try {
        const response = await EatsGroupsApi.eatsListPersons({
          sort: [],
          filters: [],
          global_search: "",
          per_page: 18,
          page: page
        });
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.eatsListPersonsData = response
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchEatsListOtsutPersons(page: number) {
      try {
        const response = await EatsGroupsApi.eatsListLastsPersons({
          sort: [],
          filters: [],
          global_search: "",
          per_page: 18,
          page: page
        });
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.eatsListPersonsOtsutData = response
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchEatsGroupsPersonsDto(data: any){
      try {
        const response = await EatsGroupsApi.eatsGroupsPersonsDto(data);
        console.log(response)
        
        if (response == null) {
          toast.error(i18n.global.t('others.error'));
        } else {
          this.eatsGroupsPersonsDtoData = response
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },


    async fetchEatsDevices() {
      try {
        const response = await EatsGroupsApi.getEatsDevices({
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
          this.eatsDevices = response.data
        }
        
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    async fetchPersonAcceptDecline(creds: any) {
      try {
        const response = await EatsGroupsApi.eatsGroupsPersonAcceptDecline(creds)

        console.log(response)
      } catch (error: any){
        toast.error(error.message)
      }
    }
  },
  getters: {
    getEatsGroupsList: (state) => state.eatsGroups,
    getEatsGroupsToEdit: (state) => state.eatsGroupToEdit,
    getEatsMonitoring: (state) => state.eatsMonitoringData,
    getEatsMonitoringPersData: (state) => state.eatsMonitoringPersData,
    getPersonVerif: (state) => state.eatsPersonVerif,
    getEatsCurrentGroups: (state) => state.eatsCurrentGroups,
    getEatsAllGroups: (state) => state.eatsAllGroups,
    getEatsLastsPersonsData: (state) => state.eatsLastsPersonsData,
    getEatsListPersonsData: (state) => state.eatsListPersonsData,
    getEatsListPersonsOtsutData: (state) => state.eatsListPersonsOtsutData,
    getEatsDevicesData: (state) => state.eatsDevices
  },
});
