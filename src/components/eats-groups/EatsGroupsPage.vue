<template>
    <div class="subContainer">
        <div class="importSide">
            <div style="display: flex; align-items: center;">
                <button class="button" @click="visible = !visible">
                    <!-- <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M8.49999 2C8.9142 2 9.24999 2.33579 9.24999 2.75V7.25H13.75C14.1642 7.25 14.5 7.58579 14.5 8C14.5 8.41422 14.1642 8.75 13.75 8.75H9.24999V13.25C9.24999 13.6642 8.9142 14 8.49999 14C8.08578 14 7.74999 13.6642 7.74999 13.25V8.75H3.25C2.83579 8.75 2.5 8.41422 2.5 8C2.5 7.58579 2.83579 7.25 3.25 7.25H7.74999V2.75C7.74999 2.33579 8.08578 2 8.49999 2Z"
                            fill="white" />
                    </svg> -->
                    <span>{{$t('tables.create')}}</span>
                </button>

                <button class="button red" @click="deleteSelectedEatsGroups" style="margin-left: 10px;">
                    <!-- <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.8723 17.8464H6.21209C5.88397 17.8464 5.56929 17.716 5.33728 17.484C5.10526 17.252 4.97491 16.9373 4.97491 16.6092V5.47461H16.1095V16.6092C16.1095 16.9373 15.9792 17.252 15.7472 17.484C15.5151 17.716 15.2005 17.8464 14.8723 17.8464Z"
                            stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.68634 14.1343V9.18555" stroke="white" stroke-width="1.3" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M12.3978 14.1343V9.18555" stroke="white" stroke-width="1.3" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M2.5 5.47461H18.5833" stroke="white" stroke-width="1.3" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M12.3971 3H8.6856C8.35748 3 8.0428 3.13035 7.81079 3.36236C7.57877 3.59438 7.44843 3.90906 7.44843 4.23718V5.47436H13.6343V4.23718C13.6343 3.90906 13.504 3.59438 13.272 3.36236C13.0399 3.13035 12.7253 3 12.3971 3Z"
                            stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg> -->

                    <span>{{$t('tables.delete')}}</span>
                </button>
            </div>
            
            <button class="button" @click="changeShowTableState(!showTable)">
                <!-- <img src="/arrow-down.png" alt="icon" class="btnIcon" :class="showTable && 'btnIconRotate'"> -->
                <span v-if="!showTable">{{$t('tables.openTable')}}</span>
                <span v-if="showTable">{{$t('tables.closeTable')}}</span>
            </button>
        </div>


        <div class="tableBody" :style="showTable ? 'display: block;' : 'display: none;'" >
            <Loader v-if="isLoading" />
            <DataTable v-if="!isLoading" :value="eatsGroups" v-model:selection="selectedEatsGroups"
                tableStyle="min-width: 50rem" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]"
                scrollable 
                :scrollHeight="'300px'"
                dataKey="id" filterDisplay="menu" removableSort v-model:filters="filters">
                <template #empty> {{$t('tables.noData')}} </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column header="" style="width: 1%">
                    <template #body="{ data }">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            @click="editEatsGroup(data)" class="svgEditBtn">
                            <path
                                d="M18.3148 6.60905C18.1191 6.41422 17.8868 6.26009 17.6312 6.15556C17.3757 6.05103 17.1019 5.99818 16.8258 6.00005C16.5497 6.00192 16.2767 6.05847 16.0226 6.16645C15.7684 6.27443 15.5382 6.43169 15.3452 6.62915L7.01666 14.9577L6 18.9238L9.96612 17.9066L18.2947 9.57804C18.4922 9.38512 18.6495 9.15497 18.7575 8.90088C18.8655 8.6468 18.9221 8.37382 18.924 8.09773C18.9258 7.82165 18.873 7.54793 18.7684 7.29241C18.6638 7.03688 18.5097 6.80462 18.3148 6.60905V6.60905Z"
                                stroke="#615E83" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </template>
                </Column>
                <Column field="groupName" :header="$t('tables.nameOf')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.groupName }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            class="p-column-filter" :placeholder="$t('tables.nameOf')" />
                    </template>
                </Column>

                <Column field="groupDate" :header="$t('tables.date')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.groupDate }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            class="p-column-filter" :placeholder="$t('tables.date')" />
                    </template>
                </Column>

                <Column field="graph" header="График" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.graph }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            class="p-column-filter" placeholder="График" />
                    </template>
                </Column>

                <Column field="departmentName" :header="$t('tables.class')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.departmentName }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            class="p-column-filter" :placeholder="$t('tables.class')" />
                    </template>
                </Column>
                
                <Column field="personCount" :header="$t('tables.peopleCount')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.personCount }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            class="p-column-filter" :placeholder=" $t('tables.peopleCount')" />
                    </template>
                </Column>

                <Column field="status" header="Статусы" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.status == 0 ? $t('tables.status1') : ''}}
                        {{ data.status == 1 ? $t('tables.status2') : '' }}
                        {{ data.status == 2 ? $t('tables.status3') : '' }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                            class="p-column-filter" placeholder="Статус" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <EditEatsGroup :isLoadingDown="isLoadingDown" 
        :group="selectedGroupToEdit" 
        :groupsCurrent="groupsCurrent" :loadCurrentGroups="loadCurrentGroups"
        :groupsAll="groupsAll" :loadAllGroups="loadAllGroups"
        :loadEatsGroups="loadEatsGroups"
        :changeShowTableState="changeShowTableState"
        :statusInput="statusInput"
        />


        <Dialog v-model:visible="visible" modal :header="$t('eatsGroupsLayout.eatsGroupCreate')" :style="{ width: '25vw' }"
            :draggable="false">
            <div class="inputs">
                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.nameOf')}} <span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="nameInput" :placeholder="$t('tables.nameOf')" />
                    </div>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.description')}} <span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="descriptionInput"
                            :placeholder="$t('tables.description')" />
                    </div>
                </div>
                <div class="item">
                    <span class="itemTitle">
                        {{$t("tables.dateStart")}}<span class="blue">*</span>
                    </span>
                    <Calendar dateFormat="yy-mm-dd" style=""  :placeholder="$t('tables.dateStart')" v-model="dateStartInput"/>
                </div>
                <div class="item">
                    <span class="itemTitle">
                        {{$t("tables.dateEnd")}}<span class="blue">*</span>
                    </span>
                    <Calendar dateFormat="yy-mm-dd"  :placeholder="$t('tables.dateEnd')" v-model="dateFinishInput"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('eatsGroupsLayout.timeStart')}}<span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <Calendar :placeholder="$t('eatsGroupsLayout.timeStart')" v-model="graphStartTimeInput" timeOnly  hourFormat="24" style="width: 100%;" />
                    </div>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('eatsGroupsLayout.timeEnd')}}<span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <Calendar :placeholder="$t('eatsGroupsLayout.timeEnd')" v-model="graphEndTimeInput" timeOnly hourFormat="24" style="width: 100%;" />
                    </div>
                </div>
                <div class="item">
                    <span class="itemTitle">
                        Статус<span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <Dropdown v-model="statusInput" :options="[
                            {name: $t('tables.status1'), code: 0},
                            {name: $t('tables.status2'), code: 1},
                            {name: $t('tables.status3'), code: 2},
                        ]" optionLabel="name" :placeholder="$t('tables.seletStatus')" class="w-full md:w-14rem" disabled  style="width: 100%;"/>    
                    </div>
                </div>

                
                
            </div>

            <div class="footer">
                <button class="button decline" @click="visible = !visible">{{$t('tables.cancel')}}</button>
                <button class="button" @click="create" style="margin-left: 10px;">{{$t('tables.save')}}</button>
            </div>
        </Dialog>

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
import { EatsGroups, } from '@/models/eatsGroups';
import { useEatsGroupsStore } from '@/stores/eatsGroupsStore';
import { useToast } from "vue-toastification";
import { FilterMatchMode } from 'primevue/api';
import { eatsCurrentGroupsArray } from '@/models/eatsGroups';
import EditEatsGroup from './EditEatsGroup/EditEatsGroup.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const eatsGroupStore = useEatsGroupsStore()
const toast = useToast();

