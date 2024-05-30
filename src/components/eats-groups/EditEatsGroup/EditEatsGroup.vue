<template>
        <div class="groupEdit">
            <div v-if="group == undefined && !props.isLoadingDown" class="noData">
                <span >{{$t("tables.selectGroupToEdit")}}</span>
            </div>
            <div v-if="props.isLoadingDown" class="noData">
                <Loader/>
            </div>
            <div v-if="group != undefined && !props.isLoadingDown" class="headerrr">
                <!-- {{ group.groupName }} -->

                <div class="switcher">
                    <span
                        class="switcherItem"
                        :class="{ activeSwitcherItem: currentPage == 'lists' }"
                        @click="changePage('lists')"
                    >{{$t("tables.groupList")}}</span>
                    <!-- <span
                        class="switcherItem"
                        :class="{ activeSwitcherItem: currentPage == 'graphic' }"
                        @click="changePage('graphic')"
                    >График</span> -->
                    <span 
                        class="switcherItem"
                        :class="{ activeSwitcherItem: currentPage == 'main' }"
                        @click="changePage('main')"
                    >{{$t("tables.mainInfo")}}</span>
                </div>

                <button class="btn" @click="saveData()">{{$t("tables.save")}}</button>
            </div>

            <div class="mainInfo" v-if="group != undefined && currentPage == 'main' && !props.isLoadingDown">
                <div class="item">
                    <span class="itemTitle">
                        {{$t("tables.nameOfGroup")}}:
                    </span>
                    <InputText :disabled="disabled" style="width: 300px;" type="text" v-model="groupName" :placeholder="$t('tables.nameOfGroup')"/>
                </div>
                <div class="item">
                    <span class="itemTitle">
                        {{$t("tables.dateStart")}}:
                    </span>
                    <Calendar :disabled="disabled" :locale="ru" dateFormat="yy-mm-dd" style="width: 300px;"  :placeholder="$t('tables.dateStart')" v-model="groupDateStart"/>
                </div>
                <div class="item">
                    <span class="itemTitle">
                        {{$t("tables.dateEnd")}}:
                    </span>
                    <Calendar :disabled="disabled" :locale="ru" dateFormat="yy-mm-dd"  style="width: 300px;" :placeholder="$t('tables.dateEnd')" v-model="groupDateEnd"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t("tables.description")}}:
                    </span>
                    <InputText :disabled="disabled" style="width: 300px;"  type="text" v-model="groupDesc" :placeholder="$t('tables.description')"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        {{$t("tables.timeStart")}}:
                    </span>
                    <Calendar :disabled="disabled" style="width: 300px;"  :placeholder="$t('tables.timeStart')" v-model="groupTimeStart" timeOnly  hourFormat="24"/>
                </div>
                <div class="item">
                    <span class="itemTitle">
                        {{$t("tables.timeEnd")}}:
                    </span>
                    <Calendar :disabled="disabled" :locale="ru"  style="width: 300px;" :placeholder="$t('tables.timeEnd')" v-model="groupTimeEnd" timeOnly  hourFormat="24"/>
                </div>

                <div class="item">
                    <span class="itemTitle">
                        Статус:
                    </span>
                    <Dropdown style="width: 300px;"  v-model="selectedStatus" :options="statuses" optionLabel="name" :placeholder="$t('tables.selectStatus')" class="w-full md:w-14rem" />
                </div>
            </div>

            <!-- <div class="mainInfo" v-if="group != undefined && currentPage == 'graphic' && !props.isLoadingDown">
                <div class="item">
                    <span class="itemTitle">
                        {{$t("tables.timeStart")}}:
                    </span>
                    <Calendar style="width: 300px;"  :placeholder="$t('tables.timeStart')" v-model="groupTimeStart" timeOnly  hourFormat="24"/>
                </div>
                <div class="item">
                    <span class="itemTitle">
                        {{$t("tables.timeEnd")}}:
                    </span>
                    <Calendar :locale="ru"  style="width: 300px;" :placeholder="$t('tables.timeEnd')" v-model="groupTimeEnd" timeOnly  hourFormat="24"/>
                </div>
            </div> -->

            <EditEatsGroupMembers :groupsCurrent="props.groupsCurrent" 
                :groupsAll="props.groupsAll" 
                :groupMain="props.group" 
                v-if="group != undefined && currentPage == 'lists' && !props.isLoadingDown"
                :loadCurrentGroups="props.loadCurrentGroups"
                :loadAllGroups="props.loadAllGroups"
            />
        </div>
