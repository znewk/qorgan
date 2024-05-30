<template>
    <div class="subContainer">
        <div class="pageTitle">
            <span class="pageTitleValues">{{$t('cabinetLayout.title')}}</span>
        </div>

        <div class="importSide">
            <button class="button" @click="verify">

                <span v-if="isVerifing" class="loaderBody">
                    {{$t('tables.loading')}}

                    <img src="/loading.png" alt="loader" class="loader">
                </span>
                <span v-if="!isVerifing">
                    {{$t('cabinetLayout.scan')}}
                </span>
            </button>
        </div>


        <div class="tableBody">
            <Loader v-if="isLoading"/>
            <DataTable :value="readers" tableStyle="min-width: 50rem"  v-if="!isLoading" 
             :paginator="true" 
             :rows="10" 
             :rowsPerPageOptions="[5, 10, 20]"
             dataKey="id" filterDisplay="row"
            removableSort
            v-model:filters="filters"
             >
                <template #empty> {{$t('tables.noData')}} </template>
                <Column header="" style="width: 1%">
                    <template #body="{ data }">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                        @click="selectToEdit(data)"
                        class="svgEditBtn">
                            <path d="M18.3148 6.60905C18.1191 6.41422 17.8868 6.26009 17.6312 6.15556C17.3757 6.05103 17.1019 5.99818 16.8258 6.00005C16.5497 6.00192 16.2767 6.05847 16.0226 6.16645C15.7684 6.27443 15.5382 6.43169 15.3452 6.62915L7.01666 14.9577L6 18.9238L9.96612 17.9066L18.2947 9.57804C18.4922 9.38512 18.6495 9.15497 18.7575 8.90088C18.8655 8.6468 18.9221 8.37382 18.924 8.09773C18.9258 7.82165 18.873 7.54793 18.7684 7.29241C18.6638 7.03688 18.5097 6.80462 18.3148 6.60905V6.60905Z" stroke="#615E83" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </template>
                </Column>

                <Column field="lastName" :header="$t('tables.lastName')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.lastName }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.lastName')" />
                    </template>
                </Column>
                <Column field="firstName" :header="$t('tables.name')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.firstName }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.name')" />
                    </template>
                </Column>
                <Column field="middleName" :header="$t('tables.middleName')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.middleName }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.middleName')" />
                    </template>
                </Column>
                <Column field="cardIdentifier" :header="$t('tables.cardNumber')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.cardIdentifier }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.cardNumber')" />
                    </template>
                </Column>
                <!-- <Column field="divisionByDivisionId.name" header="Отдел" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.divisionByDivisionId.name }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Отдел" />
                    </template>
                </Column> -->
                <!-- <Column field="divisionByDivisionId.name" header="Отдел"></Column> -->

                <Column field="iin" :header="$t('tables.IIN')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.iin }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.IIN')" />
                    </template>
                </Column>
                <Column field="quantity" :header="$t('tables.jobTtitle')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.quantity }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.jobTtitle')" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <EditReader :show="showEdit" :showHook="editShowHook" :personId="personToEditId"/>
    </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputMask from 'primevue/inputmask';
import { Ref, ref, onBeforeMount } from 'vue';
import { Person } from '@/models/persons';
import { usePersonsStore } from '@/stores/personsStore';
import EditReader from './EditReader.vue';
import { useToast } from "vue-toastification";
import Loader from '../common/Loader.vue';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isLoading: Ref<boolean> = ref(true)
const isVerifing: Ref<boolean> = ref(false)
const personToEditId: Ref<string | null> = ref(null)
const personsStore = usePersonsStore()
const readers: Ref<Person[] | null> = ref(null)
const toast = useToast();

const showEdit: Ref<boolean> = ref(false)

const filters = ref({
    lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    middleName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cardIdentifier: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'divisionByDivisionId.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
    iin: { value: null, matchMode: FilterMatchMode.CONTAINS },
    quantity: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const editShowHook = () => {
    showEdit.value = !showEdit.value;
    updateBodyScrollLock();
    if(!showEdit.value){
        personsStore.setEditPersonShow(false, '')
    }
}
const updateBodyScrollLock = () => {
    if (showEdit.value) {
        document.body.style.overflow = 'hidden'; // Отключаем скролл
    } else {
        document.body.style.overflow = 'auto'; // Включаем скролл
    }
}

onBeforeMount(async () => {
    await personsStore.fetchPersons()
    readers.value = personsStore.getPersonsList!

    isLoading.value = false
})

const selectToEdit = async (data: any) => {
    personToEditId.value = data.id
    personsStore.setEditPersonShow(true, personToEditId.value)
    editShowHook()
}


//VERIF PERSON
const verifPerson: Ref<Person[] | string> = ref('')

const verify = async () => {
    try {
        isVerifing.value = true
        await personsStore.fetchVerifPerson();
        
        verifPerson.value = personsStore.getVerifPerson!

       
        if(verifPerson.value?.length == 0){
            toast.error(t('others.scanError'))
            isVerifing.value = false
        } else {
            toast.success(t('others.scanSuccess'))
            selectToEdit(verifPerson.value[0])
            isVerifing.value = false
        }
        
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}
//VERIF PERSON
</script>

<style scoped>
.subContainer{
    min-height: 100vh;
}
.pageTitleValues{
    font-size: 14px;
    font-family: "Inter Bold";
}
.importSide{
    padding: 15px;
    border: 1px solid #DEE2E6;
    border-radius: 15px;
    box-sizing: border-box;
    margin: 15px 0;
}

.button{
    background-color: #0165E1;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
}
.svgEditBtn{
    cursor: pointer;
}

.tableBody{
    border: 1px solid #DEE2E6;
    border-radius: 15px;
    padding: 10px;
}
.loaderBody{
    display: flex;
    align-items: center;
}
.loader{
    margin-left: 10px;
    animation: rotate 1s infinite;
}

@keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        95% {
            transform: rotate(360deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>