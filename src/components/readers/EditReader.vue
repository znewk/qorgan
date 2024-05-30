<template>
    <div class="container" :style="show ? 'right: 0;' : 'right: -100%;'">
        <div>
            <div class="header">
                <h1 class="title">{{$t('cabinetLayout.readerCard')}}</h1>
            </div>

            <div class="wrapper">
                <div class="wrapperHeader">
                    <div class="readerImage">
                        <Image src="/001.jpg" alt="Image" width="100" preview />
                    </div>
                    <div class="fios">
                        <div class="item">
                            <span class="itemTitle">{{$t('tables.lastName')}}</span>

                            <input type="text" class="disabledInput" disabled v-model="lastName">
                        </div>

                        <div class="item">
                            <span class="itemTitle">{{$t('tables.name')}}</span>

                            <input type="text" class="disabledInput" disabled v-model="firstName">
                        </div>

                        <div class="item">
                            <span class="itemTitle">{{$t('tables.middleName')}}</span>

                            <input type="text" class="disabledInput" disabled v-model="middleName">
                        </div>

                        <div class="item">
                            <span class="itemTitle">{{$t('tables.IIN')}}</span>

                            <input type="text" class="disabledInput" disabled v-model="iin">
                        </div>
                    </div>
                    
                </div>


                

                <div style="display: flex; justify-content: space-between;">
                    <div class="switcher">
                        <span @click="swithcer = true" :class="swithcer ? 'activeSwitch switchItem' : 'switchItem'">{{$t('cabinetLayout.giveBooks')}}</span>
                        <span @click="swithcer = false" :class="!swithcer ? 'activeSwitch switchItem' : 'switchItem'">{{$t('cabinetLayout.operationsHistory')}}</span>
                    </div>

                    <div class="switcher switcherTable" @click="mergeTablePDFs" v-if="!swithcer">
                        <span @click="swithcer = true" :class="'switchItem switchItemtable'">{{$t('cabinetLayout.downloadDocuments')}}</span>
                        <img src="/downloads.png" alt="download" class="download downloadTable" >
                    </div>
                </div>


                <transition>
                    <div class="tableBody" v-if="!swithcer"  >
                        <DataTable :value="docsTrans" tableStyle="min-width: 50rem" 
                        :paginator="true" 
                        :rows="10" 
                        :rowsPerPageOptions="[5, 10, 20]"
                        removableSort
                        v-model:selection="selectedTransDocsTable"
                        v-model:filters="filters"
                        dataKey="id" filterDisplay="row"
                        >
                            <template #empty> {{$t('tables.noData')}} </template>
                            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

                            <Column field="docNumber" :header="$t('cabinetLayout.documentNumber')" sortable >
                                <template #body="{ data }">
                                    {{ data.docNumber }}
                                </template>
                                <template #filter="{ filterModel, filterCallback }">
                                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('cabinetLayout.documentNumber')" />
                                </template>
                            </Column>
                           
                            <Column field="docDate" :header="$t('cabinetLayout.documentDate')" sortable >
                                <template #body="{ data }">
                                    {{ formattedDateCreate(data.docDate) }}
                                </template>
                                <template #filter="{ filterModel, filterCallback }">
                                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('cabinetLayout.documentDate')" />
                                </template>
                            </Column>

                            <Column field="author" :header="$t('cabinetLayout.ispolnitel')" sortable >
                                <template #body="{ data }">
                                    {{ data.author }}
                                </template>
                                <template #filter="{ filterModel, filterCallback }">
                                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('cabinetLayout.ispolnitel')" />
                                </template>
                            </Column>

                            <Column field="docType" :header="$t('cabinetLayout.operationType')" sortable >
                                <template #body="{ data }">
                                    {{ data.docType }}
                                </template>
                                <template #filter="{ filterModel, filterCallback }">
                                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('cabinetLayout.operationType')" />
                                </template>
                            </Column>

                            <Column field="dateCreate" :header="$t('cabinetLayout.operationDate')" sortable >
                                <template #body="{ data }">
                                    {{ formattedDateCreate(data.dateCreate) }}
                                </template>
                                <template #filter="{ filterModel, filterCallback }">
                                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('cabinetLayout.operationDate')" />
                                </template>
                            </Column>


                            <Column field="bookTitles" :header="$t('cabinetLayout.bookName')" sortable >
                                <template #body="{ data }">
                                    {{ data.bookTitles }}
                                </template>
                                <template #filter="{ filterModel, filterCallback }">
                                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" :placeholder="$t('cabinetLayout.bookName')" />
                                </template>
                            </Column>  
                        </DataTable>
                    </div>
                </transition>


                <transition>
                    <div class="booksArea" v-if="swithcer">
                    <div class="booksList">
                        <div class="booksListHeader">
                            <span class="booksListTitle">{{$t('cabinetLayout.dostupBooks')}}</span> <br>
                        </div>
                        
                        <div class="books">
                            <div class="inputBody">
                                <input type="text" class="searchInput" v-model="titleInputAv" :placeholder="$t('tables.nameOf')" @input="searchAvBooks"/>
                                <input type="text" class="searchInput" v-model="groupNamesAv" :placeholder="$t('tables.groupsName')" @input="searchAvBooks"/>
                                <input type="text" class="searchInput" v-model="isbnAv" :placeholder="$t('tables.codeISBN')" @input="searchAvBooks"/>
                                <!-- <input type="text" class="searchInput" v-model="authorFiosAv" placeholder="Авторы" @input="searchAvBooks"/> -->
                                <input type="text" class="searchInput" v-model="barcodeNumberAv" :placeholder="$t('tables.barcode')" @input="searchAvBooks"/>
                            </div>
                            
                            <div v-if="avBooks?.length == 0 ">
                                <p>{{$t('tables.noData')}}</p>
                            </div>
                            <!-- <Loader v-if="isLoadingAv"/> -->
                            <div v-for="book in filteredAvBooks" @click="selectBookToGive(book)" :class="isSelected(book.id) ? 'book activeAv' : 'book'">
                                <div class="bookLeftSide">
                                    <!-- <div class="bookCover">
                                        <img src="/image.png" alt="icon" class="coverImage">
                                    </div> -->
                                    <div class="info">
                                        <span class="bookTitle">{{ book.title }}</span>                                        
                                        <span class="bookAuthor">{{ $t('tables.groups') }}{{ `: ${book.groupNames}` }}</span>
                                        <span class="bookDate">
                                            {{$t('tables.last')}}: 
                                            <span class="undr">{{ book.avCount }}{{$t('tables.count')}}</span>
                                        </span>
                                    </div>
                                </div>

                                <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                                    @click=""
                                    class="svgEditBtn">
                                    <path d="M18.3148 6.60905C18.1191 6.41422 17.8868 6.26009 17.6312 6.15556C17.3757 6.05103 17.1019 5.99818 16.8258 6.00005C16.5497 6.00192 16.2767 6.05847 16.0226 6.16645C15.7684 6.27443 15.5382 6.43169 15.3452 6.62915L7.01666 14.9577L6 18.9238L9.96612 17.9066L18.2947 9.57804C18.4922 9.38512 18.6495 9.15497 18.7575 8.90088C18.8655 8.6468 18.9221 8.37382 18.924 8.09773C18.9258 7.82165 18.873 7.54793 18.7684 7.29241C18.6638 7.03688 18.5097 6.80462 18.3148 6.60905V6.60905Z" stroke="#615E83" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg> -->
                            </div>
                                <div class="pagination">
                                    <div class="paginationButtons">
                                        <button @click="previousPageAv" class="pageBtn">
                                            <img src="/left.png" alt="left">
                                        </button>
                                        <span class="pages">{{ currentPageAv }} из {{ totalPagesAv }}</span>
                                        <button @click="nextPageAv" class="pageBtn">
                                            <img src="/right.png" alt="right">
                                        </button>
                                    </div>
                                    <div>
                                        <select id="booksPerPageSelect" 
                                        class="perPageSelect"
                                        v-model="booksPerPageAv" 
                                        @change="onBooksPerPageChangeAv">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <!-- Другие варианты количества книг на странице -->
                                        </select>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="booksButtons">
                        <button class="booksButton" @click="showModalHook">{{$t('cabinetLayout.giveBook')}}</button> 
                        <button class="booksButton redBtn" @click="showModalReturnHook">{{$t('cabinetLayout.returnBook')}}</button>    
                    </div>
                    <div class="booksList">
                        <div class="booksListHeader">
                            <span class="booksListTitle">{{$t('cabinetLayout.poluchennye')}}</span>
                            

                            <img src="/downloads.png" alt="download" class="download" @click="mergePDFs">
                        </div>
                        <div class="books">

                            <div class="inputBody">
                                <div class="inputBody">
                                    <input type="text" class="searchInput" v-model="titleInputGiven" :placeholder="$t('tables.nameOf')" @input="searchGivenBooks"/>
                                    <input type="text" class="searchInput" v-model="groupNamesGiven" :placeholder="$t('tables.groupsName')" @input="searchGivenBooks"/>
                                    <input type="text" class="searchInput" v-model="isbnGiven" :placeholder="$t('tables.codeISBN')" @input="searchGivenBooks"/>
                                    <!-- <input type="text" class="searchInput" v-model="authorFiosGiven" placeholder="Авторы" @input="searchGivenBooks"/> -->
                                    <input type="text" class="searchInput" v-model="barcodeNumberGiven" :placeholder="$t('tables.barcode')" @input="searchGivenBooks"/>
                                </div>
                            </div>
                                <div v-if="givenToPersonBooks?.length == 0 ">
                                    <p>{{$t('tables.noData')}}</p>
                                </div>
                                <!-- <Loader v-if="isLoadingGiven"/> -->
                                <div  v-for="book in filteredGivenBooks" @click="selectBookToReturn(book)" :class="isSelectedReturnBooks(book.id) ? 'book activeReturn' : 'book'">
                                    <div class="bookLeftSide">
                                        <!-- <div class="bookCover">
                                            <img src="/image.png" alt="icon" class="coverImage">
                                        </div> -->
                                        <div class="info">
                                            <span class="bookTitle">{{ book.title }}</span>
                                            <span class="bookAuthor">{{ `Группы: ${book.groupNames}` }}</span>
                                            <span class="bookDate">
                                                {{$t('tables.returndate')}}:  
                                                <span :class="{ red: isDateInPast(book.returnDate), undr: true }">  {{ formattedDate(book.returnDate) }}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="pagination">
                                    <div class="paginationButtons">
                                        <button @click="previousPageGiven" class="pageBtn">
                                            <img src="/left.png" alt="left">
                                        </button>
                                        <span class="pages">{{ currentPageGiven }} из {{ totalPagesGiven }}</span>
                                        <button @click="nextPageGiven" class="pageBtn">
                                            <img src="/right.png" alt="right">
                                        </button>
                                    </div>
                                    <div>
                                        <select id="booksPerPageSelect" 
                                        class="perPageSelect"
                                        v-model="booksPerPageGiven" 
                                        @change="onBooksPerPageChangeGiven">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <!-- Другие варианты количества книг на странице -->
                                        </select>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                </transition>
            </div>
        </div>
        
        <div class="footer">
            <button class="button decline" @click="showHook">{{$t('tables.cancel')}}</button>
            <button class="button" @click="showHook">{{$t('tables.save')}}</button> 
        </div>

        <Dialog v-model:visible="showModal" modal :header="$t('cabinetLayout.giveBooks')" :style="{ width: '25vw'}">
            <p>{{$t('cabinetLayout.giveBookNumber')}} <b>{{ transDocNumber }}</b></p>

            <div>
                <span class="modalTitle">{{$t('cabinetLayout.selectReturnDate')}}</span>
                <Calendar v-model="date" :placeholder="$t('tables.date')" style="width: 100%;"/>
            </div>

            <div class="modalFooter">
                <button class="modalButton declinebtn" @click="showModal = !showModal">{{$t('tables.cancel')}}</button>
                <button class="modalButton" @click="giveBooks">{{$t('tables.save')}}</button>
            </div>
        </Dialog>

        <Dialog v-model:visible="showModalReturn" modal :header="$t('cabinetLayout.giveBookLibrary')" :style="{ width: '25vw'}">
            <p>{{$t('cabinetLayout.giveBookDate')}} <b>{{ transDocNumber }}</b></p>

            <div>
                <span class="modalTitle">{{$t('cabinetLayout.selectReturnDate')}}</span>
                <Calendar v-model="dateReturn" :placeholder="$t('tables.date')" style="width: 100%;"/>
            </div>

            <div class="modalFooter">
                <button class="modalButton declinebtn" @click="showModalReturn = !showModalReturn">{{$t('tables.cancel')}}</button>
                <button class="modalButton" @click="returnBooks">{{$t('cabinetLayout.return')}}</button>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref, defineProps, watch, computed } from 'vue';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';import InputText from 'primevue/inputtext';
