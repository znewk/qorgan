<template>
    <div class="subContainer">
        <div class="pageTitle">
            <span class="pageTitleValues">{{$t('eatsMonitoringLayout.title')}}</span>
        </div>

        <div class="tableBody" style="margin-top: 15px;">
            <Loader v-if="isLoading" />
            <DataTable v-if="!isLoading" :value="eatsMonitoringData" v-model:selection="selectedEatsMonitoringData"
                tableStyle="min-width: 50rem" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]"
                scrollable scrollHeight="300px"
                dataKey="id" removableSort v-model:filters="filters"
                filterDisplay="menu"
                >
                <template #empty> {{$t('tables.noData')}} </template>
                <!-- <template #header >
                    <IconField iconPosition="left" style="display: flex; justify-content: flex-end;">
                        <InputText v-model="filters['global'].value" placeholder="Поиск" />
                    </IconField>
                </template> -->
                <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
                <Column header="" style="width: 1%">
                    <template #body="{ data }">
                        <i 
                            @click="selectRow(data)" 
                            class="pi pi-chevron-down svgEditBtn" 
                            :style="{ transform: currentSelectedId === data.id ? 'rotate(0deg)' : 'rotate(-90deg)', fontSize: '1rem' }"
                        ></i>

                        <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            @click="selectRow(data)" class="svgEditBtn">
                            <path
                                d="M18.3148 6.60905C18.1191 6.41422 17.8868 6.26009 17.6312 6.15556C17.3757 6.05103 17.1019 5.99818 16.8258 6.00005C16.5497 6.00192 16.2767 6.05847 16.0226 6.16645C15.7684 6.27443 15.5382 6.43169 15.3452 6.62915L7.01666 14.9577L6 18.9238L9.96612 17.9066L18.2947 9.57804C18.4922 9.38512 18.6495 9.15497 18.7575 8.90088C18.8655 8.6468 18.9221 8.37382 18.924 8.09773C18.9258 7.82165 18.873 7.54793 18.7684 7.29241C18.6638 7.03688 18.5097 6.80462 18.3148 6.60905V6.60905Z"
                                stroke="#615E83" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg> -->
                    </template>
                </Column>
                <Column field="dateCreate" :header="$t('tables.date')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.dateCreate.substring(0, 10) }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            class="p-column-filter" :placeholder="$t('tables.date')" />
                    </template>
                </Column>

                <Column field="planCount" :header="$t('eatsMonitoringLayout.peopleCountByPlan')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.planCount }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            class="p-column-filter" :placeholder="$t('eatsMonitoringLayout.peopleCountByPlan')" />
                    </template>
                </Column>

                <Column field="factCount" :header="$t('eatsMonitoringLayout.peopleCount')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.factCount }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            class="p-column-filter" :placeholder="$t('eatsMonitoringLayout.peopleCount')" />
                    </template>
                </Column>

                <Column field="otsutCount" :header="$t('eatsMonitoringLayout.peopleOtsut')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.otsutCount }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            class="p-column-filter" :placeholder="$t('eatsMonitoringLayout.peopleOtsut')" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- <div class="pageTitle" style="margin-top: 15px;">
            <span class="pageTitleValues">Детальный список</span>
        </div> -->

        <div class="groupsList">
            <div class="glHeader">
                <span class="glTitle">{{ $t('eatsMonitoringLayout.detailList') }}</span>
            </div>
            
            <div class="glBody">
                <div class="glBodyHeader">
                    <span style="width: 50%;">{{$t('eatsMonitoringLayout.fio')}}</span>
                    <span>Статус</span>
                </div>

                <div v-if="eatsMonitoringPersDataArray == null && !isLoadingDown && !isLoading" class="noData">
                    <span >{{$t('tables.noDataSelect')}}</span>
                </div>
                <EatsMonitoringTable v-for="item in eatsMonitoringPersDataArray" :item="item"
                    v-if="!isLoading && !isLoadingDown" 
                />
            </div>

            <Loader v-if="isLoading" />
            <Loader v-if="isLoadingDown" />
        </div>

        <!-- <div class="tableBody" style="margin-top: 15px;">
            <Loader v-if="isLoading" />
            <Loader v-if="isLoadingDown" />
            <DataTable v-if="!isLoading && !isLoadingDown" 
            :value="eatsMonitoringPersDataArray" 
            v-model:selection="selectedEatsMonitoringPersData"
            tableStyle="min-width: 50rem" 
            :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]"
            scrollable scrollHeight="500px"
            dataKey="id" removableSort 
            v-model:filters="filtersPers">
                <template #empty> Результатов не найдено. </template>
                <template #header>
                    <IconField iconPosition="left" style="display: flex; justify-content: flex-end;">
                        <InputText v-model="filtersPers['global'].value" placeholder="Поиск" />
                    </IconField>
                </template>
                <Column field="name" header="Класс/ФИО" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                </Column>
            </DataTable>
        </div> -->
    </div>
</template>

