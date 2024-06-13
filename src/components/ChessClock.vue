<template>
    <div class="chess-clock">
        <ion-card @click="handleClockClick('white')" :color="activePlayer === 'white' ? 'medium' : 'light'" class="chessCard">
            <ion-card-content class="content">
                <h1>White</h1>
                <div class="time">{{ formatTime(whiteTime) }}</div>
            </ion-card-content>
        </ion-card>
        <div class="actionButtons">
            <ion-button @click="startClock" v-if="!activeTimer"><ion-icon :icon="playOutline" size="large"></ion-icon></ion-button>
            <ion-button @click="pauseClock" v-else><ion-icon :icon="pauseOutline" size="large"></ion-icon></ion-button>
            <ion-button @click="resetClock"><ion-icon :icon="refreshOutline" size="large"></ion-icon></ion-button>
            <ion-button @click="openModal"><ion-icon :icon="ellipsisVerticalOutline" size="large"></ion-icon></ion-button>
        </div>
        <ion-card  :color="activePlayer === 'black' ? 'medium' : 'light'" @click="handleClockClick('black')" class="chessCard">
            <ion-card-content class="content">
                <h1>Black</h1>
                <div class="time">{{ formatTime(blackTime) }}</div>
            </ion-card-content>
        </ion-card>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { IonButton, IonCard, IonCardContent, IonIcon, modalController } from '@ionic/vue';
import { playOutline, pauseOutline, refreshOutline, ellipsisVerticalOutline } from 'ionicons/icons';
import Modal from './Modal.vue';
const whiteTime = ref(5) // 5 minutes in seconds
const blackTime = ref(5) // 5 minutes in seconds
const userWhiteTime = ref(0)
const userBlackTime = ref(0)
const activePlayer = ref('white')
const timer = ref(null)
const activeTimer = ref(false)
const startClock = () => {
    if (timer.value) return;
    timer.value = setInterval(tick, 1000);
    activeTimer.value = true
}
const pauseClock = () => {
    clearInterval(timer.value);
    timer.value = null;
    activeTimer.value = false
}
const resetClock = () => {
    pauseClock();
    whiteTime.value = userWhiteTime.value!=0 ? userWhiteTime.value : 5;
    blackTime.value = userBlackTime.value!=0 ? userBlackTime.value : 5;
    activePlayer.value = 'white';
}
const switchPlayer = () => {
    activePlayer.value = activePlayer.value === 'white' ? 'black' : 'white';
}
const handleClockClick = (player) => {
    if (timer.value && activePlayer.value === player) {
        switchPlayer();
    }
}
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
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
        whiteTime.value = data[0];
        blackTime.value = data[1];
        userWhiteTime.value = data[0];
        userBlackTime.value = data[1];
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
}
.chessCard{
    width: 100vw;
    height: 38vh;
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
</style>