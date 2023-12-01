import { defineStore } from "pinia";

import type { WindowStoreState, WindowStoreActions } from "./type.d";

export default defineStore<"start", WindowStoreState, any, WindowStoreActions>(
    "start",
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

                if (open) {
                    this.$interval = setInterval(() => {
                        const { screenX, screenY } = window;

                        this.x = screenX;
                        this.y = screenY;
                    }, 300);
                } else {
                    clearInterval(this.$interval);
                }
            },
            setPosition(x, y) {
                this.x = x;
                this.y = y;
            },
        },
    },
);