const filters = ref({
    groupName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    departmentName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    groupDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    graph: { value: null, matchMode: FilterMatchMode.CONTAINS },
    personCount: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const isLoading: Ref<boolean> = ref(true)
const isLoadingDown: Ref<boolean> = ref(false)
const visible: Ref<boolean> = ref(false);
const visibleEdit: Ref<boolean> = ref(false);
const selectedEatsGroups: Ref<EatsGroups[] | []> = ref([])

const eatsGroups: Ref<EatsGroups[] | null> = ref(null)
const selectedGroupToEdit: Ref<EatsGroups | null> = ref(null)

const dateStartInput: Ref<string> = ref('')
const dateFinishInput: Ref<string> = ref('')
const nameInput: Ref<string> = ref('')
const graphStartTimeInput: Ref<string> = ref('')
const graphEndTimeInput: Ref<string> = ref('')
const descriptionInput: Ref<string> = ref('')
const statusInput: Ref<{name: string, code: number}> = ref({name: t('tables.status1'), code: 0})

const showTable: Ref<boolean> = ref(true)

const groupsCurrent: Ref<eatsCurrentGroupsArray[]> = ref([])
const groupsAll: Ref<eatsCurrentGroupsArray[]> = ref([])
const loadCurrentGroups = async (groupId: number) => {
    isLoadingDown.value = true
    await eatsGroupStore.fetchEatsCurrentGroups(groupId)
    groupsCurrent.value = eatsGroupStore.getEatsCurrentGroups!
    console.log('groupsCurrent', groupsCurrent.value)
    isLoadingDown.value = false
}
const loadAllGroups = async (groupId: string) => {
    isLoadingDown.value = true
    await eatsGroupStore.fetchEatsAllGroups(groupId)
    groupsAll.value = eatsGroupStore.getEatsAllGroups!
    console.log('groupsCurrent', groupsAll.value)
    isLoadingDown.value = false
}

const loadEatsGroups = async () => {
    await eatsGroupStore.fetchEatsGroups()

    eatsGroups.value = eatsGroupStore.getEatsGroupsList!
    

    isLoading.value = false
}
onBeforeMount(async () => {
    await loadEatsGroups()
})


const editEatsGroup = async (group: any) => {
    // idToEdit.value = group.id
    // dateStartInputToEdit.value = group.dateStart
    // dateFinishInputToEdit.value = group.dateFinish
    // nameInputToEdit.value = group.name
    // graphStartTimeInputToEdit.value = group.graphStartTime
    // graphEndTimeInputToEdit.value = group.graphEndTime
    // descriptionInputToEdit.value = group.description
    // statusInputToEdit.value = group.status

    // visibleEdit.value = true


    await loadCurrentGroups(group.id)
    await loadAllGroups(group.id)
    selectedGroupToEdit.value = group
    console.log('group',selectedGroupToEdit.value)
    showTable.value = false;
};
const changeShowTableState = (value: boolean) => {
    showTable.value = value;
} 



const create = async () => {
    if (nameInput.value.length == 0 || descriptionInput.value.length == 0) {
        console.log(t('others.inputAll'))
    } else {
        const formatDate = (dateString:string) => {
            const date = new Date(dateString); // Преобразуем строку в объект Date
            const year = date.getFullYear(); // Получаем год
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Получаем месяц, добавляем ведущий ноль
            const day = date.getDate().toString().padStart(2, '0'); // Получаем день, добавляем ведущий ноль

            return `${year}-${month}-${day}`; // Возвращаем в формате yyyy-mm-dd
        };

        console.log(dateStartInput.value)
        console.log(dateFinishInput.value)
        console.log(nameInput.value)
        console.log(graphStartTimeInput.value)
        console.log(graphEndTimeInput.value)
        console.log(descriptionInput.value)
        console.log(statusInput.value)


        const currentDateTime = new Date().toISOString();
        const currentDate = currentDateTime.split('T')[0]; // "YYYY-MM-DD"
        
        const dateStart = formatDate(dateStartInput.value);
        const dateFinish = formatDate(dateFinishInput.value);

        const startTime = new Date(graphStartTimeInput.value);
        const endTime = new Date(graphEndTimeInput.value);

        const formatTime = (date: any) => {
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = '00'; // Можно использовать getSeconds(), но обычно это 0

        return `${hour}:${minute}:${second}`; // Формат "HH:MM:SS"
        };

        const graphStartTime = formatTime(startTime);
        const graphEndTime = formatTime(endTime);
        const data = {
            author: "admin",
            dateCreate: currentDateTime, // "YYYY-MM-DDTHH:mm:ss.sssZ"
            dateFinish: dateFinish, // "YYYY-MM-DD"
            dateStart: dateStart, // "YYYY-MM-DD"
            dateUpdate: currentDateTime, // "YYYY-MM-DDTHH:mm:ss.sssZ"
            description: descriptionInput.value,
            editor: "admin",
            graphEndTime: graphEndTime,
            graphStartTime: graphStartTime,
            name: nameInput.value,
            status: statusInput.value.code // или statusInput.value
        };
        console.log(data)
        // Пример вызова асинхронного метода для отправки запроса
        await eatsGroupStore.fetchCreateEatsGroups(data);
        toast.success(t('others.succesfullyAdded'));
        visible.value = !visible;
        // Очистка полей после успешного создания
        dateStartInput.value = '';
        dateFinishInput.value = '';
        nameInput.value = '';
        graphStartTimeInput.value = '';
        statusInput.value = {name: t('tables.status1'), code: 0};
        descriptionInput.value = '';
        await loadEatsGroups(); // Загружаем группы после добавления

    }

}

const deleteSelectedEatsGroups = async () => {
    if (selectedEatsGroups.value?.length! <= 0 || selectedEatsGroups.value == null) {
        toast.warning(t('others.notSelected'))
    } else {
        const selectedIds = selectedEatsGroups.value.map(group => group.id)
        await eatsGroupStore.fetchDeleteEatsGroups(selectedIds)
        await loadEatsGroups()
        selectedEatsGroups.value = []
    }
}

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
    justify-content: space-between
}

.button {
    background-color: #0165E1;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
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
.btnIcon{
    width: 12px;
    height: 12px;
    transition: 0.3s;
    transform: rotate(0);
}
.btnIconRotate{
    transform: rotate(180deg);
}
</style>