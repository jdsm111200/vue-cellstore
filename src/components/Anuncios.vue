<template>
  <div>
    <v-data-iterator
      :items="anuncios"
      :search="busqueda"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :loading="loadingData"
      hide-default-footer
    >
      <template v-slot:loading class="text-center">
        <v-text-field color="blue darken-4" loading disabled></v-text-field>
        <p class="text-center">Cargando Datos...</p>
      </template>
      <template v-slot:header>
        <v-toolbar flat>
          <span class="ml-auto">Items por Pagina:</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="blue darken-4"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <i class="fas fa-chevron-down"></i>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <span>Ordenar Por:</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="blue darken-4"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ sortBy }}
                <i class="fas fa-chevron-down"></i>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in keys"
                :key="index"
                @click="updateSortBy(item)"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            color="blue darken-4"
            :class="{ 'mr-auto': !$vuetify.breakpoint.mdAndUp }"
            dark
            :small="!$vuetify.breakpoint.mdAndUp"
            depressed
            @click="sortDesc = !sortDesc"
          >
            <i
              :class="
                sortDesc
                  ? 'fas fa-sort-numeric-down fa-2x'
                  : 'fas fa-sort-numeric-up fa-2x'
              "
            ></i>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="anuncio in props.items"
            :key="anuncio.id"
            cols="12"
            sm="6"
            md="12"
          >
            <v-card>
              <v-skeleton-loader
                class="mx-auto d-none d-md-block"
                type="article"
                height="300"
                v-if="loadingData"
              ></v-skeleton-loader>
              <v-skeleton-loader
                class="mx-auto d-md-none"
                type="image, article, actions"
                height="580"
                v-if="loadingData"
              ></v-skeleton-loader>
              <div
                :class="{
                  'd-flex flex-no-wrap justify-space-between':
                    $vuetify.breakpoint.mdAndUp,
                }"
                v-if="!loadingData"
              >
                <div>
                  <router-link
                    :to="{ name: 'Anuncio', params: { id: anuncio.id } }"
                    class="text-decoration-none black--text"
                  >
                    <v-img
                      height="250"
                      class="rounded d-md-none"
                      :src="anuncio.imagen"
                      lazy-src="https://wallpaperaccess.com/full/1285990.jpg"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>

                    <v-card-title class="headline">
                      {{
                        $vuetify.breakpoint.mdAndUp
                          ? anuncio.titulo
                          : anuncio.titulo.substring(0, 49).concat("...")
                      }}
                    </v-card-title>
                  </router-link>
                  <v-card-text>
                    <v-row align="center" class="mx-0">
                      <v-rating
                        :value="Math.floor(Math.random() * (6 - 1) + 1)"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>
                      <div class="grey--text ml-4">
                        ({{ Math.floor(Math.random() * 10000) }})
                      </div>
                    </v-row>
                    <v-row align="center" class="mx-0 my-2">
                      <v-chip small pill>
                        <i class="far fa-user mr-2"></i>
                        <span>{{ anuncio.vendedor }}</span>
                      </v-chip>
                    </v-row>
                    <v-row class=" mx-0 my-2 d-flex aling-self-start">
                      <span class="text-h4"> $ {{ anuncio.precio }}</span>
                      <span
                        class="text-subtitle-2  text-decoration-line-through ml-1"
                        >$
                        {{
                          Number(anuncio.precio) +
                            Math.floor(Math.random() * 11)
                        }}</span
                      >
                    </v-row>
                    <v-row class="mx-0 mt-2 text-caption font-weight-light">
                      Estado : {{ anuncio.estado ? "Nuevo" : "Usado" }}
                    </v-row>
                    <v-row class="mx-0 text-caption font-weight-light">
                      <div class="d-flex align-center">
                        <i
                          class="fas fa-map-marker-alt"
                          style="color:#9E9E9E"
                        ></i>
                        <span class="ml-1">Envios a El Salvador</span>
                      </div>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      color="deep-orange"
                      dark
                      :block="!$vuetify.breakpoint.mdAndUp"
                      @click="agregarAlCarrito1(anuncio)"
                    >
                      <i class="fas fa-shopping-cart"></i>Agregar al carrito
                    </v-btn>
                  </v-card-actions>
                </div>
                <router-link
                  :to="{ name: 'Anuncio', params: { id: anuncio.id } }"
                  class="text-decoration-none black--text"
                >
                  <v-avatar
                    class="ma-3 rounded d-none d-md-flex"
                    size="270"
                    tile
                  >
                    <v-img
                      :src="anuncio.imagen"
                      lazy-src="https://wallpaperaccess.com/full/1285990.jpg"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-avatar>
                </router-link>
              </div>
            </v-card> </v-col
        ></v-row>
      </template>
      <template v-slot:footer>
        <v-pagination
          v-model="page"
          :length="numberOfPages"
          :total-visible="5"
          color="blue darken-4"
          circle
          dark
        ></v-pagination>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Anuncios",
  props: {
    anuncios: {
      type: Array,
      default: () => [],
    },
    loadingData: {
      type: Boolean,
      default: true,
    },
  },
  data: function() {
    return {
      itemsPerPageArray: [5, 10, 15, 20],
      filter: {},
      sortDesc: true,
      page: 1,
      itemsPerPage: 10,
      sortBy: "fecha",
      keys: ["Fecha", "Precio"],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.anuncios.length / this.itemsPerPage);
    },
    ...mapState(["busqueda"]),
  },
  methods: {
    ...mapMutations(["agregarAlCarrito1"]),
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    updateSortBy(item) {
      this.sortBy = item;
    },
  },
};
</script>
