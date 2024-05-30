<template>
    <div class="groupsLists">
        <div class="groupsList">
            <div class="glHeader">
                <span class="glTitle">{{$t("cabinetLayout.selectedGroups")}}</span>
            </div>
            <!-- <div class="glBody" style="display: flex; justify-content: center;" v-if="props.groupsCurrent != null || props.groupsCurrent.length < 0 ">
                <Loader/>
            </div> -->
            <div class="glBody">
                <EditEatsGroupMembersLine v-for="group in props.groupsCurrent" 
                :key="group.id" 
                :group="group" 
                :selectFromCurrent="selectFromCurrent"
                :togglePersonFromCurrent="togglePersonFromCurrent"
                :selectedFromCurrentGroups="selectedFromCurrentGroups"
            />
            </div>
        </div>

        <div class="groupsBtns">
            <button class="addBtn" @click="addSelected()">
                <img src="/left.png" alt="left">    
            </button>
            <button class="removeBtn" @click="removeSelected()">
                <img src="/right.png" alt="right">    
            </button>
        </div> 

        <div class="groupsList">
            <div class="glHeader">
                <span class="glTitle">{{$t("cabinetLayout.allGroups")}}</span>
            </div>
            <div class="glBody">
                <EditEatsGroupMembersLine v-for="group in props.groupsAll" 
                :key="group.id" 
                :group="group" 
                :selectFromCurrent="selectFromAll"
                :togglePersonFromCurrent="togglePersonFromAll"
                :selectedFromCurrentGroups="selectedFromAllGroups"
                />
            </div>
        </div>
     </div>
</template>

