<template>
    <div class="container">
        <img
            src="/images/arrow.svg"
            alt=""
            width="100"
            height="100"
            :style="`--rotate: ${$rotate}deg`"
        />
        {{ x }}, {{ y }}
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useStart, useEnd } from "../stores";
import { storeToRefs } from "pinia";

const startStore = useStart();
const { open, x, y } = storeToRefs(startStore);

const endStore = useEnd();
const { open: endOpen, x: endX, y: endY } = storeToRefs(endStore);

const $rotate = ref(0);

function setRotate() {
    console.log(x.value);
    console.log(endX.value);
}

onMounted(() => {
    startStore.setOpen(true);
});

onUnmounted(() => {
    startStore.setOpen(false);
});
</script>

<style lang="scss"></style>
