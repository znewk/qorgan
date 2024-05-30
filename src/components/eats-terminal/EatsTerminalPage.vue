<template>
    <div class="subContainer">
        <div class="pageTitle">
            <span class="pageTitleValues">{{$t('eatsTerminalLayout.title')}}</span>

            <div v-if="!isLoading">
                <span class="pageTitleSwitcher" @click="visible = !visible">
                    Режим: {{ scanMode == "auto" ? $t('others.auto') : $t('others.notAuto') }}
                </span>

                <span class="pageTitleSwitcher" >
                    {{$t('tables.groups')}}: {{ currentGroup?.groupName }}
                </span>

                <span class="pageTitleSwitcher">
                    {{$t('tables.time')}}: {{ time }}
                </span>


                <span class="pageTitleSwitcher">
                    Турникет:
                    <select v-model="deviceId" class="select" @change="toast.info($t('others.changeTurniket')); loadPerson()">
                        <option v-for="device in devices" :value="device.id">{{ device.name }}</option>
                    </select>
                </span>
                
            </div>
        </div>


        <div class="container">
            <div class="leftSide">
                <div class="terminal" v-if="isLoading" style="width: 100%; display: flex; justify-content: center;">
                    <Loader/>
                </div>
                <div class="terminal" v-if="!isLoading">
                    <div class="treminalLeftSide">
                        <Image v-if="isPersonLoaded" :src="person[0].photo" alt="Image" :width="200" preview />
                        <Image v-if="!isPersonLoaded" src="/001.jpg" alt="Image" :width="200" preview />

                        <button 
                            class="button red" 
                            style="width: 100%; margin-top: 30px; padding: 15px; white-space: nowrap; display: flex;justify-content: center;"
                            @click="visible = !visible"
                            v-if="scanMode == 'auto'"
                        >{{$t('eatsTerminalLayout.stopScan')}}</button>

                        <button 
                            class="button" 
                            style="width: 100%; margin-top: 30px; padding: 15px 10px; white-space: nowrap; ;justify-content: center"
                            v-if="scanMode == 'manual'"
                            @click="visible = !visible"
                        >{{$t('eatsTerminalLayout.startScan')}}</button>
                    </div>

                    <div class="terminalRightSide">
                        <div class="terminalInfoBody">
                            <span class="terminalFio">
                                {{ 
                                    isPersonLoaded ? (
                                        person[0].fio
                                    ) : $t('eatsTerminalLayout.nameIsLoad')
                                }}
                            </span>

                            <span class="terminalInfo">{{ $t('eatsTerminalLayout.class') }}: 
                                {{ 
                                    isPersonLoaded ? (
                                        person[0].division
                                    ) : $t('eatsTerminalLayout.classIsLoad')
                                }}
                            </span>
                            <span class="terminalInfo">Группа: 
                                <span :class="person[0].found == 1 ? 'success' : 'notSuccess'" v-if="isPersonLoaded">
                                    {{ 
                                        isPersonLoaded ? (
                                            person[0].groupName
                                        ) : $t('eatsTerminalLayout.groupIsLoad')
                                    }}
                                </span>
                                <span v-else>{{$t('eatsTerminalLayout.groupIsLoad')}}</span>
                            </span>
                            <span class="terminalInfo">
                                Идентификация:
                                {{ 
                                    isPersonLoaded ? (
                                        "биометрия/карта"
                                    ) : $t('eatsTerminalLayout.loading')
                                }}
                            </span>
                        </div>

                        <div class="terminalBtns" :class="!showButtons && 'hide'" v-if="scanMode =='manual' && isPersonLoaded">
                            <button class="button" style="margin-right: 15px;" @click="personAcceptDecline(1, true)">{{$t('tables.accept')}}</button>
                            <button class="button red" @click="personAcceptDecline(0, true)">{{$t('tables.decline')}}</button>
                        </div>
                    </div>
                </div>
                <div class="pageTitle">
                    <span class="pageTitleValues" style="margin: 10px 0;">{{$t('eatsGroupsLayout.lastEnter')}}</span>
                </div>
                <div class="lasts">
                    <EatsTerminalLasts :lasts="lasts" :currentGroup="currentGroup" :loadLastsByPage="loadLastsByPage" :loadLast="loadLasts"/>
                </div>
            </div>

            <div class="rightSide">
                <EatsTerminalList v-if="listMode == 'enter'" :listMode="listMode" :listCount="list.total" :list="list" :listOtsut="listOtsut" :currentGroup="currentGroup" :loadListByPage="loadListByPage" :changeListMode="changeListMode"/>
                <EatsTerminalList v-if="listMode == 'otsut'" :listMode="listMode" :listCount="list.total" :list="listOtsut" :listOtsut="listOtsut" :currentGroup="currentGroup" :loadListByPage="loadListOtsutByPage" :changeListMode="changeListMode"/>
            </div>
        </div>
        
        <Dialog v-model:visible="visible" modal :header="$t('eatsGroupsLayout.sure')" :style="{ width: '25vw' }"
            :draggable="false">
            

            <div class="footer">
                <button class="button" @click="changeScanMode()" style="margin-left: 10px;">{{$t('eatsGroupsLayout.yes')}}</button>
                <button class="button decline" @click="visible = !visible">{{$t('eatsGroupsLayout.no')}}</button>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
    import Dropdown from 'primevue/dropdown';
    import Calendar from 'primevue/calendar';
    import DataTable from 'primevue/datatable';
    import InputText from 'primevue/inputtext';
    import Dialog from 'primevue/dialog';
    import Column from 'primevue/column';
    import InputMask from 'primevue/inputmask';
    import Image from 'primevue/image';
    import { Ref, ref, onBeforeMount, watch, computed } from 'vue';
    import Loader from '../common/Loader.vue';
    import { EatsGroups, eatsGroupPerson, eatsMonitoringData, eatsMonitoringPersData, Device } from '@/models/eatsGroups';
    import { useEatsGroupsStore } from '@/stores/eatsGroupsStore';
    import { useToast } from "vue-toastification";
    import { FilterMatchMode } from 'primevue/api';
    import EatsTerminalLasts from './EatsTerminalLasts/EatsTerminalLasts.vue'
    import EatsTerminalList from './EatsTerminalList/EatsTerminalList.vue'
    import { roundToNearestMinutesWithOptions } from 'date-fns/fp';
    import { stat } from 'fs';
    import { useI18n } from 'vue-i18n';
    import {i18n} from '@/main';

    const { t } = useI18n();
    const eatsGroupStore = useEatsGroupsStore()
    const toast = useToast();

    const visible: Ref<boolean> = ref(false);
    const showButtons: Ref<boolean> = ref(true);

    const isLoading: Ref<boolean> = ref(true)
    const scanMode: Ref<string> = ref('manual')
    const person: Ref<eatsGroupPerson[]> = ref([])
    const isPersonLoaded: Ref<boolean> = ref(false)

    const eatsGroups: Ref<EatsGroups[]> = ref([])
    const currentGroup: Ref<EatsGroups | null> = ref(null)


    const listMode: Ref<string> = ref('enter')
    const lasts: Ref<any> = ref({data: [], total: 0})
    const list: Ref<any> = ref({data: [], total: 0})
    const listOtsut: Ref<any> = ref({data: [], total: 0})




    const devices: Ref<Device[]> = ref([])
    const deviceId: Ref<string | number> = ref("")

    const loadDevices = async () => {
        await eatsGroupStore.fetchEatsDevices()
        devices.value = eatsGroupStore.getEatsDevicesData!
        deviceId.value = devices.value[0].id
    }

    const personAcceptDecline = async (status: number, show: boolean) => {
        console.log('a')
        const currentDate = new Date();
        const isoDate = currentDate.toISOString();
        const data = {
            author: "admin",
            dateCreate: isoDate,
            dateUpdate: isoDate,
            deviceId: deviceId.value,
            eatGroupFactId: currentGroup.value?.id,
            editor: "admin",
            personId: person.value[0].id,
            status: status
        }

        eatsGroupStore.fetchPersonAcceptDecline(data).then(async ()=>{
            await loadLasts(false)
            if(show){
                if(status){
                    toast.success(t('othsers.succesfullyAdded'))
                } else {
                    toast.success(t('othsers.succesfullyAdded'))
                }
            }
            showButtons.value = false;
        })
    }


    const changeListMode = (value: string) => {
        listMode.value = value
    }

    const changeScanMode = () =>{
        if(scanMode.value == 'auto'){
            scanMode.value = 'manual'
            toast.info(t('others.notAutoModeSetted'))
        } else {
            scanMode.value = 'auto'
            toast.info(t('others.autoModeSetted'))
        }
        visible.value = false
    }
    const loadLastsByPage = async (page: number) => {
        page = page | 1
        isLoading.value = true
        await eatsGroupStore.fetchEatsLastsPersons(page, deviceId.value.toString())
        lasts.value = eatsGroupStore.getEatsLastsPersonsData!

        isLoading.value = false
    }
    const loadLasts = async (load: boolean) => {
        load = load || false
        if(load){
            isLoading.value = true
        }
        
        await eatsGroupStore.fetchEatsLastsPersons(1, deviceId.value.toString())
        lasts.value = eatsGroupStore.getEatsLastsPersonsData!

        if(load){
            isLoading.value = false
        }
        
    }

    const loadListByPage = async (page: number) => {
        page = page | 1
        // isLoading.value = true
        await eatsGroupStore.fetchEatsListPersons(page)
        list.value = eatsGroupStore.getEatsListPersonsData!

        // isLoading.value = false
    }
    const loadList = async (load: boolean) => {
        if(load){
            isLoading.value = true
        }
        await eatsGroupStore.fetchEatsListPersons(1)
        list.value = eatsGroupStore.getEatsListPersonsData!

        if(load){
            isLoading.value = false
        }
    }
    const loadListOtsut = async (load: boolean) => {
        if(load){
            isLoading.value = true
        }
        await eatsGroupStore.fetchEatsListOtsutPersons(1)
        listOtsut.value = eatsGroupStore.getEatsListPersonsOtsutData!

        if(load){
            isLoading.value = false
        }
    }
    const loadListOtsutByPage = async (page: number) => {
        page = page | 1
        // isLoading.value = true
        await eatsGroupStore.fetchEatsListOtsutPersons(page)
        listOtsut.value = eatsGroupStore.getEatsListPersonsOtsutData!

        // isLoading.value = false
    }
    const loadGroups = async () => {
        isLoading.value = true;
        await eatsGroupStore.fetchEatsGroups();
        eatsGroups.value = eatsGroupStore.getEatsGroupsList!;
        let closestGroup: EatsGroups | undefined;
        
        eatsGroups.value.map(group => {
            if(group.isCurrent == 1){
                closestGroup = group
                return
            }
        })

        if (closestGroup) {
            console.log("Текущая или ближайшая группа:", closestGroup.groupName);
            currentGroup.value = closestGroup;
        } else {
            console.log("Группа не найдена.");
        }

        isLoading.value = false;
    };

    const formattedCurrentTime = () => {
        const now = new Date();
        const days = [
            i18n.global.locale.value == "ru" ? "Воскресенье" : "Жексенбі",
            i18n.global.locale.value == "ru" ? "Понедельник" : "Дүйсенбі",
            i18n.global.locale.value == "ru" ? "Вторник" : "Сейсенбі",
            i18n.global.locale.value == "ru" ? "Среда" : "Сәрсенбі",
            i18n.global.locale.value == "ru" ? "Четверг" : "Бейсенбі",
            i18n.global.locale.value == "ru" ? "Пятница" : "Жұма",
            i18n.global.locale.value == "ru" ? "Суббота" : "Сенбі"
        ]
        const dayName = days[now.getDay()];
        const day = now.getDate();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Добавление ведущего нуля
        const year = now.getFullYear().toString().slice(-2); // Последние две цифры года
        const hours = now.getHours().toString().padStart(2, '0'); // Добавление ведущего нуля
        const minutes = now.getMinutes().toString().padStart(2, '0'); // Добавление ведущего нуля
        return `${dayName}, ${day}.${month}.${year}, ${hours}:${minutes}`;
    };

    const time: Ref<string> = ref(formattedCurrentTime())


    const loadPerson = async () => {
        await eatsGroupStore.fetchVerifPerson(deviceId.value.toString()).then(async ()=>{
            person.value = eatsGroupStore.getPersonVerif!
            await loadLasts(false)
            await loadList(false)
            await loadListOtsut(false)
            isPersonLoaded.value = true
            showButtons.value = true

            if(person.value.length == 0){
                isPersonLoaded.value = false
            } else if (scanMode.value == "auto"){
                await personAcceptDecline(1, false)
            }

            showButtons.value = true;
        })
    }
    const loadData = async () => {
        isLoading.value = false
    }
    onBeforeMount(async () => {
        changeScanMode()
        await loadDevices()
        
        await loadGroups()
        await loadData()
        await loadLasts(true)
        await loadList(true)
        await loadListOtsut(true)

        await loadPerson()
    })


    let intervalId: NodeJS.Timeout | null = null;
    watch(scanMode, (newValue, oldValue) => {
        if (newValue === 'auto' && intervalId === null) {
            // Начать циклический вызов loadPerson
            intervalId = setInterval(() => {
                loadPerson();
                time.value = formattedCurrentTime()
            }, 5000); // Интервал в миллисекундах, например, 5000 мс (5 секунд)
        } else if (newValue === 'manual' && intervalId !== null) {
            // Прекратить циклический вызов loadPerson
            // clearInterval(intervalId);
            // intervalId = null;
        }
        
    });

