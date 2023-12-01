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
const { x, y } = storeToRefs(startStore);

const $rotate = ref(0);

onMounted(() => {
    startStore.setOpen(true);
    startStore.handleWindowMove(window);

    window.addEventListener("message", function (event) {
        console.log(event.data);
    });
});

onUnmounted(() => {
    startStore.setOpen(false);
});
</script>

<style lang="scss"></style>
