<template>
    <div>
        <button @click="handleOpenWindow('start')">Window 1</button>
        <br />
        <br />
        <button @click="handleOpenWindow('end')">Window 2</button>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

type windowType = "start" | "end";

type windowRef = Record<windowType, null | Window>;

const $window = reactive<windowRef>({
    start: null,
    end: null,
});

function handleOpenWindow(type: windowType) {
    $window[type] = window.open(`/${type}`, type, "width=400,height=300");
}
</script>

<style lang="scss" scoped></style>
