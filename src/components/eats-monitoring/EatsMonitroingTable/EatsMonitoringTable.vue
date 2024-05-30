<template>
    <div class="item" >
        <div class="header">
            <div style="display: flex; align-items: center; width: 95%; cursor: pointer;" @click="showHandler">
                <span class="title">{{ props.item.name }}</span>
                <img src="/arrow-down.png" alt="down" class="img" :class="show && 'imgRotate'">
            </div>
            
            <!-- <input type="checkbox"  > -->

            <!-- <Checkbox v-model="checked" binary class="check" @click="checkAll(props.group)"/> -->
        </div>
        <div class="members" v-if="show">
            <div v-for="person in props.item.monPersons" class="member">
                <span class="memberItem">{{ person.fio }}</span>
                <span class="memberItem">{{ person.status == 1 ? 'Пришел' : 'Не пришел' }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Ref, defineProps, ref, watch, toRefs  } from 'vue';
    import Checkbox from 'primevue/checkbox';

    const props = defineProps(['item']);

    const show: Ref<boolean> = ref(false)
    const showHandler = () => {
        show.value = !show.value
    }
</script>

<style scoped>
  .item{
        padding: 15px 20px;
        border-bottom: 1px solid #dee2e6;
        transition: 0.3s;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* cursor: pointer; */
        transition: 0.3s;
    }
  
    .img{
        height: 16px;
        margin-left: 10px;
        transform: rotate(0);
        transition: .3s;
    }
    .imgRotate{
        transform: rotate(180deg);
    }
    .members{
        margin-top: 10px;
        border-top: 1px solid #dee2e6;
    }
    .member{
        display: flex;
        /* width: 100%; */
        box-sizing: border-box;
        padding: 10px 5px;
        /* padding-right: 0; */
        background-color: #f8f9fa;
        margin: 1px 0;
    }
    .memberItem{
        width: 50%;
    }
    .check{
        width: 5%;
        cursor: pointer;
        z-index: 2;
    }

    .checked{
        background-color: #e3f2fd;
    }

    
</style>