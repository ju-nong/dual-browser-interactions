import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { TheMain, WindowStart, WindowEnd } from "../components";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "MAIN",
        component: TheMain,
    },
    {
        path: "/start",
        name: "START",
        component: WindowStart,
    },
    {
        path: "/end",
        name: "END",
        component: WindowEnd,
    },
];

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
        return { left: 0, top: 0 };
    },
    routes,
});

export default router;
