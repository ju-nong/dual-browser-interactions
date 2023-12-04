import { defineStore } from "pinia";

import type { WindowStoreState, WindowStoreActions } from "./type";

export default defineStore<"window", WindowStoreState, any, WindowStoreActions>(
    "window",
    {
        state: () => ({
            open: false,
            $interval: null,
            x: 0,
            y: 0,
        }),
        getters: {},
        actions: {
            setOpen(open) {
                if (this.open && open) {
                    return;
                }

                this.open = open;

                if (!open) {
                    clearInterval(this.$interval);
                }
            },
            handleWindowMove(window) {
                this.$interval = setInterval(() => {
                    const { screenX, screenY } = window;

                    this.x = screenX;
                    this.y = screenY;
                }, 100);
            },
        },
    },
);
