import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    marcas: ["Samsung", "Xiaomi", "Apple", "Nokia", "Huawei", "Otro"],
    sistemaOP: [
      { tipo: "Android", version: [4, 5, 6, 7, 8, 9, 10, 11] },
      { tipo: "IOS", version: [3, 4, 5, 6, 7, 8, 10, 12, 13, 14] },
    ],
    ram: [1, 2, 3, 4, 6, 8],
    rom: [16, 32, 64, 128, 256, 512],
    busqueda: "",
    carrito: [],
    cantidad: 0,
    path: null,
    storeEstado: [],
    storeMarca: [],
    storeSistema: [],
    storeRam: [],
    storeRom: [],
    storePrecioMin: null,
    storePrecioMax: null,
  },
  mutations: {
    setBusqueda(state, busqueda) {
      state.busqueda = busqueda.data;
      console.log(busqueda.path);
      if (busqueda.path != "/") {
        router.push("/");
      }
    },
    setFiltros(state, filtro) {
      state.storeEstado = filtro.estado;
      state.storeMarca = filtro.marca;
      state.storeSistema = filtro.sistema;
      state.storeRam = filtro.ram;
      state.storeRom = filtro.rom;
      state.storePrecioMin = filtro.precioMin;
      state.storePrecioMax = filtro.precioMax;
    },
    agregarAlCarrito1(state, anuncio) {
      if (state.carrito.length > 0) {
        if (state.carrito.some((i) => i.id == anuncio.id)) {
          let index = state.carrito.map((i) => i.id).indexOf(anuncio.id);
          state.carrito[index].cantidad = state.carrito[index].cantidad + 1;
        } else {
          anuncio.cantidad = 1;
          state.carrito.push(anuncio);
        }
      } else {
        anuncio.cantidad = 1;
        state.carrito.push(anuncio);
      }
      this.commit("cantidadDeArticulos");
      console.log(state.carrito);
    },
    agregarAlCarrito2(state, anuncio) {
      var anuncioLocal = anuncio.data;
      anuncioLocal.imagen = anuncio.url;
      anuncioLocal.id = anuncio.id;
      console.log(anuncio.id);
      this.commit("agregarAlCarrito1", anuncioLocal);
      this.commit("cantidadDeArticulos");
    },
    cantidadDeArticulos(state) {
      var cantidad = 0;
      console.log("cantidad");
      state.carrito.forEach((c) => {
        cantidad = Number(c.cantidad) + Number(cantidad);
      });
      state.cantidad = cantidad;
    },
  },
  getters: {},
  actions: {},
  modules: {},
});
