<template>
    <div class="containerA">

        <div class="listHeader">
            <span class="headerTitle"  @click="changeListMode('enter')" >
                {{$t('eatsTerminalLayout.enterCount')}} - {{ listCount }}
            </span>
            <span class="headerTitle" @click="changeListMode('otsut')">
                {{$t('eatsTerminalLayout.otsutCount')}} - {{ listOtsut.total }}
            </span>
        </div>

        <div class="wrapper">
            <div class="item" 
            v-if="list.data.length != 0"
            v-for="item in list.data"
            :class="item.found ? 'itemBorderSuccess' : 'itemBorderNotSuccess'"
            >
                <span class="itemTitle">{{item.fio}}</span> <br>
                <span style="font-family: 'Inter Medium'">
                    <span class="itemTopName" :class="item.found ? 'success' : 'notSuccess'">{{ item.groupName }} /</span>
                    <span>{{ item.departmentName }}</span>
                    <span class="itemError" v-if="item.again">/ {{$t('eatsTerminalLayout.retry')}}</span> <br>
                    <span>{{$t('tables.date')}}: {{ formatedDate(item.factDate) }}</span>
                </span>
            </div>
            <div style="text-align: center; padding: 50px 0" v-else>
                <span>{{ $t('tables.noData') }}</span>
            </div>
        </div>

        <div class="pagination">
            <div class="paginationButtons">
                <button @click="previousPage" class="pageBtn">
                    <img src="/left.png" alt="left">
                </button>
                <span class="pages">{{ currentPage }} из {{ totalPages }}</span>
                <button @click="nextPage" class="pageBtn">
                    <img src="/right.png" alt="right">
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { group } from 'console';
import { defineProps, Ref, ref } from 'vue';

    const { list, listMode, currentGroup, loadListByPage, listOtsut, changeListMode, listCount } = defineProps(['list', 'listMode', 'currentGroup', 'loadListByPage', 'listOtsut', 'changeListMode', 'listCount']);


    const currentPage: Ref<number> = ref(1);
    const totalPages: Ref<number | null> = ref(Math.ceil(list.total / 18 == 0 ? 1 : list.total / 18));

    const formatedDate = (date: string) => {
        const dateObject = new Date(date);
         // Получаем год, месяц, день
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Месяцы в диапазоне 0-11, поэтому +1
        const day = String(dateObject.getDate()).padStart(2, '0');

        // Получаем часы и минуты
        const hours = String(dateObject.getHours()).padStart(2, '0');
        const minutes = String(dateObject.getMinutes()).padStart(2, '0');

        // Форматируем дату в нужный формат
        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }

    const previousPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
            loadListByPage(currentPage.value)
        }
    };

    const nextPage = () => {
        if (currentPage.value < totalPages.value!) {
            currentPage.value++;
            loadListByPage(currentPage.value)
        }
    };
</script>

<style scoped>
    .containerA{
        padding: 15px;
        border: 1px solid #DEE2E6;
        border-radius: 15px;
        box-sizing: border-box;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
        width: 100%;
        justify-content: flex-end;
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
    .pages{
        font-size: 14px;
        margin: 0 5px;
    }

    .listHeader{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .headerTitle{
        font-size: 16px;
        cursor: pointer;
    }
    .wrapper{
        /* background-color: #DEE2E6; */
        width: 100%;
        height: 100%;
        padding: 15px 0;
        box-sizing: border-box;
    }
    .item{
        width: 49%;
        /* background-color: #DEE2E6; */
       
        /* border: 1px solid #DEE2E6; */
        background-color: white;
        
        border-radius: 0 5px 5px 0;
        padding: 10px;
        box-sizing: border-box;
        display: inline-block;
        margin: 0.25%;
    }
    .itemTitle{
        font-size: 18px;
    }
    .itemTopName{
        margin-right: 10px;
    }
    .itemError{
        color: #FD5D5D;
        margin-left: 10px;
    }
    

    .itemBorderSuccess{
        border-left: 20px solid #50ff76;
    }
    .itemBorderNotSuccess{
        border-left: 20px solid #ff7575;
    }
    .success{
        color: #28e852;
        font-family: "Inter Medium"
    }
    .notSuccess{
        color: #FD5D5D;
        font-family: "Inter Medium"
    }
</style>