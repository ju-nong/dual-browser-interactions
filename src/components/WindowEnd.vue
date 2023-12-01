<template>
    <div class="container">
        <img
            src="/images/arrow.svg"
            alt=""
            width="100"
            height="100"
            :style="`--rotate: 90deg`"
        />
        {{ x }}, {{ y }}
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useStart, useEnd } from "../stores";
import { storeToRefs } from "pinia";
const endStore = useStart();
const { open, x, y } = storeToRefs(endStore);

const startStore = useEnd();

onMounted(() => {
    endStore.setOpen(true);
});

onUnmounted(() => {
    endStore.setOpen(false);
});
</script>

<style lang="scss"></style>