</script>

<style scoped>
.subContainer {
    min-height: 100vh;
}

.pageTitleValues {
    font-size: 14px;
    font-family: "Inter Bold";
}

.importSide {
    padding: 15px;
    border: 1px solid #DEE2E6;
    border-radius: 15px;
    box-sizing: border-box;
    margin: 15px 0;
    display: flex;
}

.button {
    background-color: #0165E1;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 15px 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 40%;
    text-align: center !important;
}

.button>span {
    /* margin-left: 5px; */
    text-align: center !important;
}

.red {
    background-color: #FD5D5D;
}

.svgEditBtn {
    cursor: pointer;
}

.tableBody, .groupEdit {
    border: 1px solid #DEE2E6;
    border-radius: 15px;
    padding: 10px;
}
.groupEdit{
    margin-top: 15px
}

.footer {

    box-sizing: border-box;

    display: flex;
    justify-content: center;
}

.title {
    margin: 0;
    font-size: 18px;
    font-family: "Inter Bold"
}

.decline {
    color: black;
    background-color: #F8F9FA;
    bottom: 1px solid #d9dcdf;
}

.item {
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}

.itemTitle {
    font-family: "Inter Bold";
    font-size: 14px;
    margin-bottom: 5px;
}

.blue {
    color: #0165E1;
    font-size: 16px;
}

