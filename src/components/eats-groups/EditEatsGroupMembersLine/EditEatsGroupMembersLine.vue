<template>
    <div class="item" :class="{ checked: checked }">
        <div class="header">
            <div style="display: flex; align-items: center; width: 95%; cursor: pointer;" @click="showHandler">
                <span class="title">{{ props.group.name }}</span>
                <img src="/arrow-down.png" alt="down" class="img" :class="{ imgRotate: show }">
            </div>
            <Checkbox v-model="checked" binary class="check" @click="checkAll(props.group)" />
        </div>
        <div class="members" v-if="show">
            <div v-for="person in props.group.persons" :key="person.id" class="member" :class="checked ? 'checked' : ''">
                <EditEatsGroupMembersSubline 
                    :selectedFromCurrentGroups="props.selectedFromCurrentGroups" 
                    :show="show" 
                    :person="person" 
                    :togglePersonFromCurrent="props.togglePersonFromCurrent" 
                    :isCheckAll="isCheckAll" 
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, defineProps, ref, watch } from 'vue';
import Checkbox from 'primevue/checkbox';
import EditEatsGroupMembersSubline from '../EditEatsGroupMembersSubline/EditEatsGroupMembersSubline.vue';

const props = defineProps(['group', 'selectFromCurrent', 'togglePersonFromCurrent', 'selectedFromCurrentGroups']);
const isCheckAll: Ref<boolean> = ref(false);
const checked: Ref<boolean> = ref(false);
const show: Ref<boolean> = ref(false);

const checkAll = (group: any) => {
    props.selectFromCurrent(group);
    updateCheckedStatus();
};

const showHandler = () => {
    show.value = !show.value;
};

const updateCheckedStatus = () => {
    checked.value = props.group.persons.every((person: any) => 
        props.selectedFromCurrentGroups.some((p: any) => p.id === person.id)
    );
};

// Обновляем checked статус при изменении selectedFromCurrentGroups
watch(() => props.selectedFromCurrentGroups, () => {
    updateCheckedStatus();
}, { deep: true });

// Инициализация checked статуса при монтировании компонента
updateCheckedStatus();
</script>

<style scoped>
.item {
    padding: 15px 20px;
    border-bottom: 1px solid #dee2e6;
    transition: 0.3s;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.3s;
    padding: 0 5px;
}
.img {
    height: 16px;
    margin-left: 10px;
    transform: rotate(0);
    transition: .3s;
}
.imgRotate {
    transform: rotate(180deg);
}
.members {
    margin-top: 10px;
    border-top: 1px solid #dee2e6;
}
.member {
    display: flex;
    width: 100%;
    padding: 5px;
    background-color: #f8f9fa;
    margin: 1px 0;
    justify-content: space-between;
}
.p-checkbox-box {
    margin: 0 !important;
}
.check {
    cursor: pointer;
    z-index: 2;
}
.checked {
    background-color: #e3f2fd;
}
</style>
