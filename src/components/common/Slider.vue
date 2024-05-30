<template>
    <div class="slider">
        <div class="slideCard firstCard">
            <img src="/login/azs.png" alt="AZS" class="cardImg">

            <div class="sliderCardFooter">
                <div class="cardTextBlock">
                    <span class="cardNew">НОВЫЙ</span>
                    <h3 class="cardTitle">{{ slides[currentSlideId].title }}</h3>
                </div>

                <div class="buttons">
                    <div v-for="(item, idx) in slides" v-bind:class="[defaultClass, currentSlideId == idx ? activeClass : '']" v-on:click="slideBtn(idx)"></div>
                </div>
            </div>
        </div>

        <div class="slideCard secondCard">
            <img src="/login/azs.png" alt="AZS" class="cardImg">

            <div class="sliderCardFooter">
                <div class="cardTextBlock">
                    <span class="cardNew">НОВЫЙ</span>
                    <h3 class="cardTitle">{{ slides[currentSlideId == 0 ? 2 : currentSlideId-1].title }}</h3>
                </div>

                <div class="buttons">
                    <div v-for="(item, idx) in slides" v-bind:class="[defaultClass, currentSlideId == idx ? activeClass : '']" v-on:click="slideBtn(idx)"></div>
                </div>
            </div>
        </div>

        <div class="slideCard thirdCard">
            <img src="/login/azs.png" alt="AZS" class="cardImg">

            <div class="sliderCardFooter">
                <div class="cardTextBlock">
                    <span class="cardNew">НОВЫЙ</span>
                    <h3 class="cardTitle">{{ slides[currentSlideId == 0 ? 2 : currentSlideId-1].title }}</h3>
                </div>

                <div class="buttons">
                    <div v-for="(item, idx) in slides" v-bind:class="[defaultClass, currentSlideId == idx ? activeClass : '']" v-on:click="slideBtn(idx)"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeClass = 'activeSlideBtn'
const defaultClass = 'slideBtn'

const slides = [
    {
        title: 'МОДУЛЬ ОТПУСКА НЕФТЕПРОДУКТОВ НА АЗС 1'
    },
    {
        title: 'МОДУЛЬ ОТЧЕТОВ ПО ОТПУСКАМ НА АЗС'
    },
    {
        title: 'МОДУЛЬ ОТПУСКА НЕФТЕПРОДУКТОВ НА АЗС 3'
    },
]

const currentSlideId = ref(0)

const slideBtn = (idx: number) => {
    currentSlideId.value = idx
}
</script>

<style scoped>
.slider{
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20% 0 5%;
    box-sizing: border-box;
    position: relative;
}
.sliderImg{
    width: 600px;
    height: auto;
    position: absolute;
    /*left: 50%;*/
    /*top: 50%;*/
    /*transform: translate(-50%, -50%);*/
    z-index: 1;
}
.slideCard{
    position: absolute;
    height: 550px;
    width: 400px;
    border-radius: 25px;
    background-color: #0858F7;
    padding: 80px 30px 50px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.firstCard{
    z-index: 3;
    /*transform: rotate(-0.2deg);*/
}
.secondCard{
    height: 500px;
    width: 300px;
    z-index: 2;
    position: relative;
    left: 125px;
    transform: rotate(5deg);
    background-color: #0646C6;
}
.thirdCard{
    height: 450px;
    width: 250px;
    z-index: 1;
    position: absolute;
    left: 45%;
    transform: rotate(10deg);
    background-color: #053594;
}
.thirdCard .cardTitle{
    font-size: 16px;
}
.cardImg{
    width: 100%;
    height: auto;
    padding: 30px;

    box-sizing: border-box;
}
.cardTextBlock{
    margin: 50px 0 40px 0;
}
.cardNew{
    color: white;
    background-color: black;
    padding: 5px 7px;
    border-radius: 7px;
    font-family: "Inter SemiBold";
    font-size: 12px;
}
.cardTitle{
    font-family: "Inter Bold";
    font-size: 22px;
    color: white;
    transition: 0.3s;
}
.buttons{
    display: flex;
    align-items: center;
}
.slideBtn{
    margin-right: 10px;
    cursor: pointer;
    height: 8px;
    width: 8px;
    background-color: rgba(255,255,255, 0.5);
    border-radius: 50%;
    transition: 0.5s;
}
.activeSlideBtn{
    height: 9px;
    width: 9px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
    transition: 0.5s;
}
@media screen and (max-width: 1023px) {
    .slider{
        display: none;
    }
}
</style>