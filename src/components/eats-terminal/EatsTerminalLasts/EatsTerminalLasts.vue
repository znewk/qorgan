<template>
    <div class="containerS">
        <div class="wrapper" v-if="lasts.data.length > 0">
            <div class="item" v-for="last in lasts.data"
            :class="last.found ? 'itemBorderSuccess' : 'itemBorderNotSuccess'"
            >
                <div class="itemInfoBody">
                    <Image :src="last.photo" alt="Image" :height="75" preview />
                    <div class="itemInfo">
                        <span class="itemSpan" style="font-size: 18px;">{{ last.fio }}</span>
                        <span class="itemSpan">{{$t('eatsTerminalLayout.class')}}: {{  last.departmentName  }}</span>
                        <span class="itemSpan" :class="last.found ? 'success' : 'notSuccess'">{{  last.groupName  }}</span>
                    </div>
                </div>
                
                <button class="button red" @click="personAcceptDecline(last)">{{ $t('tables.decline') }}</button>
            </div>
        </div>
        <div style="text-align: center; padding: 50px 0" v-else>
            <span>{{ $t('tables.noData') }}</span>
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
    import { defineProps, Ref, ref } from 'vue';
    import Image from 'primevue/image';
    import { useEatsGroupsStore } from '@/stores/eatsGroupsStore';
    import { useToast } from "vue-toastification";

    import { useI18n } from 'vue-i18n';
    import {i18n} from '@/main';

    const { t } = useI18n();

    const { lasts, currentGroup, loadLastsByPage, loadLasts } = defineProps(['lasts', 'currentGroup', 'loadLastsByPage', 'loadLasts']);
    const eatsGroupStore = useEatsGroupsStore()
    const toast = useToast();

    const currentPage: Ref<number> = ref(1);
    const totalPages: Ref<number | null> = ref(Math.ceil(lasts.total / 3) == 0 ? 1 : Math.ceil(lasts.total / 3));

    const personAcceptDecline = async (last: any) => {
        console.log("last.eatsFactPersonId: " + last.eatsFactPersonId);
        const currentDate = new Date();
        const isoDate = currentDate.toISOString();
        const data = {
            id: last.id,
            author: "admin",
            dateCreate: isoDate,
            dateUpdate: isoDate,
            deviceId: last.deviceId || '0',
            eatGroupFactId: currentGroup?.id || '0',
            editor: "admin",
            personId: last.personId,
            status: 0
        }

        // console.log('sdsadsa')
        eatsGroupStore.fetchPersonAcceptDecline(data).then(async ()=>{
            await loadLasts(false)
            toast.success(t('others.succesfullyAdded'))
        })
    }

    const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        loadLastsByPage(currentPage.value)
    }
    };

    const nextPage = () => {
    if (currentPage.value < totalPages.value!) {
        currentPage.value++;
        loadLastsByPage(currentPage.value)
    }
    };

</script>

<style scoped>
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
    .containerS{
        display: flex;
        flex-direction: column;
        padding: 15px;
        border: 1px solid #DEE2E6;
        border-radius: 15px;
        box-sizing: border-box;
        margin: 0;
    }
    .item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 0 15px 15px 0;
        margin-bottom: 15px;
    }
    .itemSpan{
        display: block;
        margin-bottom: 5px;
        font-size: 16px
    }
    .itemInfoBody{
        display: flex;

    }
    .itemInfo{
        margin-left: 15px;
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