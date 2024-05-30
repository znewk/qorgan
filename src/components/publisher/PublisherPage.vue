<template>
    <div class="subContainer">
        <div class="pageTitle">
            <span class="pageTitleValues">{{$t('publisherLayout.title')}}</span>
        </div>

        <div class="importSide">
            <button class="button" @click="visible = !visible">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.49999 2C8.9142 2 9.24999 2.33579 9.24999 2.75V7.25H13.75C14.1642 7.25 14.5 7.58579 14.5 8C14.5 8.41422 14.1642 8.75 13.75 8.75H9.24999V13.25C9.24999 13.6642 8.9142 14 8.49999 14C8.08578 14 7.74999 13.6642 7.74999 13.25V8.75H3.25C2.83579 8.75 2.5 8.41422 2.5 8C2.5 7.58579 2.83579 7.25 3.25 7.25H7.74999V2.75C7.74999 2.33579 8.08578 2 8.49999 2Z" fill="white"/>
                </svg>
                <span>{{$t('tables.create')}}</span>
            </button>

            <button class="button red" @click="deleteSelectedPublishers" style="margin-left: 10px;">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8723 17.8464H6.21209C5.88397 17.8464 5.56929 17.716 5.33728 17.484C5.10526 17.252 4.97491 16.9373 4.97491 16.6092V5.47461H16.1095V16.6092C16.1095 16.9373 15.9792 17.252 15.7472 17.484C15.5151 17.716 15.2005 17.8464 14.8723 17.8464Z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.68634 14.1343V9.18555" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.3978 14.1343V9.18555" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.5 5.47461H18.5833" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.3971 3H8.6856C8.35748 3 8.0428 3.13035 7.81079 3.36236C7.57877 3.59438 7.44843 3.90906 7.44843 4.23718V5.47436H13.6343V4.23718C13.6343 3.90906 13.504 3.59438 13.272 3.36236C13.0399 3.13035 12.7253 3 12.3971 3Z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <span>{{$t('tables.delete')}}</span>
            </button>
        </div>


        <div class="tableBody">
            <Loader v-if="isLoading"/>

            <DataTable v-if="!isLoading" 
            :value="publishers" 
            v-model:selection="selectedPublishers" 
            tableStyle="min-width: 50rem"  
            :paginator="true" 
            :rows="10" 
            :rowsPerPageOptions="[5, 10, 20]"
            dataKey="id" filterDisplay="row"
            removableSort
            v-model:filters="filters"
            >
            <template #empty> {{$t('tables.noData')}} </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column header="" style="width: 1%">
                    <template #body="{ data }">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="editReader(data)" class="svgEditBtn">
                            <path d="M18.3148 6.60905C18.1191 6.41422 17.8868 6.26009 17.6312 6.15556C17.3757 6.05103 17.1019 5.99818 16.8258 6.00005C16.5497 6.00192 16.2767 6.05847 16.0226 6.16645C15.7684 6.27443 15.5382 6.43169 15.3452 6.62915L7.01666 14.9577L6 18.9238L9.96612 17.9066L18.2947 9.57804C18.4922 9.38512 18.6495 9.15497 18.7575 8.90088C18.8655 8.6468 18.9221 8.37382 18.924 8.09773C18.9258 7.82165 18.873 7.54793 18.7684 7.29241C18.6638 7.03688 18.5097 6.80462 18.3148 6.60905V6.60905Z" stroke="#615E83" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </template>
                </Column>
                <Column field="name" :header="$t('tables.nameOf')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.nameOf')" />
                    </template>
                </Column>
                <Column field="country.name" :header="$t('tables.country')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.country.name }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.country')" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="visible" modal :header="$t('publisherLayout.createPublisher')" :style="{ width: '25vw' }" :draggable="false">
            <div class="inputs">
                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.nameOf')}} <span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="titleInput" :placeholder="$t('tables.nameOf')"/>
                    </div>
                   
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.country')}} <span class="blue">*</span>
                    </span>
                    <Dropdown style="width: 100%;" v-model="countryInput" editable :options="countries!" optionLabel="name" :placeholder="$t('tables.selectCountry')" class=" full-width-input" />
                </div>
            </div>

            <div class="footer">
                <button class="button decline" @click="visible = !visible">{{$t('tables.cancel')}}</button>
                <button class="button" @click="create" style="margin-left: 10px;">{{$t('tables.save')}}</button> 
            </div>
        </Dialog>

        <Dialog v-model:visible="visibleEdit" modal :header="$t('publisherLayout.editPublisher')" :style="{ width: '25vw' }" :draggable="false">
            <div class="inputs">
                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.nameOf')}} <span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="titleInputToEdit" :placeholder="$t('tables.nameOf')"/>
                    </div>
                   
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.country')}} <span class="blue">*</span>
                    </span>
                    <Dropdown style="width: 100%;" v-model="countryInputToEdit" editable :options="countries!" optionLabel="name" :placeholder="$t('tables.selectCountry')" class=" full-width-input" />
                </div>
            </div>

            <div class="footer">
                <button class="button decline" @click="visibleEdit = !visibleEdit">{{$t('tables.cancel')}}</button>
                <button class="button" @click="sendEditPublisher" style="margin-left: 10px;">{{$t('tables.save')}}</button> 
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputMask from 'primevue/inputmask';
import { Ref, ref, onBeforeMount } from 'vue';
import { useCountriesStore } from '@/stores/countriesStore';
import { usePublisherStore } from '@/stores/publisherStore';
import { Country } from '@/models/countries';
import { Publisher } from '@/models/books';
import Loader from '../common/Loader.vue';
import { useToast } from "vue-toastification";
import { FilterMatchMode } from 'primevue/api';
import { tr } from 'date-fns/locale';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const toast = useToast();
const countriesStore = useCountriesStore()
const publisherStore = usePublisherStore()

