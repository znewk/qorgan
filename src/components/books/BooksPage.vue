<template>
    <div class="subContainer">
        <div class="pageTitle">
            <span class="pageTitleValues">{{$t('booksLayout.title')}}</span>
        </div>

        <div class="importSide">
            <button class="button" @click="showHook">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.49999 2C8.9142 2 9.24999 2.33579 9.24999 2.75V7.25H13.75C14.1642 7.25 14.5 7.58579 14.5 8C14.5 8.41422 14.1642 8.75 13.75 8.75H9.24999V13.25C9.24999 13.6642 8.9142 14 8.49999 14C8.08578 14 7.74999 13.6642 7.74999 13.25V8.75H3.25C2.83579 8.75 2.5 8.41422 2.5 8C2.5 7.58579 2.83579 7.25 3.25 7.25H7.74999V2.75C7.74999 2.33579 8.08578 2 8.49999 2Z" fill="white"/>
                </svg>
                <span>{{$t('tables.create')}}</span>
            </button>

            <button class="button red" @click="deleteSelectedBooks">
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

            <DataTable :value="books" 
            v-model:selection="selectedBooks"
            v-model:filters="filters"
            tableStyle="min-width: 50rem"
            :paginator="true" :rows="10"
            :rowsPerPageOptions="[5, 10, 20]"
            v-if="!isLoading"
            dataKey="id" filterDisplay="row"
            >
                <template #empty> {{$t('tables.noData')}} </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column header="" style="width: 1%">
                    <template #body="{ data }">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svgEditBtn"
                            @click="selectToEdit(data)"
                        >
                            <path d="M18.3148 6.60905C18.1191 6.41422 17.8868 6.26009 17.6312 6.15556C17.3757 6.05103 17.1019 5.99818 16.8258 6.00005C16.5497 6.00192 16.2767 6.05847 16.0226 6.16645C15.7684 6.27443 15.5382 6.43169 15.3452 6.62915L7.01666 14.9577L6 18.9238L9.96612 17.9066L18.2947 9.57804C18.4922 9.38512 18.6495 9.15497 18.7575 8.90088C18.8655 8.6468 18.9221 8.37382 18.924 8.09773C18.9258 7.82165 18.873 7.54793 18.7684 7.29241C18.6638 7.03688 18.5097 6.80462 18.3148 6.60905V6.60905Z" stroke="#615E83" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </template>
                </Column>

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
                        {{ data.author.map((author: any) => author.fio).join(', ') }}
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
                <Column field="annotation" :header="$t('tables.annotation')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.annotation }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.annotation')" />
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
                <Column field="summary" :header="$t('tables.summary')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.summary }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.summary')" />
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
                <Column field="description" :header="$t('tables.description')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.description }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.description')" />
                    </template>
                </Column>
                <Column field="barcodeNumber" :header="$t('tables.barcode')" sortable style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.barcodeNumber }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('tables.barcode')" />
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
            </DataTable>
        </div>

        <CreateBook :show="showCreateBook" :showHook="showHook" :loadBooks="loadBooks"
            :publisher="publisher"
            :categories="categories"
            :authors="authors"
            :groups="groups"
            :setVisibleAuthorModal="setVisibleAuthorModal"
            :setVisiblePublsiher="setVisiblePublsiher"
            :setVisibleCategory="setVisibleCategory"
            :setVisibleGroups="setVisibleGroup"
        />
        <EditBook :showHook="editShowHook" :show="showEditBook" :loadBooks="loadBooks" :bookToEditId="bookToEditId"
            :publisher="publisher"
            :categories="categories"
            :authors="authors"
            :groups="groups"
            :setVisibleAuthorModal="setVisibleAuthorModal"
            :setVisiblePublsiher="setVisiblePublsiher"
            :setVisibleCategory="setVisibleCategory"
            :setVisibleGroups="setVisibleGroup"
        />

        <Dialog v-model:visible="visibleAuthorModal" modal :header="$t('authorsLayout.createAuthor')" :style="{ width: '25vw' }" :draggable="false">
            <div class="inputs">
                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.lastName')}}<span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="authorLastName" :placeholder="$t('tables.lastName')"/>
                    </div>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.name')}}<span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="authorFirstName" :placeholder="$t('tables.name')"/>
                    </div>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.middleName')}}<span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="authorFatherName" :placeholder="$t('tables.middleName')"/>
                    </div>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.birthDate')}}<span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <Calendar v-model="authorBirthDateStr" :placeholder="$t('tables.birthDate')" style="width: 100%;"/>
                    </div>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.countries')}} <span class="blue">*</span>
                    </span>
                    <Dropdown style="width: 100%;" v-model="authorCountryInput" editable :options="countries!" optionLabel="name" :placeholder="$t('tables.selectCountry')" class=" full-width-input" />
                </div>
            </div>

            <div class="footer">
                <button class="button decline" @click="setVisibleAuthorModal">{{$t('tables.cancel')}}</button>
                <button class="button" @click="create" style="margin: 0; margin-left: 10px;">{{$t('tables.save')}}</button> 
            </div>
        </Dialog> 

        <Dialog v-model:visible="visiblePublsiher" modal :header="$t('publisherLayout.createPublisher')" :style="{ width: '25vw' }" :draggable="false">
            <div class="inputs">
                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.nameOf')}} <span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="publisherTitleInput" :placeholder="$t('tables.nameOf')"/>
                    </div>
                   
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.countries')}} <span class="blue">*</span>
                    </span>
                    <Dropdown style="width: 100%;" v-model="publisherCountryInput" editable :options="countries!" optionLabel="name" :placeholder="$t('tables.selectCountry')" class=" full-width-input" />
                </div>
            </div>

            <div class="footer">
                <button class="button decline" @click="setVisiblePublsiher">{{$t('tables.cancel')}}</button>
                <button class="button" @click="createPublisher" style="margin-left: 10px;">{{$t('tables.save')}}</button> 
            </div>
        </Dialog>

        <Dialog v-model:visible="visibleCategory" modal :header="$t('categoriesLayout.createCategory')" :style="{ width: '25vw' }" :draggable="false">
            <div class="inputs">
                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.nameOf')}} <span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="categoryTitleInput" :placeholder="$t('tables.nameOf')"/>
                    </div>
                   
                </div>
                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.description')}} <span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="categoryDescriptionInput" :placeholder="$t('tables.description')"/>
                    </div>
                   
                </div>
            </div>

            <div class="footer">
                <button class="button decline" @click="setVisibleCategory">{{$t('tables.cancel')}}</button>
                <button class="button" @click="createCategory" style="margin-left: 10px;">{{$t('tables.save')}}</button> 
            </div>
        </Dialog>

        <Dialog v-model:visible="visibleGroup" modal :header="$t('groupsLayout.createGroup')" :style="{ width: '25vw' }" :draggable="false">
            <div class="inputs">
                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.nameOf')}} <span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="groupTitleInput" :placeholder="$t('tables.nameOf')"/>
                    </div>
                   
                </div>
                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.description')}} <span class="blue">*</span>
                    </span>
                    <div style="width: 100%;">
                        <InputText style="width: 100%;" type="text" v-model="groupDescriptionInput" :placeholder="$t('tables.description')"/>
                    </div>
                   
                </div>
            </div>

            <div class="footer">
                <button class="button decline" @click="setVisibleGroup">{{$t('tables.cancel')}}</button>
                <button class="button" @click="createGroup" style="margin-left: 10px;">{{$t('tables.save')}}</button> 
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputMask from 'primevue/inputmask';
import { Book } from '@/models/books';
import InputText from 'primevue/inputtext';
import { Ref, ref, onBeforeMount } from 'vue';
import CreateBook from './CreateBook.vue';
import { useBooksStore } from '@/stores/booksStore';
import Loader from '../common/Loader.vue';
import EditBook from './EditBook.vue';

