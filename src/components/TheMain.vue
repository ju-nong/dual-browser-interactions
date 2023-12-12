<template>
    <div>
        <button @click="handleOpenWindow('start')">화살표 1 열기</button>
        <button @click="handleOpenWindow('end')">화살표 2 열기</button>
    </div>

    <p>
        <span> 렉가거나 끊기면 니 컴 or 브라우저 문제 ㅅㄱ </span>
        <br />
        © 2023
        <a
            href="https://github.com/ju-nong/dual-window-interactions"
            target="_blank"
            >ju-nong </a
        >. All rights reserved.
    </p>
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
        const { screenX, screenY, innerWidth, innerHeight } = $window.end;

        return { screenX, screenY, innerWidth, innerHeight };
    } else if (currentType === "end" && $window.start !== null) {
        const { screenX, screenY, innerWidth, innerHeight } = $window.start;

        return { screenX, screenY, innerWidth, innerHeight };
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
    }, 10) as unknown as number;
}
</script>

<style lang="scss" scoped>
div {
    display: flex;
    column-gap: 2rem;

    > button {
        padding: 8px 16px;
        border-radius: 0.5rem;
        cursor: pointer;
    }
}

p {
    text-align: center;
    position: absolute;
    bottom: 2rem;
    left: 50%;
    font-size: 0.75rem;
    transform: translate(-50%);
    white-space: nowrap;

    > span {
        color: #e1e1e1;
        text-decoration: line-through;
    }

    > a {
        text-decoration: underline;
    }
}
</style>