<script setup lang="ts">
    import Dropdown from 'primevue/dropdown';
    import Calendar from 'primevue/calendar';
    import DataTable from 'primevue/datatable';
    import InputText from 'primevue/inputtext';
    import Dialog from 'primevue/dialog';
    import Column from 'primevue/column';
    import InputMask from 'primevue/inputmask';
    import { Ref, ref, onBeforeMount } from 'vue';
    import Loader from '../common/Loader.vue';
    import { EatsGroups, eatsMonitoringData, eatsMonitoringPersData } from '@/models/eatsGroups';
    import { useEatsGroupsStore } from '@/stores/eatsGroupsStore';
    import EatsMonitoringTable from './EatsMonitroingTable/EatsMonitoringTable.vue'
    import { FilterMatchMode } from 'primevue/api';
    import { useToast } from 'vue-toastification';
    const eatsGroupStore = useEatsGroupsStore()
    const toast = useToast()

    const isLoading: Ref<boolean> = ref(true)
    const isLoadingDown: Ref<boolean> = ref(false)
    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        dateCreate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        planCount: { value: null, matchMode: FilterMatchMode.CONTAINS },
        factCount: { value: null, matchMode: FilterMatchMode.CONTAINS },
        otsutCount: { value: null, matchMode: FilterMatchMode.CONTAINS }    
    });
    const filtersPers = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        dateCreate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        departmentName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        fio: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.CONTAINS }    
    });

    const eatsMonitoringData: Ref<eatsMonitoringData[] | null> = ref(null)
    const selectedEatsMonitoringData: Ref<eatsMonitoringData[] | []> = ref([])

    const eatsMonitoringPersDataArray: Ref<eatsMonitoringPersData[] | null> = ref(null)
    const selectedEatsMonitoringPersData: Ref<eatsMonitoringPersData[] | []> = ref([])

    const currentSelectedId = ref<number | null>(null);

    const toggleRotation = (data: any) => {
        if (currentSelectedId.value === data.id) {
            currentSelectedId.value = null;
        } else {
            currentSelectedId.value = data.id;
        }
    };

    const selectRow = async (data: any) => {
        isLoadingDown.value = true;
        await eatsGroupStore.fetchEatsMonitoringPersData(data.groupId);
        eatsMonitoringPersDataArray.value = eatsGroupStore.getEatsMonitoringPersData!;
        isLoadingDown.value = false;

        toggleRotation(data);
    };
    const loadEatsMonitoringData = async () => {
        await eatsGroupStore.fetchEatsMonitoringData()
        // await eatsGroupStore.fetchEatsMonitoringPersData("go")

        eatsMonitoringData.value = eatsGroupStore.getEatsMonitoring!
        

        isLoading.value = false
    }
    onBeforeMount(async () => {
        await loadEatsMonitoringData()
    })

</script>

<style scoped>
.subContainer {
    min-height: 100vh;
}

.pageTitleValues {
    font-size: 14px;
    font-family: "Inter Bold";
}

.importSide {
    padding: 15px;
    border: 1px solid #DEE2E6;
    border-radius: 15px;
    box-sizing: border-box;
    margin: 15px 0;
    display: flex;
}

.button {
    background-color: #0165E1;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.button>span {
    margin-left: 5px;
}

.red {
    background-color: #FD5D5D;
}

.svgEditBtn {
    cursor: pointer;
    transform: rotate(-90deg);
}

.tableBody, .groupEdit {
    border: 1px solid #DEE2E6;
    border-radius: 15px;
    padding: 10px;
}
.groupEdit{
    margin-top: 15px
}

.footer {

    box-sizing: border-box;

    display: flex;
    justify-content: flex-end;
}

.title {
    margin: 0;
    font-size: 18px;
    font-family: "Inter Bold"
}

.decline {
    color: black;
    background-color: #F8F9FA;
    bottom: 1px solid #d9dcdf;
}

.item {
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}

.itemTitle {
    font-family: "Inter Bold";
    font-size: 14px;
    margin-bottom: 5px;
}

.blue {
    color: #0165E1;
    font-size: 16px;
}

.red {
    background-color: #FD5D5D;
}

.full-width-input {
    width: 100%;
}

.groupsList{
        border: 1px solid #dee2e6;
        /* padding: 20px; */
        box-sizing: border-box;
        border-radius: 15px 15px 0 0;
        width: 100%;
        margin-top: 30px;
        max-height: 400px;
        color: #495057;
        overflow-y: auto;
    }
    .glBodyHeader{
        border-bottom: 1px solid #dee2e6;
        border-radius: 15px 15px 0 0;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        font-family: "Inter Medium";
        background-color: #f8f9fa;
    }
    .glHeader{
        border-bottom: 1px solid #dee2e6;
        border-radius: 15px 15px 0 0;
        width: 100%;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f8f9fa;
    }

    .glTitle {
        font-size: 16px;
        font-family: "Inter Medium";
        display: flex;
    }

    .glBody{
        /* padding: 10px 20px;   */
        background-color: white;
    }
    .noData{
        padding: 50px 0;
        text-align: center;
    }
</style>