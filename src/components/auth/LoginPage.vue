<template>
  <div class="body">
    <div class="container">
      <div class="form">
        <div class="titleBody">
          <!-- <h1 class="logo">TM-SYSTEMS</h1> -->
          <h3 class="title">
            <img src="/qorgan_full.png" alt="logo" class="logoImg">
          </h3>
        </div>

        <div class="inputsBody">
          <input type="text" name="login" :placeholder="$t('authLayout.login')" class="input" v-model="loginInput.username">

          <div class="eyeInput">
            <input :type="inputType" name="password" :placeholder="$t('authLayout.password')" v-model="loginInput.password" class="input">
            <img src="/login/eye.png" alt="eye" class="eye" @click="passHook">
          </div>
        </div>

        <div class="buttonsBody">
          <button class="btn" @click.async="login(loginInput)">{{$t('authLayout.log')}}</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { ref, Ref } from "vue";
import { ILoginInput } from "@/models/account";
import Slider from '@/components/common/Slider.vue'
import BaseFooter from "../common/BaseFooter.vue";
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import { error } from "console";

const loginInput = ref<ILoginInput>({ password: "", username: "" });

const { login } = useAuthStore();

let inputType: Ref<string> = ref("password")

const passHook = () =>{
  console.log('clikced')
  if(inputType.value == 'password'){
    inputType.value = 'text'  
  } else {
    inputType.value = 'password'
  }
}
</script>

<style scoped>
.titleBody{
  display: flex;
  flex-direction: column;
  align-items: center;

}
.logo{
  font-family: "Goldman Regular";
  color: #0F60FF;
}
body{
  margin: 0;
  background-color: #F8F9FD;
}
.body{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #F8F9FD;
}
.container{
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form{
  width: 25%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.title{
    font-family: "Inter Bold";
    color: #18181B;
    display: flex;
    justify-content: center;
}
.input{
    color: #18181B;
    width: 100%;
    background-color: #18181B0D;
    padding: 15px;
    box-sizing: border-box;
    border: none;
    border-radius: 10px;
    margin: 10px 0;
}
.eyeInput{
    position: relative;
}
.eye{
    position: absolute;
    height: 100%;
    width: auto;
    top: 0;
    right: 0;
    cursor: pointer;
}
.buttonsBody{
    margin-top: 75px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.feedbackBtn{
    display: block;
    margin: 0 auto;
    color: #0858F7;
    cursor: pointer;
    margin-top: 20px;
    transition: 0.3s;
}
.btn{
    width: 100%;
    color: white;
    background-color: #0165E1;
    padding: 15px;
    box-sizing: border-box;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
}
.btnBody{
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
.btn:active{
    background-color: #1638a4;
}
.formTitle{
  font-family: "Inter Bold";
  text-align: center;
}

.inputForm{
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #E2E8F0;
    width: 100%;
    box-sizing: border-box;
}

.inputNum::-webkit-outer-spin-button,
.inputNum::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
.styleInput{
    transition: 0.3s;
}
.styleInput:hover{
    border: 1px solid #2196f3;
}
.styleInput:focus{
    border: 1px solid #2196f3;
    -webkit-box-shadow: 0px 0px 2px 3px rgba(33, 150, 243, 0.2);
    -moz-box-shadow: 0px 0px 2px 3px rgba(33, 150, 243, 0.2);
    box-shadow: 0px 0px 2px 3px rgba(33, 150, 243, 0.2);
}
.styleInput:disabled{
    background: #ffffff;
    border: 1px solid #eef1f6;
    color: #92969a;
}

.select{
    padding: 3px;
    border: none;
    border-radius: 10px;
    background-color: #FFFFFF;
    color: #6D7D93;
    box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.10);
    font-size:  16px;
    margin-right: 10px;
    border: 1px solid #E2E8F0;
    width: 100%;
}
.logoImg{
  width: 50%;
}
p {
  margin: 20px 0 10px 0;
}
.textarea{
  height: 75px;
  resize: none;
  font-family: "Inter Regular";
}
.subtitle{
  text-align: center;
  font-size: 14px;
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .form{
    width: 60%;
    margin: 0 auto;
    padding: 0;
  }
}
@media screen and (max-width: 767px) {
.form{
  width: 100%;
  padding: 0 10%;
}
.title{
  text-align: center;
}
.container{
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
}
</style>
