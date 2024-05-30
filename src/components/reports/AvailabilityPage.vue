<template>
    <div class="subContainer">
        <div class="pageTitle">
            <span class="pageTitleValues">{{$t('otchet')}}</span>
        </div>

        <div class="importSide">
            <a target="_blank" href="/export/excel?viewName=v_lib_report1" style="text-decoration: none;">
                <button class="button" >
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.49999 2C8.9142 2 9.24999 2.33579 9.24999 2.75V7.25H13.75C14.1642 7.25 14.5 7.58579 14.5 8C14.5 8.41422 14.1642 8.75 13.75 8.75H9.24999V13.25C9.24999 13.6642 8.9142 14 8.49999 14C8.08578 14 7.74999 13.6642 7.74999 13.25V8.75H3.25C2.83579 8.75 2.5 8.41422 2.5 8C2.5 7.58579 2.83579 7.25 3.25 7.25H7.74999V2.75C7.74999 2.33579 8.08578 2 8.49999 2Z" fill="white"/>
                    </svg>
                    <span>Экспорт</span>
                </button>
            </a>
            
        </div>


        <div class="tableBody">

            <Loader v-if="isLoading"/>

            <DataTable 
            v-if="!isLoading"
            :value="report!" 
            v-model:filters="filters"
            tableStyle="min-width: 50rem"
            :paginator="true" :rows="10"
            :rowsPerPageOptions="[5, 10, 20]"
            dataKey="id" filterDisplay="row"
            removableSort
            >

                <template #empty> {{$t('tables.noData')}} </template>
                <Column field="title" :header="$t('tables.nameOf')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.title }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.nameOf')" />
                    </template>
                </Column>
                <Column field="author" :header="$t('tables.author')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.author}}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.author')" />
                    </template>
                </Column>
                <Column field="yearPublished" :header="$t('tables.yearPublished')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.yearPublished }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.yearPublished')" />
                    </template>
                </Column>
                <Column field="isbn" :header="$t('tables.codeISBN')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.isbn }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.codeISBN')" />
                    </template>
                </Column>
                <Column field="totalCopies" :header="$t('tables.copiesCount')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.totalCopies }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.copiesCount')" />
                    </template>
                </Column>
                <Column field="totalCopies" :header="$t('tables.dostupCount')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.curAvailability }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.dostupCount')" />
                    </template>
                </Column>

                <Column field="publisherName" :header="$t('tables.publisher')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.publisherName }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.publisher')" />
                    </template>
                </Column>

                
                <Column field="publisherName" :header="$t('tables.category')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.category }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.category')" />
                    </template>
                </Column>
            </DataTable>
        </div>

    </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputMask from 'primevue/inputmask';
import { Book } from '@/models/books';
import InputText from 'primevue/inputtext';
import { Ref, ref, onBeforeMount } from 'vue';
import { useBooksStore } from '@/stores/booksStore';
import Loader from '../common/Loader.vue';
import { useReportsStore } from '@/stores/reportsStore';
import { useToast } from "vue-toastification";
import { AvailabilityReport } from "@/models/reports"
import { FilterMatchMode } from 'primevue/api';
const toast = useToast();

const reportsStore = useReportsStore()

const isLoading: Ref<boolean> = ref(true)

const report: Ref<AvailabilityReport[] | null> = ref(null)

const filters = ref({
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    author: { value: null, matchMode: FilterMatchMode.CONTAINS },
    yearPublished: { value: null, matchMode: FilterMatchMode.CONTAINS },
    isbn: { value: null, matchMode: FilterMatchMode.CONTAINS },
    totalCopies: { value: null, matchMode: FilterMatchMode.CONTAINS },
    curAvailability: { value: null, matchMode: FilterMatchMode.CONTAINS },
    publisherName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const loadReport = async () => {
    await reportsStore.fetchAvailability()

    report.value = reportsStore.getAvailability!

    isLoading.value = false
}

onBeforeMount(async () => {
    await loadReport()
})

</script>

<style scoped>
.subContainer{
    min-height: 100vh;
    overflow-x: hidden;
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
    display: flex;
}

.button{
    background-color: #0165E1;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;

    display: flex;
    margin-right: 10px;
    align-items: center;
}
.button > span {
    margin-left: 5px;
}
.red {
    background-color: #FD5D5D;
}
.svgEditBtn{
    cursor: pointer;
}

.tableBody{
    border: 1px solid #DEE2E6;
    border-radius: 15px;
    padding: 10px;
}
</style>