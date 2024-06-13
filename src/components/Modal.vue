<template>
    <ion-header>
      <ion-toolbar>
        <ion-title>Clock Timer</ion-title>
        <ion-buttons slot="end">
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-label>Set minutes per player</ion-label>
      <ion-input type="number" class="ion-margin-top" label="White" label-placement="floating" fill="outline" placeholder="Enter time in minutes" v-model="whiteTime"></ion-input>
      <ion-input type="number" class="ion-margin-top" label="Black" label-placement="floating" fill="outline" placeholder="Enter time in minutes" v-model="blackTime"></ion-input>
      <ion-button :disabled="whiteTime==0 || blackTime==0" expand="block" class="ion-margin-top" @click="confirm" :strong="true">Confirm</ion-button>
    </ion-content>
  </template>
  
  <script lang="ts" setup>
    import {
      IonContent,
      IonHeader,
      IonTitle,
      IonToolbar,
      IonButtons,
      IonButton,
      IonItem,
      IonInput,
      IonLabel,
      modalController,
    } from '@ionic/vue';
    import { ref } from 'vue';
    const whiteTime = ref(0);
    const blackTime = ref(0)
    const confirm = () => modalController.dismiss([whiteTime.value*60,blackTime.value*60], 'confirm');
  </script>

<style scoped>
.input-timing{
    margin-top: 20px;
}
</style>