<script setup lang="ts">
    import { Ref, onBeforeMount, ref, defineProps } from 'vue';
    import EditEatsGroupMembersLine from '../EditEatsGroupMembersLine/EditEatsGroupMembersLine.vue'
    import { useEatsGroupsStore } from '@/stores/eatsGroupsStore';
    import { eatsCurrentGroupsArray } from '@/models/eatsGroups';
    import Loader from '@/components/common/Loader.vue';
    import { useI18n } from 'vue-i18n';
    import { useToast } from 'vue-toastification';
    const { t } = useI18n();
    const eatsGroupStore = useEatsGroupsStore()
    const toast = useToast();

    // const isLoading: Ref<boolean> = ref(true)
    const props = defineProps(['groupMain', 'groupsCurrent', 'loadCurrentGroups', 'groupsAll', 'loadAllGroups', 'statusInput']);
    console.log("props", props.groupMain)
    


    const selectedFromCurrentGroups: Ref<any[]> = ref([])
    const selectedFromAllGroups: Ref<any[]> = ref([])


    const togglePersonFromCurrent = (person: any) => {
        const index = selectedFromCurrentGroups.value.findIndex(
            (p) => p.id === person.id // Используем уникальный идентификатор, чтобы избежать дубликатов
        );

        if (index === -1) {
            // Если `person` не найден, добавляем его в массив
            selectedFromCurrentGroups.value.push(person);
        } else {
            // Если `person` найден, удаляем его
            selectedFromCurrentGroups.value.splice(index, 1);
        }
        console.log(selectedFromCurrentGroups.value)
    };
    const selectFromCurrent = (group: any) => {
        const persons = group.persons || [];
        
        // Проверяем, присутствует ли хотя бы один человек из группы в `selectedFromCurrentGroups`
        const containsAny = persons.some((person: any) => 
            selectedFromCurrentGroups.value.some((selectedPerson: any) => selectedPerson.id === person.id)
        );

        if (containsAny) {
            // Если хотя бы один присутствует, удаляем их всех
            selectedFromCurrentGroups.value = selectedFromCurrentGroups.value.filter(
                (selectedPerson: any) => !persons.some((person: any) => person.id === selectedPerson.id)
            );
        } else {
            // Если ни один не присутствует, добавляем их всех
            selectedFromCurrentGroups.value = selectedFromCurrentGroups.value.concat(persons);
        }

        console.log(selectedFromCurrentGroups.value);
    };



    const togglePersonFromAll = (person: any) => {
        const index = selectedFromAllGroups.value.findIndex(
            (p) => p.id === person.id // Используем уникальный идентификатор, чтобы избежать дубликатов
        );

        if (index === -1) {
            // Если `person` не найден, добавляем его в массив
            selectedFromAllGroups.value.push(person);
        } else {
            // Если `person` найден, удаляем его
            selectedFromAllGroups.value.splice(index, 1);
        }
        console.log(selectedFromAllGroups.value)
    };

    const selectFromAll = (group: any) => {
        const persons = group.persons || [];
        
        // Проверяем, присутствует ли хотя бы один человек из группы в `selectedFromAllGroups`
        const containsAny = persons.some((person: any) => 
            selectedFromAllGroups.value.some((selectedPerson: any) => selectedPerson.id === person.id)
        );

        if (containsAny) {
            // Если хотя бы один присутствует, удаляем их всех
            selectedFromAllGroups.value = selectedFromAllGroups.value.filter(
                (selectedPerson: any) => !persons.some((person: any) => person.id === selectedPerson.id)
            );
        } else {
            // Если ни один не присутствует, добавляем их всех
            selectedFromAllGroups.value = selectedFromAllGroups.value.concat(persons);
        }

        console.log(selectedFromAllGroups.value);
    };


    const removeSelected = async () => {
        if(props.groupMain?.status == 1 || props.statusInput == 1 ){
            toast.error(t('others.statusIs'))
        } else if(selectedFromAllGroups.value.length > 0) {
            toast.warning(t('others.endDelete'))
        } else if (selectedFromCurrentGroups.value.length < 1) {
            toast.warning(t('others.notSelectedZapis'))
        } else {
            // Получаем идентификаторы всех выбранных персон из массива
            const personIds = selectedFromCurrentGroups.value.map((person) => person.personId);

            // Формируем данные для запроса
            const data = {
                eatsGroupsId: props.groupMain.id, // используем ID главной группы
                operationType: 0, // предполагаемый тип операции, может быть изменен
                personIds: personIds, // массив идентификаторов персон
            };

            await eatsGroupStore.fetchEatsGroupsPersonsDto(data).then(()=>{
                toast.success(t('others.operationEnd'))
                selectedFromAllGroups.value = []
            })

            await props.loadCurrentGroups(props.groupMain.id)
        }
    }

    const addSelected = async () => {
        if(props.groupMain?.status == 1 || props.statusInput == 1){
            toast.error(t('others.statusIs'))
        } else if (selectedFromCurrentGroups.value.length > 0) {
            toast.warning(t('others.endDelete'))
        } else if (selectedFromAllGroups.value.length < 1) {
            toast.warning(t('others.notSelectedZapis'))
        } else {
            // Получаем идентификаторы всех выбранных персон из массива
            const personIds = selectedFromAllGroups.value.map((person) => person.personId);

            // Формируем данные для запроса
            const data = {
                eatsGroupsId: props.groupMain.id, // используем ID главной группы
                operationType: 1, // предполагаемый тип операции, может быть изменен
                personIds: personIds, // массив идентификаторов персон
            };

            await eatsGroupStore.fetchEatsGroupsPersonsDto(data).then(()=>{
                toast.success(t('others.operationEnd'))
                selectedFromAllGroups.value = []
            })

            await props.loadCurrentGroups(props.groupMain.id)
        }
    }

    onBeforeMount(async ()=>{
    })
</script>

<style scoped>
    .groupsLists{
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .groupsList{
        border: 1px solid #dee2e6;
        /* padding: 20px; */
        box-sizing: border-box;
        border-radius: 15px 15px 0 0;
        width: 45%;
        height: 400px;
        color: #495057;
        overflow-y: auto;
    }
    .glHeader{
        border-bottom: 1px solid #dee2e6;
        border-radius: 15px 15px 0 0;
        width: 100%;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f8f9fa;
    }

    .glTitle {
        font-size: 16px;
        font-family: "Inter Medium";
        display: flex;
    }

    .glBody{
        /* padding: 10px 20px;   */
        background-color: white;
    }

    .groupsBtns{
        width: 6%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .addBtn, .removeBtn{
        width: 100%;
        border: none;
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
    }
    .addBtn{
        width: 100%;
        background-color: #0165E1;
        color: white;
        margin-bottom: 5px;
    }
    .removeBtn{
        background-color: #FD5D5D;
        color: white;
    }
</style>