</template>

<script setup lang="ts">
    import EditEatsGroupMembers from '../EditEatsGroupMembers/EditEatsGroupMembers.vue'
    import { Ref, defineProps, ref, watch, toRefs  } from 'vue';
    import Loader from '@/components/common/Loader.vue';
    import { EatsGroups } from '@/models/eatsGroups';
    // import { format } from 'date-fns';
    import InputText from 'primevue/inputtext';
    import Calendar from 'primevue/calendar';
    import MultiSelect from 'primevue/multiselect';
    import Dropdown from 'primevue/dropdown';
    import { useEatsGroupsStore } from '@/stores/eatsGroupsStore';
    import { useToast } from "vue-toastification";
    import { ru } from 'date-fns/locale';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const eatsGroupStore = useEatsGroupsStore()
    const toast = useToast();

    const props = defineProps(['group', 'selectedGroupToEdit' ,'changeShowTableState' , 'groupsCurrent', 'isLoadingDown', 'loadCurrentGroups', 'groupsAll', 'loadAllGroups', 'loadEatsGroups']);
    const statuses: Ref<{name: string, code: number}[]> = ref([
        {
            name: t('tables.status1'),
            code: 0
        },
        {
            name: t('tables.status2'),
            code: 1
        },
        {
            name: t('tables.status3'),
            code: 2
        },
    ])




    const groupName: Ref<string> = ref('')
    const groupDesc: Ref<string> = ref('')
    const groupDate: Ref<string> = ref('')
    const groupDateStart: Ref<string> = ref('')
    const groupDateEnd: Ref<string> = ref('')
    const groupTimeStart: Ref<string> = ref('')
    const groupTimeEnd: Ref<string> = ref('')
    const selectedStatus: Ref<any> = ref({name: t('tables.status1'), code: 0})
    const disabled: Ref<boolean> = ref(false)


    // main, graphic, lists
    const currentPage: Ref<string> = ref('lists')
    const changePage = (pageName: string) => {
        currentPage.value = pageName;
        console.log(props.group)
    };

    watch(() => props.group, (newValue) => {
        if (newValue && newValue.groupName) {
            groupName.value = newValue.groupName;
            groupDate.value = convertDateFormat(newValue.groupDate);
            groupDateStart.value = convertDateFormat(newValue.dateStart);
            groupDateEnd.value = convertDateFormat(newValue.dateFinish);
            groupDesc.value = newValue.description;
            groupTimeStart.value = newValue.graph.split('-')[0]
            groupTimeEnd.value = newValue.graph.split('-')[1]

            switch(newValue.status){
                case 0:
                    selectedStatus.value = {name: t('tables.status1'), code: 0}
                    break
                case 1:
                    selectedStatus.value = {name: t('tables.status2'), code: 1}
                    break
                case 2:
                    selectedStatus.value = {name: t('tables.status3'), code: 2}
            }
            

            if(newValue.status == 1) {
                disabled.value = true
            }
        }
    });

    function convertDateFormat(dateString: string): string {
        const dateObject = new Date(dateString);
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        const year = dateObject.getFullYear().toString();
        return `${year}-${month}-${day}`;
    }
    const extractTime = (timeString: any) => {
        // Регулярное выражение для формата "HH:MM:SS"
        const isHHMMSSFormat = /^(\d{2}):(\d{2}):(\d{2})$/.test(timeString);

        if (isHHMMSSFormat) {
            // Если формат уже "HH:MM:SS", возвращаем его как есть
            return timeString;
        }

        // Регулярное выражение для извлечения времени из строки даты
        const regex = /\d{2}:\d{2}:\d{2}/;
        const match = regex.exec(timeString);

        if (match) {
            // Если извлекли время, возвращаем в формате "HH:MM:SS"
            return match[0];
        }

        throw new Error(`Invalid time format: ${timeString}`); // Если не удалось извлечь время
    };

    function formatDate(dateString: string): string {
        // Проверяем, является ли строка датой в формате "Sun May 05 2024 00:00:00 GMT+0500"
        const isGMTFormat = /^\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4}/.test(dateString);
        if (isGMTFormat) {
            // Если строка соответствует формату GMT, преобразуем в формат "YYYY-MM-DD"
            const dateObject = new Date(dateString);
            return convertDateFormat(dateObject.toISOString());
        }

        // Проверяем, является ли строка датой в формате "05/12/2024"
        const isSlashFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(dateString);
        if (isSlashFormat) {
            // Если строка соответствует формату "mm/dd/yyyy", преобразуем в формат "YYYY-MM-DD"
            const [month, day, year] = dateString.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

        // Если формат не распознан, возвращаем исходную строку
        return dateString;
    }

    const saveData = async () => {
        console.log(groupName.value)
        console.log(groupDate.value)
        console.log(groupDateStart.value)
        console.log(groupDateEnd.value)
        console.log(groupTimeStart.value)
        console.log(groupTimeEnd.value)

        const currentDateTime = new Date().toISOString();
        const currentDate = currentDateTime.split('T')[0]; // "YYYY-MM-DD"
        const graphStartTime = extractTime(groupTimeStart.value);
        const graphEndTime = extractTime(groupTimeEnd.value);


        const data = {
            author: "admin",
            dateCreate: currentDateTime, // "YYYY-MM-DDTHH:mm:ss.sssZ"
            dateFinish: formatDate(groupDateEnd.value),
            dateStart: formatDate(groupDateStart.value),
            dateUpdate: currentDateTime, // "YYYY-MM-DDTHH:mm:ss.sssZ"
            description: groupDesc.value,
            editor: "admin",
            graphEndTime: graphEndTime,
            graphStartTime: graphStartTime,
            name: groupName.value,
            id: props.group.id,
            status: selectedStatus.value.code // или statusInput.value
        }

        // Пример вызова асинхронного метода для отправки запроса
        await eatsGroupStore.fetchCreateEatsGroups(data);
        toast.success(t('others.succesfullyAdded'));
        await props.loadEatsGroups(); // Загружаем группы после добавления    
        props.changeShowTableState(true)


            if(selectedStatus.value.code == 1) {
                disabled.value = true
            } else {
                disabled.value = false
            }
    }
</script>

<style scoped>
    .groupEdit {
        border: 1px solid #DEE2E6;
        border-radius: 15px;
        padding: 15px;
        min-height: 400px;
    }
    .groupEdit{
        margin-top: 15px
    }
    .noData{
        padding: 50px 0;
        text-align: center;
    }
    
    .switcherItem{
        width: 20%;
        border-bottom: 2px solid #DEE2E6;
        color: #495057;
        font-family: "Inter Medium";
        padding: 10px 0;
        padding-left: 10px;
        cursor: pointer;
        transition: 0.3s;
        white-space: nowrap;
    }
    .switcherItem:hover{
        border-color: #0165E1;
        color: #0165E1;
    }
    .activeSwitcherItem{
        border-color: #0165E1;
        color: #0165E1;
    }

    .mainInfo{
        margin-top: 30px;
    }

    .item{
        /* width: 50%; */
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        /* flex-direction: column; */
    }
    .itemTitle{
        font-family: "Inter Medium";
        font-size: 16px;
        /* margin-bottom: 5px; */
        display: block;
        width: 30%;
    }
    .blue{
        color: #0165E1;
        font-size: 16px;
    }
    .btn{
        background-color: #0165E1;
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .switcher{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 90%;
    }
    .headerrr{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>