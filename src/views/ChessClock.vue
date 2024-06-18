<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Chess Clock</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding-horizontal">
      <ChessClock />
    </ion-content>
  </ion-page>
</template>

<script setup>
import ChessClock from '@/components/ChessClock.vue';
import { IonPage, IonToolbar, IonTitle, IonHeader, IonContent } from '@ionic/vue';
</script>
