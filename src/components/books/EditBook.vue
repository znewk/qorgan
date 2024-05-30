<template>
    <div class="container" :style="show ? 'right: 0;' : 'right: -100%;'">
        <div>
            <div class="header">
                <h1 class="title">{{$t('booksLayout.bookEditing')}}</h1>
            </div>

            <div class="columns">
                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.nameOf')}} <span class="blue">*</span>
                    </span>
                    <InputText type="text" v-model="title" :placeholder="$t('tables.nameOf')"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.author')}} <span class="blue">*</span>
                    </span>
                    <MultiSelect v-model="selectedAuthors" :options="authors!" filter display="chip" optionLabel="fio" :placeholder="$t('tables.selectAuthor')" :maxSelectedLabels="10" class="" />
                    <span class="blue" style="cursor: pointer; font-size: 12px; margin-top: 5px;" @click="setVisibleAuthorModal">Добавить нового автора</span>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{ $t('tables.yearPublished') }} <span class="blue">*</span>
                    </span>
                    <InputNumber v-model="yearPublished" inputId="integeronly" :useGrouping="false" :placeholder="$t('tables.yearPublished')"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.annotation')}} <span class="blue">*</span>
                    </span>
                    <InputText type="text" v-model="annotation" :placeholder="$t('tables.annotation')"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.summary')}} <span class="blue">*</span>
                    </span>
                    <InputText type="text" v-model="summary" :placeholder="$t('tables.summary')"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.codeISBN')}} <span class="blue">*</span>
                    </span>
                    <InputText type="text" v-model="isbn" :placeholder="$t('tables.codeISBN')"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.description')}} <span class="blue">*</span>
                    </span>
                    <InputText type="text" v-model="description" :placeholder="$t('tables.description')"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.copiesCount')}} <span class="blue">*</span>
                    </span>
                    <InputNumber v-model="totalCopies" inputId="integeronly" :useGrouping="false" :placeholder="$t('tables.copiesCount')"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.publisher')}} <span class="blue">*</span>
                    </span>
                    <MultiSelect v-model="selcctedPublishers" :options="publisher!" filter optionLabel="name" :placeholder="$t('tables.selectPublisher') " :maxSelectedLabels="1" class="" />
                    <span class="blue" style="cursor: pointer; font-size: 12px; margin-top: 5px;" @click="setVisiblePublsiher">{{$t('publisherLayout.createNewPublisher')}}</span>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.barcode')}} <span class="blue">*</span>
                    </span>
                    <InputText type="text" v-model="barcodeNumber" :placeholder="$t('tables.barcode')"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.category')}} <span class="blue">*</span>
                    </span>
                    <MultiSelect v-model="selectedCategories" :options="categories!" filter optionLabel="name" :placeholder="$t('tables.selectCategory')" :maxSelectedLabels="10" class="" />
                    <span class="blue" style="cursor: pointer; font-size: 12px; margin-top: 5px;" @click="setVisibleCategory">{{$t('categoriesLayout.createNewCategory')}}</span>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{ $t('groupsLayout.title') }} <span class="blue">*</span>
                    </span>
                    <MultiSelect v-model="selectedGroups" :options="groups!" filter optionLabel="name" :placeholder="$t('tables.selectGroup')" :maxSelectedLabels="10" class="" />
                    <span class="blue" style="cursor: pointer; font-size: 12px; margin-top: 5px;" @click="setVisibleGroups">{{$t('groupsLayout.createNewGroup')}}</span>
                </div>
                
                <div class="item">
                    <span class="itemTitle">
                        {{$t('tables.preview')}} <span class="blue">*</span>
                    </span>
                    <FileUpload mode="basic" :auto="true"  accept="image/*" customUpload @uploader="handleFileUpload" 
                        :chooseLabel="uploadSucces ? $t('tables.successLoad') :$t('tables.selectPreview')"
                        :uploadLabel="$t('tables.upload')"
                        :cancelLabel="$t('tables.save')"
                    />
                </div>
            </div>
        </div>
        
        <div class="footer">
            <button class="button decline" @click="showHook">{{$t('tables.cancel')}}</button>
            <button class="button" @click="create">{{$t('tables.save')}}</button> 
        </div>
    </div>

       
</template>

<script setup lang="ts">
import { Ref, ref, defineProps, onBeforeMount, watch, onMounted, onBeforeUpdate, toRefs, onUpdated } from 'vue';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import { useBooksStore } from '@/stores/booksStore';
import { Author, Book, Publisher } from '@/models/books';
import { Category } from '@/models/categories';
import { Group } from '@/models/groups';
import { useToast } from "vue-toastification";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const toast = useToast();