import { useCountriesStore } from '@/stores/countriesStore';
import { usePublisherStore } from '@/stores/publisherStore';
import { useGroupsStore } from '@/stores/groupsStore';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { useAuthorStore } from '@/stores/authorStore';
import { Author, Publisher } from '@/models/books';
import { createAuthorModel } from '@/models/author';
import { Category } from '@/models/categories';
import { Country } from '@/models/countries';
import { Group } from '@/models/groups';
import { useToast } from "vue-toastification";
import { FilterMatchMode } from 'primevue/api';
import { usePersonsStore } from '@/stores/personsStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const toast = useToast();

const countriesStore = useCountriesStore()
const publisherStore = usePublisherStore()
const groupsStore = useGroupsStore()
const categoriesStore = useCategoriesStore()
const authorStore = useAuthorStore()
const booksStore = useBooksStore()
const personsStore = usePersonsStore()


const isLoading: Ref<boolean> = ref(true)
const showCreateBook: Ref<boolean> = ref(false)
const showEditBook: Ref<boolean> = ref(false)

const publisher: Ref<Publisher[] | null> = ref([])
const categories: Ref<Category[] | null> = ref(null)
const authors: Ref<Author[] | null> = ref(null)
const groups: Ref<Group[] | null> = ref(null)
const countries: Ref<Country[] | null | undefined> = ref(null)