.red {
    background-color: #FD5D5D;
}

.full-width-input {
    width: 100%;
}

.pageTitle{
    display: flex;
    align-items: center;
}
.pageTitleSwitcher{
    color: #718096;
    font-size: 14px;
    font-family: "Inter Medium";
    margin-left: 30px;
    cursor: pointer;
}
.container{
    margin-top: 15px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
}
.leftSide{
    width: 39%;
    /* background: #718096 */
}
.rightSide{
    width: 60%;
    /* background-color: #DEE2E6; */
}
.terminal{
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 15px;
    border: 1px solid #DEE2E6;
    border-radius: 15px;
    box-sizing: border-box;
}
.treminalLeftSide{
    width: 200px;
}
.terminalRightSide{
    width: 100%;
    padding-left: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.terminalFio{
    font-size: 24px;
    font-family: "Inter Medium";
    display: block;
    margin-bottom: 15px;
    word-wrap: break-word;
    word-break: break-all; 
}
.terminalInfo{
    display: block;
    margin-bottom: 5px;
    word-break: break-all; 
    word-wrap: break-word;
}
.terminalBtns{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
}

.success{
        color: #28e852;
        font-family: "Inter Medium"
    }
    .notSuccess{
        color: #FD5D5D;
        font-family: "Inter Medium"
    }

    .select{
        color: #718096;
        font-family: "Inter Medium";
        font-size: 14px;
        border: none;
        background: transparent;
        cursor: pointer;
    }
    .hide{
        display: none;
    }
</style>