import { useBooksStore } from '@/stores/booksStore';
import { usePersonsStore } from '@/stores/personsStore';
import { GivenBook, AvBook } from '@/models/books';
import {DocTrans} from "@/models/books"
import { useToast } from "vue-toastification";
import { Person } from '@/models/persons';
import { FilterMatchMode } from 'primevue/api';
import { PDFDocument, rgb } from 'pdf-lib';
import Image from 'primevue/image';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const toast = useToast();


const personsStore = usePersonsStore()
const booksStore = useBooksStore()

const { show, showHook, personId } = defineProps(['show', 'showHook', 'personId']);


const person: Ref<Person | null> = ref(null)
const givenToPersonBooks: Ref<GivenBook[] | null> = ref(null)
const docsTrans: Ref<DocTrans[] | null> = ref(null)
const avBooks: Ref<AvBook[] | null> = ref(null)

const currentPageAv: Ref<number> = ref(1);
const booksPerPageAv: Ref<number> = ref(5);
const totalPagesAv: Ref<number | null> = ref(0);

const currentPageGiven: Ref<number> = ref(1);
const booksPerPageGiven: Ref<number> = ref(5);
const totalPagesGiven: Ref<number | null> = ref(0);

const selectedBooksToGive: Ref<string[]> = ref([]);
const selectedBooksToReturn: Ref<string[]> = ref([])
const selectedTransDocs: Ref<string[]> = ref([])
const selectedTransDocsTable: Ref<DocTrans[]> = ref([])
const isLoadingAv: Ref<boolean> = ref(true)
const isLoadingGiven: Ref<boolean> = ref(true)

