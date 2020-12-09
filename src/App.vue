<template>
  <v-app>
    <v-app-bar app color="blue" dark>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="d-md-none"
      ></v-app-bar-nav-icon>
      <div class="d-none d-md-inline ml-5 mr-3">
        <router-link
          to="/"
          class="text-decoration-none white--text d-flex align-center "
        >
          <i class="fas fa-mobile-alt fa-3x d-block"></i>
          <span class="ml-2 text-h4 font-weight-black d-block">CellStore</span>
        </router-link>
      </div>
      <v-text-field
        v-model="search"
        placeholder="Buscar"
        hide-details
        outlined
        rounded
        filled
        dense
        color="white"
        @keyup.enter="setBusqueda({ data: search, path: $route.path })"
      >
      </v-text-field>
      <v-btn
        :ripple="false"
        icon
        @click="setBusqueda({ data: search, path: $route.path })"
        ><i class="fas fa-search fa-2x"></i
      ></v-btn>
      <v-btn-toggle title group>
        <v-btn :ripple="false" to="/" class="d-none d-md-flex">Inicio</v-btn>
        <v-btn :ripple="false" to="/estadisticas" class="d-none d-md-flex"
          >Estadisticas</v-btn
        >
        <v-btn class="icon" :ripple="false" to="/carrito">
          <v-badge color="red" :content="cantidad == 0 ? '0' : cantidad">
            <i class="fas fa-shopping-cart fa-2x"></i>
          </v-badge>
        </v-btn>
      </v-btn-toggle>
      <CrearAnuncio class="ml-2" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary dark>
      <div class="mt-7 mb-7">
        <router-link
          to="/"
          class="text-decoration-none white--text text-center"
        >
          <i class="fas fa-mobile-alt fa-5x d-block mb-1"></i>
          <span class="ml-2 text-h4 font-weight-black d-block">CellStore</span>
        </router-link>
      </div>
      <v-list>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-icon>
              <i class="fas fa-home"></i>
            </v-list-item-icon>
            <v-list-item-content>Inicio</v-list-item-content>
          </v-list-item>
          <v-list-item to="/estadisticas">
            <v-list-item-icon>
              <i class="fas fa-chart-bar"></i>
            </v-list-item-icon>
            <v-list-item-content>Estadisticas</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
    <v-footer dark padless>
      <v-card
        flat
        tile
        class="blue-grey darken-4 white--text text-center"
        width="100%"
      >
        <v-card-text>
          <v-btn class="mx-4 white--text" icon>
            <i class="fab fa-facebook fa-2x"></i>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <i class="fab fa-linkedin fa-2x"></i>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <i class="fab fa-twitter fa-2x"></i>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <i class="fab fa-instagram fa-2x"></i>
          </v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <i
            class="fab fa-amazon  mx-5"
            :class="{ 'fa-3x': $vuetify.breakpoint.smAndDown }"
          ></i>
          <i
            class="fab fa-android  mx-5"
            :class="{ 'fa-3x': $vuetify.breakpoint.smAndDown }"
          ></i>
          <i
            class="fab fa-apple  mx-5"
            :class="{ 'fa-3x': $vuetify.breakpoint.smAndDown }"
          ></i>
          <i
            class="fab fa-ebay  mx-5"
            :class="{ 'fa-3x': $vuetify.breakpoint.smAndDown }"
          ></i>
          <i
            class="fab fa-google  mx-5"
            :class="{ 'fa-3x': $vuetify.breakpoint.smAndDown }"
          ></i>
          <i
            class="fab fa-js-square  mx-5"
            :class="{ 'fa-3x': $vuetify.breakpoint.smAndDown }"
          ></i>
          <i
            class="fab fa-node  mx-5"
            :class="{ 'fa-3x': $vuetify.breakpoint.smAndDown }"
          ></i>
          <i
            class="fab fa-paypal  mx-5"
            :class="{ 'fa-3x': $vuetify.breakpoint.smAndDown }"
          ></i>
        </v-card-text>
        <v-card-text class="blue darken-4">
          Desarrollado por <strong>José Daniel Sandoval Mejía</strong>
        </v-card-text>
        <v-card-text class="blue darken-4">
          {{ new Date().getFullYear() }} — <i class="far fa-copyright"></i>
          <strong>All Right Reserved</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import CrearAnuncio from "@/components/CrearAnuncio.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    CrearAnuncio,
  },
  data: () => ({
    drawer: false,
    search: "",
  }),
  methods: {
    ...mapMutations(["setBusqueda"]),
  },
  computed: {
    ...mapState(["cantidad"]),
  },
};
</script>
