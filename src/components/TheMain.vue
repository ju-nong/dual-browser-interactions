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
type intervalRef = Record<windowType, null | number>;

const $window = reactive<windowRef>({
    start: null,
    end: null,
});
const $interval = reactive<intervalRef>({
    start: null,
    end: null,
});

function getAnotherWindowPosition(currentType: windowType) {
    if (currentType === "start" && $window.end !== null) {
        const { screenX, screenY } = $window.end;

        return { screenX, screenY };
    } else if (currentType === "end" && $window.start !== null) {
        const { screenX, screenY } = $window.start;

        return { screenX, screenY };
    }

    return null;
}

function handleOpenWindow(type: windowType) {
    $window[type] = window.open(`/${type}`, type, "width=300,height=300");

    $interval[type] = setInterval(() => {
        const currentWindow = $window[type];

        if (currentWindow === null || currentWindow.closed) {
            clearInterval($interval[type] as number);

            return;
        }

        currentWindow.postMessage(getAnotherWindowPosition(type), "*");
    }, 300) as unknown as number;
}
</script>

<style lang="scss" scoped></style>
