<template>
    <div class="container">
        <!-- <img
            src="/images/arrow.svg"
            alt=""
            class="another"
            :style="`--rotate: ${$rotate + 180}deg`"
        /> -->
        <img
            src="/images/arrow.svg"
            alt=""
            :style="`--rotate: ${$rotate}deg`"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useWindow } from "../stores";
import { storeToRefs } from "pinia";

type AnotherPos = {
    screenX: number;
    screenY: number;
};

const startStore = useWindow();
const { x, y } = storeToRefs(startStore);

const $rotate = ref(0);

function setRotate({ screenX, screenY }: AnotherPos) {
    const deltaX = screenX - x.value;
    const deltaY = screenY - y.value;

    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = (angleInRadians * 180) / Math.PI;

    $rotate.value = angleInDegrees;
}

onMounted(() => {
    startStore.setOpen(true);
    startStore.handleWindowMove(window);

    window.addEventListener("message", function (event) {
        const data = event.data as null | AnotherPos;

        if (data !== null) {
            // 열린 창이 있을 때
            setRotate(data);
        }
    });
});

onUnmounted(() => {
    startStore.setOpen(false);
});
</script>

<style lang="scss"></style>
