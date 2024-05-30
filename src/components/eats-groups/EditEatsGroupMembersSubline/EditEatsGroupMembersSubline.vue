<template>
    <span :class="checked ? 'checked' : ''">{{ props.person.fio }}</span>
    <Checkbox 
        v-model="checked" 
        binary 
        class="check" 
        @click="toggleChecked" 
    />
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from 'vue';
import Checkbox from 'primevue/checkbox';

const props = defineProps(['person', 'selectedFromCurrentGroups', 'show', 'togglePersonFromCurrent', 'isCheckAll']);
const checked = ref(false);

const updateCheckedStatus = () => {
    checked.value = props.selectedFromCurrentGroups.some((p: any) => p.id === props.person.id);
};

const toggleChecked = () => {
    props.togglePersonFromCurrent(props.person);
    updateCheckedStatus();
};

// Обновляем checked статус при изменении show
watch(() => props.show, (newVal) => {
    if (newVal) {
        updateCheckedStatus();
    }
});

// Обновляем checked статус при изменении selectedFromCurrentGroups
watch(() => props.selectedFromCurrentGroups, () => {
    updateCheckedStatus();
}, { deep: true });

// Инициализация checked статуса при монтировании компонента
onMounted(() => {
    updateCheckedStatus();
});
</script>

<style scoped>
.checked {
    font-weight: bold;
    background-color: #e3f2fd;
}
.check {
    margin-left: 10px;
}
</style>
