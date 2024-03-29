import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    marcas: [
      "Samsung",
      "Xiaomi",
      "Apple",
      "Nokia",
      "Huawei",
      "Google",
      "LG",
      "Motorola",
      "Oppo",
      "Otro",
    ],
    sistemaOP: [
      { tipo: "Android", version: [4, 5, 6, 7, 8, 9, 10, 11] },
      { tipo: "IOS", version: [3, 4, 5, 6, 7, 8, 10, 12, 13, 14] },
    ],
    ram: [1, 2, 3, 4, 6, 8],
    rom: [16, 32, 64, 128, 256, 512],
    busqueda: "",
    nuevo: false,
    carrito: [],
    cantidad: 0,
    storeEstado: [],
    storeMarca: [],
    storeSistema: [],
    storeRam: [],
    storeRom: [],
    storePrecioMin: null,
    storePrecioMax: null,
    storeSnackbar: false,
  },
  mutations: {
    nuevoAnuncio(state) {
      state.nuevo = !state.nuevo;
    },
    setBusqueda(state, busqueda) {
      state.busqueda = busqueda.data;
      console.log(busqueda.path);
      if (busqueda.path != "/") {
        router.push("/");
      }
    },
    setSnackbar(state) {
      state.storeSnackbar = false;
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
          state.carrito[index].subTotal = parseFloat(
            Math.round(
              state.carrito[index].cantidad * state.carrito[index].precio * 100
            ) / 100
          ).toFixed(2);
        } else {
          anuncio.cantidad = 1;
          anuncio.subTotal = parseFloat(
            Math.round(anuncio.cantidad * anuncio.precio * 100) / 100
          ).toFixed(2);
          state.carrito.push(anuncio);
        }
      } else {
        anuncio.cantidad = 1;
        anuncio.subTotal = parseFloat(
          Math.round(anuncio.cantidad * anuncio.precio * 100) / 100
        ).toFixed(2);
        state.carrito.push(anuncio);
      }
      state.storeSnackbar = true;
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
    agregarCantidad(state, id) {
      var carritoLocal = state.carrito;
      carritoLocal.forEach((articulo) => {
        if (articulo.id == id) {
          articulo.cantidad = articulo.cantidad + 1;
          articulo.subTotal = parseFloat(
            Math.round(articulo.cantidad * articulo.precio * 100) / 100
          ).toFixed(2);
        }
      });
      state.carrito = carritoLocal.slice();
      this.commit("cantidadDeArticulos");
    },
    quitarCantidad(state, id) {
      var carritoLocal = state.carrito;
      carritoLocal.forEach((articulo) => {
        if (articulo.id == id) {
          articulo.cantidad = articulo.cantidad - 1;
          articulo.subTotal = parseFloat(
            Math.round(articulo.cantidad * articulo.precio * 100) / 100
          ).toFixed(2);
        }
      });
      state.carrito = carritoLocal.slice();
      console.log(state.carrito);
      this.commit("cantidadDeArticulos");
    },
    quitarArticulo(state, index) {
      state.carrito.splice(index, 1);
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
