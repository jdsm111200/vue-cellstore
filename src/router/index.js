import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Anuncio from "../views/Anuncio.vue";
import Carrito from "../views/Carrito.vue";
import Estadisticas from "../views/Estadisticas.vue";

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
  {
    path: "/estadisticas",
    name: "Estadisticas",
    component: Estadisticas,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