const formattedDate = (date: string) => {
    const formatted = new Date(date).toLocaleDateString("ru-RU");
    return formatted;
};

const isDateInPast = (date: string) => {
    const currentDate = new Date();
    const dateObject = new Date(date);
    return dateObject < currentDate;
};

const isSelected = (bookId: string) => {
    return selectedBooksToGive.value.includes(bookId);
};
const isSelectedReturnBooks = (bookId: string) => {
    return selectedBooksToReturn.value.includes(bookId);
};

const isSelectedTransDocs = (transId: string) => {
    return selectedTransDocs.value.includes(transId);
};

const selectBookToGive = (book: AvBook) => {
  const bookIndex = selectedBooksToGive.value?.indexOf(book.id);

  if (bookIndex === -1) {
    selectedBooksToGive.value?.push(book.id);
  } else {
    selectedBooksToGive.value?.splice(bookIndex, 1);
  }

  console.log(selectedBooksToGive.value)
}


const selectBookToReturn = (book: GivenBook) => {
    
    const bookIndex = selectedBooksToReturn.value?.indexOf(book.id);
    const transId = selectedTransDocs.value?.indexOf(book.transactionId);

    if (bookIndex === -1) {
        selectedBooksToReturn.value?.push(book.id);
    } else {
        selectedBooksToReturn.value?.splice(bookIndex, 1);
    }

    if (transId === -1) {
        selectedTransDocs.value?.push(book.transactionId);
    } else {
        selectedTransDocs.value?.splice(transId, 1);
    }

    console.log(selectedBooksToReturn.value)
    console.log(selectedTransDocs.value)
}


