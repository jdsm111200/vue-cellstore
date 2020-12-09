<template>
  <div class="Anuncio">
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <v-card>
            <v-carousel cycle :interval="5000">
              <v-carousel-item
                v-for="(url, index) in imagenes"
                :src="url"
                lazy-src="https://wallpaperaccess.com/full/1285990.jpg"
                :key="index"
              >
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col cols="12" md="7">
          <v-skeleton-loader
            class="mx-auto"
            type="article"
            height="300"
            v-if="loadingData"
          ></v-skeleton-loader>
          <v-card v-if="!loadingData">
            <v-card-title>
              {{ anuncio.titulo }}
            </v-card-title>
            <v-card-text>
              <v-row
                class="mx-0 mt-2 text-caption font-weight-light d-flex aling-center"
              >
                <span>Vendedor :</span>
                <v-chip small pill class="mx-1">
                  <i class="far fa-user mr-2"></i>
                  <span>{{ anuncio.vendedor }}</span>
                </v-chip>
                <span>Tel: {{ anuncio.telefono }}</span>
              </v-row>
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
              <v-row class="mx-0 text-caption font-weight-light">
                <div class="d-flex align-center">
                  <i class="fas fa-map-marker-alt" style="color:#9E9E9E"></i>
                  <span class="ml-1">Envios a El Salvador</span>
                </div>
              </v-row>
              <v-row class="mx-0 text-caption font-weight-light">
                Estado : {{ anuncio.estado ? "Nuevo" : "Usado" }}
              </v-row>
              <v-row class="mx-0  mt-5 d-flex aling-self-start">
                <span class="text-h3">$ {{ anuncio.precio }}</span>
                <span class="text-subtitle-1 text-decoration-line-through ml-1"
                  >$ {{ precioSinDescuento }}</span
                >
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-btn
                block
                @click="
                  agregarAlCarrito2({
                    id: $route.params.id,
                    data: anuncio,
                    url: imagenes[0],
                  })
                "
              >
                <span>Agregar al Carrito</span>
                <i class="fas fa-shopping-cart mr-1"></i
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            :class="{ 'd-flex aling-center': $vuetify.breakpoint.mdAndUp }"
          >
            <v-card-text>
              <p class="text-h5 black--text">Especificaciones:</p>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td>
                        Estado:
                      </td>
                      <td>
                        {{ anuncio.estado ? "Nuevo" : "Usado" }}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Marca:
                      </td>
                      <td>
                        {{ anuncio.marca }}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Sistema Operativo:
                      </td>
                      <td>{{ anuncio.sistema }} {{ anuncio.version }}</td>
                    </tr>
                    <tr>
                      <td>
                        Almacenamiento:
                      </td>
                      <td>{{ anuncio.rom }} GB</td>
                    </tr>
                    <tr>
                      <td>
                        Memoria Ram:
                      </td>
                      <td>{{ anuncio.ram }} GB</td>
                    </tr>
                    <tr>
                      <td>
                        Pantalla:
                      </td>
                      <td>{{ anuncio.pantalla }} in</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-divider vertical inset class="d-none d-md-inline"></v-divider>
            <v-card-text>
              <p class="text-h5">Descripcion:</p>
              <p>{{ anuncio.descripcion }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
I
<script>
import { db, st } from "../main.js";
import { mapMutations } from "vuex";

export default {
  name: "Anuncio",
  data: function() {
    return {
      anuncio: {},
      imagenes: [],
      precioSinDescuento: null,
      loadingData: true,
    };
  },
  methods: {
    ...mapMutations(["agregarAlCarrito2"]),
    async obtenerAcuncio() {
      await db
        .collection("anuncios")
        .doc(this.$route.params.id)
        .get()
        .then((r) => {
          this.anuncio = r.data();
        })
        .catch((e) => {
          console.log(e);
        });
      await st
        .ref()
        .child(this.$route.params.id + "-img/")
        .listAll()
        .then(async (img) => {
          img.items.forEach((imgPath) => {
            st.ref()
              .child(imgPath.fullPath)
              .getDownloadURL()
              .then((url) => {
                this.imagenes.push(url);
              })
              .catch((e) => {
                console.log(e);
              });
          });
          if (img.items.length == 0) {
            this.imagenes.push(
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
            );
          }
        })
        .catch((eUrl) => {
          console.log(eUrl);
        });
      this.precioSinDescuento =
        Number(this.anuncio.precio) + Math.floor(Math.random() * 11);
      this.loadingData = false;
    },
  },
  created() {
    this.obtenerAcuncio();
  },
};
</script>

<!--<style scoped>
.v-data-table
  /deep/
  tbody
  /deep/
  tr:hover:not(.v-data-table__expanded__content) {
  background: #ffffff !important;
}
</style>-->
<style lang="scss" scoped>
.v-divider--inset {
  max-width: initial !important;
  max-height: initial !important;
  &:not(.v-divider--vertical) {
    margin-top: -1px !important;
    margin-left: 8px !important;
    margin-right: 8px !important;
  }
  &.v-divider--vertical {
    margin-left: -1px !important;
    margin-bottom: 8px !important;
  }
}
</style>
