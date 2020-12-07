import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Anuncio from "../views/Anuncio.vue";
import Carrito from "../views/Carrito.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/anuncio/:id",
    name: "Anuncio",
    component: Anuncio,
  },
  {
    path: "/carrito",
    name: "Carrito",
    component: Carrito,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