//SWITCHER
const swithcer: Ref<boolean> = ref(true)
//SWITCHER

//FILTER DATATABLE

const filters = ref({
    docNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    docDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    author: { value: null, matchMode: FilterMatchMode.CONTAINS },
    docType: { value: null, matchMode: FilterMatchMode.CONTAINS },
    dateCreate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    bookTitles: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
//FILTER DATATABLE

//PERSON STATES
const firstName: Ref<string> = ref('')
const lastName: Ref<string> = ref('')
const middleName: Ref<string> = ref('')
const iin: Ref<string> = ref('')
const personIdString:Ref<string> = ref('')
//PERSON STATES

//STATES TO GIVE BOOKS
const showModal: Ref<boolean> = ref(false)
const showModalReturn: Ref<boolean> = ref(false)
const showModalHook = async () => {
    if(selectedBooksToGive.value.length <= 0) {
        toast.warning(t('others.notSelected'))
    } else {
        transDocNumber.value = String(Math.round(+new Date() / 1000))
        showModal.value = true
    }
}
const showModalReturnHook = async () => {
    if(selectedBooksToReturn.value.length <= 0) {
        toast.warning(t('others.notSelected'))
    } else {
        transDocNumber.value = String(Math.round(+new Date() / 1000))
        showModalReturn.value = true
    }
}

const date:Ref<string> = ref('')
const dateReturn:Ref<string> = ref('')
const transDocNumber:Ref<string> = ref('')

const giveBooks = async () => {
    console.log(date.value)

    if(date.value == '') {
        toast.warning(t('others.selectDate'))
    } else {
        const formattedDate = new Date(date.value).toISOString().split('T')[0];

        try {
            await booksStore.fetchGiveBook(selectedBooksToGive.value, personIdString.value, formattedDate, transDocNumber.value)

            date.value = ''
            transDocNumber.value = ''

            await uploadPersonById(personsStore.getPersonBookId)

            showModal.value = false
            selectedBooksToGive.value = []
        } catch {}
    }
}
const returnBooks = async () => {

    if(dateReturn.value == '') {
        toast.warning(t('others.selectDate'))
    } else {
        const formattedDate = new Date(dateReturn.value).toISOString().split('T')[0];

        try {
            await booksStore.fetchReturnBooks(selectedBooksToReturn.value, personIdString.value, formattedDate, transDocNumber.value)

            dateReturn.value = ''

            await uploadPersonById(personsStore.getPersonBookId)

            showModalReturn.value = false

            selectedBooksToReturn.value = []
        } catch {}
    }
}
//STATES TO GIVE BOOKS


const uploadPersonById = async (id: any) => {
    await personsStore.fetchPersonToEdit(personId)


    person.value = personsStore.getPersonToEdit!

    await booksStore.fetchGivenToPersonBooks(person.value.id, null, booksPerPageAv.value, currentPageAv.value)
    await booksStore.fetchAvBooks(person.value.id, null, booksPerPageAv.value, currentPageAv.value)
    await booksStore.fetchDocsTrans(person.value.id)
    givenToPersonBooks.value = booksStore.getGivenToPersonBooksList!
    avBooks.value = booksStore.getavBooksList!
    totalPagesAv.value = Math.ceil(Number(booksStore.getavBooksTotal!) / booksPerPageAv.value)
    totalPagesGiven.value = Math.ceil(Number(booksStore.getGivenToPersonBooksTotal!) / booksPerPageGiven.value)
    docsTrans.value = booksStore.getDocsTransList!

    isLoadingAv.value = false;
    isLoadingGiven.value = false;

    firstName.value = person.value?.firstName!
    lastName.value = person.value?.lastName!
    middleName.value = person.value?.middleName!
    personIdString.value = person.value?.id
    iin.value = person.value?.iin!
    console.log(person.value)
    console.log(givenToPersonBooks.value)
}


const formattedDateCreate = (date: string) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = parsedDate.getDate().toString().padStart(2, "0");
  const hours = parsedDate.getHours().toString().padStart(2, "0");
  const minutes = parsedDate.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

//SEARCH
const searchQuery = ref(''); // Связываем поисковой запрос с инпутом
const searchQueryGiven = ref(''); // Связываем поисковой запрос с инпутом

const filteredAvBooks = computed(() => {
  return avBooks.value?.filter((book) => {
    return book.title.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});
const filteredGivenBooks = computed(() => {
  return givenToPersonBooks.value?.filter((book) => {
    return book.title.toLowerCase().includes(searchQueryGiven.value.toLowerCase());
  });
});
//SEARCH

//TRANS DOCS

async function mergePDFs() {
    if(selectedBooksToReturn.value.length == 0){
        toast.warning(t('others.notSelected'))
    } else {
        const mergedPdf = await PDFDocument.create();

        for (const pdfUrl of selectedTransDocs.value) {
            const existingPdfBytes = await fetch('/api/lib-books/previewPDF/' + pdfUrl).then((res) => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        // Отобразить объединенный PDF
        const mergedPdfFile = await mergedPdf.save();
        const mergedPdfBlob = new Blob([mergedPdfFile], { type: 'application/pdf' });
        const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);

        // Теперь mergedPdfUrl содержит URL для отображения объединенного PDF в браузере
        window.open(mergedPdfUrl);
    }
}
async function mergeTablePDFs() {
    const pdfURLs: any[] = []
    selectedTransDocsTable.value.map(doc => pdfURLs.push(doc.docId))
    if(pdfURLs.length == 0){
        toast.warning('Вы ничего не выбрали!')
    } else {
        const mergedPdf = await PDFDocument.create();

        for (const pdfUrl of pdfURLs) {
            const existingPdfBytes = await fetch('/api/lib-books/previewPDF/' + pdfUrl).then((res) => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        // Отобразить объединенный PDF
        const mergedPdfFile = await mergedPdf.save();
        const mergedPdfBlob = new Blob([mergedPdfFile], { type: 'application/pdf' });
        const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);

        // Теперь mergedPdfUrl содержит URL для отображения объединенного PDF в браузере
        window.open(mergedPdfUrl);
    }
}
//TRANS DOCS

watch(() => personsStore.getEditPersonShowState, (newVal, oldVal) => {
    // console.log(booksStore.getEditBookId)
    if(newVal == true){
        uploadPersonById(personsStore.getPersonBookId)

        
        middleName.value = person.value?.middleName!
       
    }
});


//FILTER AND SEARCHING

const titleInputAv: Ref<string> = ref('') 
const groupNamesAv: Ref<string> = ref('') 
const isbnAv: Ref<string> = ref('') 
const authorFiosAv: Ref<string> = ref('') 
const barcodeNumberAv: Ref<string> = ref('') 

const titleInputGiven: Ref<string> = ref('') 
const groupNamesGiven: Ref<string> = ref('') 
const isbnGiven: Ref<string> = ref('') 
const authorFiosGiven: Ref<string> = ref('') 
const barcodeNumberGiven: Ref<string> = ref('') 



const searchAvBooks = async () => {
    isLoadingAv.value = true;
    const data: any = [];

    const addFilter = (name: string, value: string) => {
    if (value !== "") {
        data.push({
        type: 'simple',
        name: name,
        text: value
        });
    }
    };

    addFilter('title', titleInputAv.value);
    addFilter('groupNames', groupNamesAv.value);
    addFilter('isbn', isbnAv.value);
    addFilter('authorFios', authorFiosAv.value);
    addFilter('barcodeNumber', barcodeNumberAv.value);

    await booksStore.fetchAvBooks(person.value?.id!, data, booksPerPageAv.value, currentPageAv.value)
    avBooks.value = booksStore.getavBooksList!
    totalPagesAv.value = Math.ceil(Number(booksStore.getavBooksTotal!) / booksPerPageAv.value)
    isLoadingAv.value = false;
}

const searchGivenBooks = async () => {
    const data: any = [];
    isLoadingGiven.value = true;

    const addFilter = (name: string, value: string) => {
    if (value !== "") {
        data.push({
        type: 'simple',
        name: name,
        text: value
        });
    }
    };

    addFilter('title', titleInputGiven.value);
    addFilter('groupNames', groupNamesGiven.value);
    addFilter('isbn', isbnGiven.value);
    addFilter('authorFios', authorFiosGiven.value);
    addFilter('barcodeNumber', barcodeNumberGiven.value);

    await booksStore.fetchGivenToPersonBooks(person.value?.id!, data, booksPerPageGiven.value, currentPageGiven.value)
    givenToPersonBooks.value = booksStore.getGivenToPersonBooksList!
    totalPagesGiven.value = Math.ceil(Number(booksStore.getGivenToPersonBooksTotal!) / booksPerPageGiven.value)
    isLoadingGiven.value = false;
}

//FILTER AND SEARCHING



//PAGINATION METHODS
const previousPageAv = () => {
  if (currentPageAv.value > 1) {
    currentPageAv.value--;
    searchAvBooks();
  }
};

const nextPageAv = () => {
  if (currentPageAv.value < totalPagesAv.value!) {
    currentPageAv.value++;
    searchAvBooks();
  }
};

const onBooksPerPageChangeAv = () => {
    currentPageGiven.value = 1; // Перейдите на первую страницу при изменении количества
    searchAvBooks();
};

const previousPageGiven = () => {
  if (currentPageGiven.value > 1) {
    currentPageGiven.value--;
    searchGivenBooks();
  }
};

const nextPageGiven = () => {
  if (currentPageGiven.value < totalPagesGiven.value!) {
    currentPageGiven.value++;
    searchGivenBooks();
  }
};

const onBooksPerPageChangeGiven = () => {
    currentPageGiven.value = 1; // Перейдите на первую страницу при изменении количества
    searchGivenBooks();
};
//PAGINATION METHODS 
</script>

<style scoped>
.container{
    overflow-x: auto;
    height: 100vh;
    width: 100%;
    padding: 0 2% 0 7%;
    /* background-color: white; */
    position: fixed;
    right: 0;
    top: 0;
    transition: 0.3s right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #F8F9FD;
    z-index: 5;
}
.header{
    background-color: #F8F9FD;
    padding: 30px;
    box-sizing: border-box;
    border: 1px solid #EBEEFA;
}
.footer{
    background-color: #F8F9FA;
    padding: 30px;
    box-sizing: border-box;
    border: 1px solid #EBEEFA;

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
    margin-left: 10px;
    align-items: center;
}
.red {
  color: orangered;
  margin-left: 5px;
  text-decoration: underline;
  /* display: block; */
}
.decline{
    color: black;
    background-color: white;
    bottom: 1px solid #d9dcdf;
}

.wrapper{
    padding: 30px 2%;
    height: 100%;
}
.wrapperHeader{
    border-radius: 15px;
    border: 1px solid #DEE2E6;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
.item{
    width: 19%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}
.itemTitle{
    font-family: "Inter Medium";
    font-size: 16px;
    margin-bottom: 10px;
    color: #687182;
}
.disabledInput{
    background-color: #F7F9FC;
    border: 1px solid #464F6033;
    color: #687182;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
}

.booksArea{
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.booksList{
    width: 43%;
}

.booksButtons{
    width: 10%
}
.booksListHeader{ 
    border: 1px solid #dee2e6;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 15px 15px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.download{
    height: 24px;
    widows: 24px;
    cursor: pointer;
}
.downloadTable{
    height: 16px;
    widows: 16px;
}
.booksListTitle{
    color: black;
    font-size: 18px;
    font-family: "Inter Medium";
    display: flex;
}
.booksButton{
    width: 100%;
    background-color: #0165E1;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 5px;
}
.redBtn{
    background-color: #FD5D5D;
}
.books{
    height: 45vh;
    background-color: white;
    border-radius: 0 0 15px 15px;
    border: 1px solid #dee2e6;
    border-top: none;
    overflow-y: auto;
    /* overflow-x: hidden; */
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    position: relative;
}
.book{
    width: 90%;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.3s;
}
.bookCover{
    height: 90px;
    width: 60px;
    background-color: #dee2e6;
    margin-right: 10px;
    filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.10)) drop-shadow(0px 0px 3px rgba(26, 34, 64, 0.1));
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.bookLeftSide{
    display: flex;
    align-items: center;
}
.bookTitle{
    color: #687182;
    font-family: "Inter Medium";
    display: flex;
    font-size: 18px;
    margin-bottom: 5px;
}
.bookAuthor{
    font-size: 14px;
    color: #A3AED0;
    display: block;
    margin-bottom: 5px
}
.bookDate{
    color: #687182;
    font-family: "Inter Medium";
    display: flex;
    /* text-decoration: underline; */
    margin-top: 5px;
}

.book:hover{
    background-color: #28A7E833;
    cursor: pointer;
}
.active{
    background-color: #28A7E833;
}
.modalTitle {
    display: block;
    margin-bottom: 5px
}
.modalFooter{
    margin-top: 30px;
    display: flex;
    justify-content: end;
    align-items: center;
}
.modalButton{
    background-color: #0165E1;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 10px;
    margin-left: 10px;
    cursor: pointer;
}
.declinebtn{
    background-color: #d9dcdf;
}
.coverImage{
    height: 32px;
    width: 32px;
}
.searchInput{
    background-color: #f7f9fc;
    border: 1px solid #e2e4e8;
    color: #A1A9B8;
    padding: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    width: 19%;
}
.inputBody{
    display: flex;
    align-self: flex-start;
    justify-content: space-evenly;
    background-color: white;
    margin-bottom: 15px;
    position: sticky;
    top: -10px;
    padding: 10px 0;
    box-sizing: border-box;
    z-index: 10;
    width: 100%;
}
.switcher{
    border-radius: 15px;
    border: 1px solid #DEE2E6;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: max-content;
    margin: 15px 0;
}
.switcherTable{
    padding: 5px 10px;
}

.switchItem{
    color: #868FA0;
    transition: 0.3s;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    margin: 0 5px;
    font-size: 14px;
    border: 1px solid transparent;
}
.switcherTableItem{
    margin: 0;
    margin-right: 5px;
}
.activeSwitch{
    padding: 10px;
    border: 1px solid #0165E1;
    background-color: #0165E1;
    color: white;
}

.tableBody{
    border: 1px solid #DEE2E6;
    border-radius: 15px;
    padding: 10px;
}


.activeAv, .activeAv:hover{
    background-color: #E4E82833;
}
.activeReturn, .activeReturn:hover{
    background-color: #28E85233;
}
.pagination{
    background-color: white;
    position: sticky;
    bottom: -10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5%;
    box-sizing: border-box;
}
.pageBtn{
    background-color: #0165E1;
    border: none;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
}
.paginationButtons{
    display: flex;
    align-items: center;
}
.perPageSelect{
    font-family: "Inter Regular";
    padding: 5px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    transition: 0.3s;
}
.pages{
    font-size: 14px;
    margin: 0 5px;
}
.perPageSelect:hover{
    border: 1px solid #2196f3;
}
.perPageSelect:focus{
    -webkit-box-shadow: 0px 0px 2px 3px rgba(33, 150, 243, 0.2);
    -moz-box-shadow: 0px 0px 2px 3px rgba(33, 150, 243, 0.2);
    box-shadow: 0px 0px 2px 3px rgba(33, 150, 243, 0.2);
}

.undr{
    text-decoration: underline;
    margin-left: 5px;
}

.fios{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-left: 30px;
}
/* ANIMATION */
/* .search-filters{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 3rem;
}
.search-filters > input {
    border: 1px solid #A1A9B8;
    background-color: white;
    color: #A1A9B8;
    padding: 5px;
    border-radius: 5px;
} */
/* ANIMATION */
</style>    