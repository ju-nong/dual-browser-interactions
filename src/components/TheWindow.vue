<template>
    <div class="container">
        <img
            src="/images/arrow.svg"
            alt=""
            class="another"
            :style="`--top: ${$another.screenY - y + 168.5}px; --left: ${
                $another.screenX - x + 150
            }px; --rotate: ${$rotate + 180}deg`"
        />
        <img
            src="/images/arrow.svg"
            alt=""
            :style="`--rotate: ${$rotate}deg`"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useWindow } from "../stores";
import { storeToRefs } from "pinia";

type AnotherPos = {
    screenX: number;
    screenY: number;
};

const windowStore = useWindow();
const { x, y } = storeToRefs(windowStore);

const $rotate = ref(0);

const $another = reactive<AnotherPos>({
    screenX: -100,
    screenY: -100,
});

// const $windowSize = reactive({
//     width: 300,
//     height: 300,
// });

function setRotate({ screenX, screenY }: AnotherPos) {
    const deltaX = screenX - x.value;
    const deltaY = screenY - y.value;

    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = (angleInRadians * 180) / Math.PI;

    $rotate.value = angleInDegrees;

    $another.screenX = screenX;
    $another.screenY = screenY;
}

onMounted(() => {
    windowStore.setOpen(true);
    windowStore.handleWindowMove(window);

    window.addEventListener("message", function (event) {
        const data = event.data as null | AnotherPos;

        if (data !== null) {
            // 열린 창이 있을 때
            setRotate(data);
        }
    });
});

onUnmounted(() => {
    windowStore.setOpen(false);
});
</script>

<style lang="scss"></style>
