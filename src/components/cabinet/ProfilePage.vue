<template>
    <div class="subContainer">
        <div class="pageTitle">
            <span class="pageTitleValues">{{$t('profile.title')}}</span>
        </div>

        <div class="importSide">

            <div class="info">
                <p class="title">
                    {{$t('profile.user')}}: <b>{{ user?.fullName }}</b>
                </p>
                <p class="title">
                    Логин: <b>{{ user?.username }}</b>
                </p>
                <p class="title">
                    {{$t('profile.email')}}: <b>{{ }}</b>
                </p>

                <p class="title">
                    {{$t('profile.roles')}}: 
                    <ul style="margin: 0;">
                        <li v-for="role in user?.roles">
                            <b>{{ role }}</b>
                        </li>
                    </ul>
                </p>
            </div>
            
            <button class="button red" @click="authStore.logout">
                <svg width="17" height="17" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg">
                    <g opacity="1">
                        <path d="M7.875 18.375H4.375C3.91087 18.375 3.46575 18.1906 3.13756 17.8624C2.80937 17.5342 2.625 17.0891 2.625 16.625V4.375C2.625 3.91087 2.80937 3.46575 3.13756 3.13756C3.46575 2.80937 3.91087 2.625 4.375 2.625H7.875" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 14.875L18.375 10.5L14 6.125" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.375 10.5H7.875" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                </svg>

                <span>{{$t('profile.exit')}}</span>
            </button>
        </div>

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
import { Ref, ref, onBeforeMount, defineProps } from 'vue';
import { useBooksStore } from '@/stores/booksStore';
import Loader from '../common/Loader.vue';

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
import { useAuthStore } from '@/stores/authStore'
import { User } from "@/models/account";
const toast = useToast();

const countriesStore = useCountriesStore()
const authStore = useAuthStore()
const publisherStore = usePublisherStore()
const groupsStore = useGroupsStore()
const categoriesStore = useCategoriesStore()
const authorStore = useAuthorStore()
const booksStore = useBooksStore()

const user: Ref<User | null> = ref(null)
const { title } = defineProps(['title']);


const isLoading: Ref<boolean> = ref(true)

const loadData = async () => {

}

onBeforeMount(async () => {
    user.value = authStore.getUserInfo
    
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
    /* display: flex; */
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
    margin-top: 30px;
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
font-size: 16px;
font-family: "Inter Medium";
margin-bottom: 10px;
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