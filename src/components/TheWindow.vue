<template>
    <div class="container">
        <img
            src="/images/arrow.svg"
            alt=""
            class="another"
            :style="$anotherStyle"
        />
        <img src="/images/arrow.svg" alt="" :style="$currentStyle" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { useWindow } from "../stores";
import { storeToRefs } from "pinia";

type AnotherPos = {
    screenX: number;
    screenY: number;
    innerWidth: number;
    innerHeight: number;
};

const windowStore = useWindow();
const { x, y, width, height } = storeToRefs(windowStore);

const $currentRotate = computed(() => {
    const { screenX, screenY, innerWidth, innerHeight } = $another;

    const deltaX = screenX + innerWidth / 2 - x.value - width.value / 2;
    const deltaY = screenY + innerHeight / 2 - y.value - height.value / 2;

    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = (angleInRadians * 180) / Math.PI;

    return angleInDegrees;
});
const $currentStyle = computed(() => {
    return `
        --rotate: ${$currentRotate.value}deg;
    `;
});

const $another = reactive<AnotherPos>({
    screenX: 0,
    screenY: 0,
    innerWidth: 300,
    innerHeight: 300,
});
const $anotherStyle = computed(() => {
    const { screenX, screenY, innerWidth, innerHeight } = $another;

    return `
        --top: ${screenY - y.value + innerHeight / 2}px;
        --left: ${screenX - x.value + innerWidth / 2}px;
        --rotate: ${$currentRotate.value + 180}deg;
    `;
});

function setConfig({ screenX, screenY, innerWidth, innerHeight }: AnotherPos) {
    $another.screenX = screenX;
    $another.screenY = screenY;
    $another.innerWidth = innerWidth;
    $another.innerHeight = innerHeight;
}

onMounted(() => {
    windowStore.setOpen(true);
    windowStore.handleWindowMove(window);

    window.addEventListener("message", function (event) {
        const data = event.data as null | AnotherPos;

        if (data !== null) {
            // 열린 창이 있을 때
            setConfig(data);
        }
    });
});

onUnmounted(() => {
    windowStore.setOpen(false);
});
</script>

<style lang="scss"></style>