//CREATE AUTHOR
const visibleAuthorModal: Ref<boolean> = ref(false)
const setVisibleAuthorModal = () => {
    visibleAuthorModal.value = !visibleAuthorModal.value

    console.log(visibleAuthorModal.value)
}

const authorLastName: Ref<string> = ref('')
const authorFirstName: Ref<string> = ref('')
const authorFatherName: Ref<string> = ref('')
const authorBirthDateStr: Ref<string> = ref('')
const authorCountryInput: Ref<Country> = ref({
    "id": "bb364100-f56e-4021-a264-a0b9a0b3af80",
    "iso": "KZ",
    "name": "KAZAKHSTAN",
    "nicename": "Kazakhstan",
    "iso3": "KAZ",
    "numcode": 398,
    "phonecode": 7
})

const create = async () => {
    if(
        authorLastName.value.length == 0
        || authorFirstName.value.length == 0
        || authorFatherName.value.length == 0
        || authorBirthDateStr.value.length == 0
        || authorCountryInput.value == null
    ) {
        toast.warning(t('others.inputAll'))
    } else {

        const data: createAuthorModel = {
            birthDate: new Date(authorBirthDateStr.value).toISOString().split('T')[0],
            country: {id: authorCountryInput.value.id},
            fatherName: authorFatherName.value,
            firstName: authorFirstName.value,
            lastName: authorLastName.value,
        }

        try {
            await authorStore.fetchCreateAuthor(data)

            toast.success(t('others.succesfullyAdded'))
            await loadData()
            authorLastName.value = ''
            authorFirstName.value = ''
            authorFatherName.value = ''
            authorBirthDateStr.value = ''
            authorCountryInput.value = {
                "id": "bb364100-f56e-4021-a264-a0b9a0b3af80",
                "iso": "KZ",
                "name": "KAZAKHSTAN",
                "nicename": "Kazakhstan",
                "iso3": "KAZ",
                "numcode": 398,
                "phonecode": 7
            }
            visibleAuthorModal.value = !visibleAuthorModal
        } catch {

        }
    }
}
//CREATE AUTHOR

//CREATE PUBLISHER
const visiblePublsiher: Ref<boolean> = ref(false)
const setVisiblePublsiher = () => {
    visiblePublsiher.value = !visiblePublsiher.value
}

const publisherTitleInput: Ref<string> = ref('')
const publisherCountryInput: Ref<Country> = ref({
    "id": "bb364100-f56e-4021-a264-a0b9a0b3af80",
    "iso": "KZ",
    "name": "KAZAKHSTAN",
    "nicename": "Kazakhstan",
    "iso3": "KAZ",
    "numcode": 398,
    "phonecode": 7
})

const createPublisher = async () => {
    if(publisherTitleInput.value.length == 0 || publisherCountryInput.value == null){
        toast.warning(t('others.inputAll'))
    } else {
        const data = {
            country: {id: publisherCountryInput.value.id},
            name: publisherTitleInput.value
        }

        await publisherStore.fetchCreatePublisher(data)
        publisherTitleInput.value = ''
        toast.success(t('others.succesfullyAdded'))
        visiblePublsiher.value = !visiblePublsiher
        await loadData()
    }
    
}
//CREATE PUBLISHER

