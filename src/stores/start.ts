import { defineStore } from "pinia";

import type { WindowStoreState, WindowStoreActions } from "./type.d";

export default defineStore<"start", WindowStoreState, any, WindowStoreActions>(
    "start",
    {
        state: () => ({
            open: false,
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
            },
            setPosition(x, y) {
                this.x = x;
                this.y = y;
            },
        },
    },
);
