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
      <ion-input type="number" min="0" class="ion-margin-top" label="White" label-placement="floating" fill="outline" placeholder="Enter time in minutes" v-model="whiteTime"></ion-input>
      <ion-input type="number" min="0" class="ion-margin-top ion-margin-bottom" label="Black" label-placement="floating" fill="outline" placeholder="Enter time in minutes" v-model="blackTime"></ion-input>
      <ion-label>Extra seconds</ion-label>
      <ion-input type="number" min="0" class="ion-margin-top" label="White" label-placement="floating" fill="outline" placeholder="Enter time in minutes" v-model="whiteExtraSec"></ion-input>
      <ion-input type="number" min="0" class="ion-margin-top" label="Black" label-placement="floating" fill="outline" placeholder="Enter time in minutes" v-model="blackExtraSec"></ion-input>
      <ion-item>
        <ion-label>Timing method</ion-label>
        <ion-item  class="ion-float-end">
          <ion-select v-model="selectedMethod" interface="popover">
            <ion-select-option v-for="method in methods" :key="method" :value="method">
              {{ method }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </ion-item>
      <ion-button :disabled="whiteTime==0 || blackTime==0" expand="block" class="ion-margin-top" @click="confirm" :strong="true">Confirm</ion-button>
    </ion-content>
  </template>

  <script setup>
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
      IonSelect,
      IonSelectOption
    } from '@ionic/vue';
    import { ref } from 'vue';
    import { Haptics, ImpactStyle } from '@capacitor/haptics';
    const props = defineProps(['whiteTime','blackTime','whiteExtraSec','blackExtraSec','method'])
    const whiteTime = ref(props.whiteTime);
    const blackTime = ref(props.blackTime);
    const whiteExtraSec = ref(props.whiteExtraSec);
    const blackExtraSec = ref(props.blackExtraSec);
    const methods = ref(['Fischer','Bronstein']);
    const selectedMethod = ref(props.method);
    const confirm = async () => {
      await Haptics.impact({ style: ImpactStyle.Medium });
      modalController.dismiss(
      {
        whiteTime: Math.abs(whiteTime.value*60),
        blackTime: Math.abs(blackTime.value*60),
        whiteExtraSec : Math.abs(whiteExtraSec.value),
        blackExtraSec : Math.abs(blackExtraSec.value),
        selectedMethod : selectedMethod.value
      }
      , 'confirm');
    }
  </script>

<style scoped>
.input-timing{
    margin-top: 20px;
}
</style>