//CREATE CATEGORY
const visibleCategory: Ref<boolean> = ref(false)
const setVisibleCategory = () => {
    visibleCategory.value = !visibleCategory.value
}

const categoryDescriptionInput: Ref<string> = ref('')
const categoryTitleInput: Ref<string> = ref('')

const createCategory = async () => {
    if(categoryTitleInput.value.length == 0 || categoryDescriptionInput.value.length == 0){
        toast.warning(t('others.inputAll'))
    } else {
        const data = {
            description: categoryDescriptionInput.value,
            name: categoryTitleInput.value
        }

        await categoriesStore.fetachCreateCategory(data)
        toast.success(t('others.succesfullyAdded'))

        categoryDescriptionInput.value = ''
        categoryTitleInput.value = ''

        visibleCategory.value = !visibleCategory
        await loadData()
        
    }
    
}
//CREATE CATEGORY

//CREATE GROUP
const visibleGroup: Ref<boolean> = ref(false)
const setVisibleGroup = () => {
    visibleGroup.value = !visibleGroup.value
}

const groupDescriptionInput: Ref<string> = ref('')
const groupTitleInput: Ref<string> = ref('')

const createGroup = async () => {
    if(groupTitleInput.value.length == 0 || groupDescriptionInput.value.length == 0){
        toast.warning(t('others.inputAll'))
    } else {
        const data = {
            description: groupDescriptionInput.value,
            name: groupTitleInput.value
        }

        await groupsStore.fetachCreateGroup(data)
        toast.success(t('others.succesfullyAdded'))
        visibleGroup.value = !visibleGroup
        groupTitleInput.value = ''
        groupDescriptionInput.value = ''
        await loadData()
        
    }
    
}
//CREATE GROUP

// EDIT BOOK
const bookToEditId: Ref<string | null> = ref(null)
const book: Ref<Book | null> = ref(null)

const editShowHook = () => {
    showEditBook.value = !showEditBook.value;
    if(!showEditBook.value){
        booksStore.setEditBookShow(false, '')
    }
}
const selectToEdit = async (data: any) => {
    bookToEditId.value = data.id
    booksStore.setEditBookShow(true, bookToEditId.value)
    editShowHook()
}
// EDIT BOOK 

const loadBooks = async () => {
    await booksStore.fetchBooks()
    books.value = booksStore.getBooksList!

    isLoading.value = false
}
const loadData = async () => {
    await countriesStore.fetchCountries()
    await publisherStore.fetchPublishers()
    await groupsStore.fetchGroups()
    await categoriesStore.fetchCategories()
    await authorStore.fecthAuthors()

    countries.value = countriesStore.getCountriesList
    publisher.value = publisherStore.getPublishersList
    groups.value = groupsStore.getGroupsList
    categories.value = categoriesStore.getCategoriesList
    authors.value = authorStore.getAuthorsList
}
const showHook = () => {
    showCreateBook.value = !showCreateBook.value;
}


const books: Ref<Book[] | null> = ref(null)

onBeforeMount(async () => {
    await loadData()
    await loadBooks()
})

const selectedBooks: Ref<Book[] | null> = ref(null)

const deleteSelectedBooks = async () => {
  if(selectedBooks.value?.length! <= 0){
    toast.warning(t('others.notSelected'))
  } else {
    // console.log(selectedBooks.value[0].id)
    const selectedIds = selectedBooks.value?.map(book => book.id)
    await booksStore.fetchDeleteBook(selectedIds!)

    await loadBooks()
    selectedBooks.value = []
  }
}


///FILTER DATATABLE

const filters = ref({
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    author: { value: null, matchMode: FilterMatchMode.CONTAINS },
    yearPublished: { value: null, matchMode: FilterMatchMode.CONTAINS },
    annotation: { value: null, matchMode: FilterMatchMode.CONTAINS },
    isbn: { value: null, matchMode: FilterMatchMode.CONTAINS },
    summary: { value: null, matchMode: FilterMatchMode.CONTAINS },
    totalCopies: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    barcodeNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    publisherName: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
//FILTER DATATABLE



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