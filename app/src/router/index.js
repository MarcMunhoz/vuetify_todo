import { createRouter, createWebHistory } from "vue-router";
import Todo from "@/views/Todo.vue";

const routes = [
  {
    path: "/",
    name: "Todo",
    component: Todo,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