const booksStore = useBooksStore()

const { show, showHook, loadBooks, bookToEditId, publisher, categories, authors, groups,
    setVisibleAuthorModal,
    setVisiblePublsiher,
    setVisibleCategory,
    setVisibleGroups
} = defineProps([
    'show', 'showHook', 'loadBooks', 'bookToEditId', 'publisher', 'categories', 'authors', 'groups',
    'setVisibleAuthorModal',
    'setVisiblePublsiher',
    'setVisibleCategory',
    'setVisibleGroups'
]);

const title: Ref<string> = ref('')
const selectedAuthors: Ref<Author[] | any[]> = ref([])
const summary: Ref<string> = ref('')
const selcctedPublishers: Ref<Publisher | any> = ref([])
const yearPublished: Ref<number | null> = ref(null)
const isbn: Ref<string | null> = ref(null)
const barcodeNumber: Ref<string | null> = ref(null)
const bookCover: Ref<string> = ref('')
const description: Ref<string> = ref('')
const selectedCategories: Ref<Category[] | any[]> = ref([]);
const annotation: Ref<string> = ref('')
const totalCopies: Ref<number | null> = ref(null)
const selectedGroups: Ref<Group[] | any[]> = ref([])

const book: Ref<Book | null> = ref(null)
const uploadSucces: Ref<boolean> = ref(false);

const uploadBookById = async (id: any) => {
    await booksStore.fetchBooksToEdit(bookToEditId)

    book.value = booksStore.getBooksToEdit!

    title.value = book.value.title
    selectedAuthors.value = book.value.author
    summary.value = book.value.summary
    selcctedPublishers.value = book.value.publisher
    yearPublished.value = book.value.yearPublished
    isbn.value = book.value.isbn
    barcodeNumber.value = book.value.barcodeNumber
    bookCover.value = book.value.bookCover
    description.value = book.value.description
    selectedCategories.value = book.value.category
    annotation.value = book.value.annotation
    totalCopies.value = book.value.totalCopies
    selectedGroups.value = book.value.group

    uploadSucces.value = true

    console.log(book.value)
    console.log(selcctedPublishers.value)
}

onBeforeMount(async ()=>{

})

watch(() => booksStore.getEditBookShowState, (newVal, oldVal) => {
    // console.log(booksStore.getEditBookId)
    if(newVal){
        uploadBookById(booksStore.getEditBookId)
    }
});

const onFileUploadComplete = () => {
    toast.success('Файл загружен успешно')
};

const handleFileUpload = (event: any) => {
    const file = event.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
        bookCover.value = e.target?.result as string;
    };
    reader.readAsDataURL(file)

    uploadSucces.value = true
    onFileUploadComplete()
};

const create = async () => {
    if (
        title.value.length == 0
        || selectedAuthors.value.length == 0
        || summary.value.length == 0
        || selcctedPublishers.value.length == 0
        || yearPublished.value == null || yearPublished.value <= 0
        || isbn.value == null || isbn.value.length == 0
        || barcodeNumber.value == null || barcodeNumber.value.length == 0
        || bookCover.value.length == 0
        || description.value.length == 0
        || selectedCategories.value.length == 0
        || annotation.value.length == 0
        || totalCopies.value == null || totalCopies.value <= 0
        || selectedGroups.value.length == 0
    ){
        toast.error(t('others.inputAll'))
    } else {
        const data = {
            annotation: annotation.value,
            author: selectedAuthors.value,
            barcodeNumber: barcodeNumber.value,
            bookCover: bookCover.value,
            categoryIds: selectedCategories.value.map(category => category.id),
            description: description.value,
            groupIds: selectedGroups.value.map(group => group.id),
            isbn: isbn.value,
            publisher: {id: selcctedPublishers.value.id},
            summary: summary.value,
            title: title.value,
            totalCopies: totalCopies.value,
            yearPublished: yearPublished.value,
        };

        await booksStore.fetchCreateBook(data)

        await loadBooks()
        showHook()
        toast.success(t('others.succesfullyAdded'))
    }
}
</script>

<style scoped>
.container{
    overflow-x: hidden;
    height: 100vh;
    width: 100%;
    /* background-color: white; */
    position: fixed;
    right: 0;
    top: 0;
    padding: 0 2% 0 7%;
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

.decline{
    color: black;
    background-color: white;
    bottom: 1px solid #d9dcdf;
}

.columns{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 30px 2%;
}
.item{
    width: 30%;
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
</style>    