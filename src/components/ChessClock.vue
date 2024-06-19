<template>
    <div class="chess-clock">
        <ion-card @click="handleClockClick('white')" :color="activePlayer === 'white' ? 'medium' : 'light'" class="chess-card ion-align-items-end chess-card-white">
            <ion-card-content class="content">
                <div class="time rotate-180">{{ formatTime(whiteTime) }}</div>
                <h1 class="rotate-180">White</h1>
            </ion-card-content>
        </ion-card>
        <div class="actionButtons">
            <ion-button @click="startClock" v-if="!activeTimer"><ion-icon :icon="playOutline" size="large"></ion-icon></ion-button>
            <ion-button @click="pauseClock" v-else><ion-icon :icon="pauseOutline" size="large"></ion-icon></ion-button>
            <ion-button @click="resetClock" :disabled="disableButton"><ion-icon :icon="refreshOutline" size="large"></ion-icon></ion-button>
            <ion-button @click="openModal" :disabled="disableButton"><ion-icon :icon="ellipsisVerticalOutline" size="large"></ion-icon></ion-button>
        </div>
        <ion-card  :color="activePlayer === 'black' ? 'medium' : 'light'" @click="handleClockClick('black')" class="chess-card">
            <ion-card-content class="content">
                <h1>Black</h1>
                <div class="time">{{ formatTime(blackTime) }}</div>
            </ion-card-content>
        </ion-card>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { IonButton, IonCard, IonCardContent, IonIcon, modalController,IonRippleEffect } from '@ionic/vue';
import { playOutline, pauseOutline, refreshOutline, ellipsisVerticalOutline } from 'ionicons/icons';
import Modal from './Modal.vue';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
const whiteTime = ref(300)
const blackTime = ref(300)
const userWhiteTime = ref(0)
const userBlackTime = ref(0)
const activePlayer = ref('white')
const timer = ref(null)
const activeTimer = ref(false)
const whiteExtraSec = ref(0)
const blackExtraSec = ref(0)
const previousWhiteTime= ref(0)
const previousBlackTime = ref(0)
const method = ref('Fischer')
const disableButton = ref(false)

const startClock = () => {
    if (timer.value) return;
    timer.value = setInterval(tick, 1000);
    activeTimer.value = true
    disableButton.value = true
}
const pauseClock = () => {
    clearInterval(timer.value);
    timer.value = null;
    activeTimer.value = false
    disableButton.value = false
}
const resetClock = () => {
    pauseClock();
    whiteTime.value = userWhiteTime.value!=0 ? userWhiteTime.value : 300;
    blackTime.value = userBlackTime.value!=0 ? userBlackTime.value : 300;
    activePlayer.value = 'white';
}
const switchPlayer = async(player) => {
    await Haptics.impact({ style: ImpactStyle.Light });
    player==='white' ? previousBlackTime.value = blackTime.value : previousWhiteTime.value = whiteTime.value
    activePlayer.value = activePlayer.value === 'white' ? 'black' : 'white';
}
const handleClockClick = (player) => {
    if(!timer.value  && activePlayer.value === player){
        startClock()
    }
    else{
        if (timer.value && activePlayer.value === player) {
            if(method.value === 'Fischer'){
                player === 'white' ? whiteTime.value += parseInt(whiteExtraSec.value) : blackTime.value += parseInt(blackExtraSec.value)
            }
            else{
                player === 'white' ? updateTime(whiteTime, previousWhiteTime, whiteExtraSec) : updateTime(blackTime, previousBlackTime, blackExtraSec)
            }
            switchPlayer(player);
        }
    }
}
const updateTime = (currentTime, previousTime, extraSec) => {
    const timeDifference = previousTime.value - currentTime.value;
    currentTime.value += Math.min(timeDifference, extraSec.value);
};
const tick = () => {
    if (activePlayer.value === 'white') {
        if (whiteTime.value > 0) {
            whiteTime.value--;
        } else {
            pauseClock();
            alert('Black wins!');
        }
    } else {
        if (blackTime.value > 0) {
            blackTime.value--;
        } else {
            pauseClock();
            alert('White wins!');
        }
    }
}
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
const openModal = async () => {
    pauseClock()
    const modal = await modalController.create({
      component: Modal,
      componentProps: {
			whiteTime: userWhiteTime.value ? userWhiteTime.value/60 : 5,
            blackTime: userBlackTime.value ? userBlackTime.value/60 : 5,
            whiteExtraSec: whiteExtraSec.value,
            blackExtraSec: blackExtraSec.value,
            method: method.value
		},
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
        whiteTime.value = data.whiteTime;
        blackTime.value = data.blackTime;
        userWhiteTime.value = data.whiteTime;
        userBlackTime.value = data.blackTime;
        whiteExtraSec.value = data.whiteExtraSec;
        blackExtraSec.value = data.blackExtraSec;
        method.value = data.selectedMethod;
        previousWhiteTime.value = data.whiteTime;
        previousBlackTime.value = data.blackTime;
        activePlayer.value = 'white';
    }
}
onMounted(()=>{
    openModal()
})
</script>
<style scoped>
.chess-clock {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
}
.chess-card{
    width: 100%;
    height: 35vh;
}
.chess-card-white{
    display: flex;
    justify-content: center;
}
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.time{
    font-size: 7rem;
    display: flex;
}
.actionButtons{
    display: flex;
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>