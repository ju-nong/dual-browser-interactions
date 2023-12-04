import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { TheMain, TheWindow } from "../components";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "MAIN",
        component: TheMain,
    },
    {
        path: "/start",
        name: "START",
        component: TheWindow,
    },
    {
        path: "/end",
        name: "END",
        component: TheWindow,
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