const isLoading: Ref<boolean> = ref(true)
const visible: Ref<boolean> = ref(false);
const visibleEdit: Ref<boolean> = ref(false);

const publishers: Ref<Publisher[] | null> = ref(null)

const countries: Ref<Country[] | null> = ref(null)
const countryInput: Ref<Country | null> = ref({
            "id": "bb364100-f56e-4021-a264-a0b9a0b3af80",
            "iso": "KZ",
            "name": "KAZAKHSTAN",
            "nicename": "Kazakhstan",
            "iso3": "KAZ",
            "numcode": 398,
            "phonecode": 7
        })
const titleInput: Ref<string> = ref('')

const selectedPublishers: Ref<Publisher[] | null> = ref(null)
const deleteSelectedBooks = () => {

};
const countryInputToEdit: Ref<Country | null> = ref({
            "id": "bb364100-f56e-4021-a264-a0b9a0b3af80",
            "iso": "KZ",
            "name": "KAZAKHSTAN",
            "nicename": "Kazakhstan",
            "iso3": "KAZ",
            "numcode": 398,
            "phonecode": 7
        })
const titleInputToEdit: Ref<string> = ref('')
const idToEdit: Ref<string> = ref('')


const loadPublishers = async () => {
    isLoading.value = true
    await publisherStore.fetchPublishers()
    publishers.value = publisherStore.getPublishersList

    isLoading.value = false
}
onBeforeMount(async()=>{
    await countriesStore.fetchCountries()
    await loadPublishers()

    countries.value = countriesStore.getCountriesList
    
    isLoading.value = false
})


const editReader = (reader: any) => {
    idToEdit.value = reader.id
    titleInputToEdit.value = reader.name
    countryInputToEdit.value = reader.country

    visibleEdit.value = true
};

const sendEditPublisher = async () => {
    if(titleInputToEdit.value.length == 0 || countryInputToEdit.value == null){
        toast.warning(t('others.inputAll'))
    } else {
        const data = {
            id: idToEdit.value,
            country: {id: countryInputToEdit.value.id},
            name: titleInputToEdit.value
        }

        await publisherStore.fetchCreatePublisher(data)
        toast.success(t('others.succesfullyAdded'))
        await loadPublishers()
    }
    visibleEdit.value = !visibleEdit
}
const create = async () => {
    if(titleInput.value.length == 0 || countryInput.value == null){
        toast.warning(t('others.inputAll'))
    } else {
        const data = {
            country: {id: countryInput.value.id},
            name: titleInput.value
        }

        await publisherStore.fetchCreatePublisher(data)
        titleInput.value = ''
        toast.success(t('others.succesfullyAdded'))
        visible.value = !visible
        await loadPublishers()
    }
    
}

const filters = ref({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'country.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const deleteSelectedPublishers = async () => {
  if(selectedPublishers.value?.length! <= 0 || selectedPublishers.value == null){
    toast.warning(t('others.notSelected'))
  } else {
    const selectedIds = selectedPublishers.value.map(publisher => publisher.id)

    await publisherStore.fetchDeletePublisher(selectedIds)
    await loadPublishers()
    selectedPublishers.value = []
  }
}
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
    display: flex;
}
.inputs{
    width: 100%;
}
.button{
    background-color: #0165E1;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.button > span {
    margin-left: 5px;
}

.svgEditBtn{
    cursor: pointer;
}

.tableBody{
    border: 1px solid #DEE2E6;
    border-radius: 15px;
    padding: 10px;
}

.footer{

    box-sizing: border-box;

    display: flex;
    justify-content: flex-end;
}
.title{
    margin: 0;
    font-size: 18px;
    font-family: "Inter Bold"
}

.button{
    background-color: #0165E1;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.decline{
    color: black;
    background-color: #F8F9FA;
    bottom: 1px solid #d9dcdf;
}
.item{
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}
.itemTitle{
    font-family: "Inter Bold";
    font-size: 14px;
    margin-bottom: 5px;
}
.blue{
    color: #0165E1;
    font-size: 16px;
}
.red {
    background-color: #FD5D5D;
}
.full-width-input {
  width: 100%;
}

</style>