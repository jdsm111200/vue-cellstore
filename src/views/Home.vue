<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col md="3" class="d-none d-md-block">
          <v-card class="mb-4">
            <v-card-title class="justify-center text-h5">Filtros</v-card-title>
          </v-card>
          <Filtro v-if="$vuetify.breakpoint.mdAndUp"></Filtro>
        </v-col>
        <v-col>
          <v-btn
            color="blue"
            @click="dialog = true"
            v-if="!$vuetify.breakpoint.mdAndUp"
            elevation="24"
            dark
            fixed
            bottom
            right
            fab
          >
            <i class="fas fa-filter"></i>
          </v-btn>
          <v-dialog v-model="dialog" v-if="!$vuetify.breakpoint.mdAndUp">
            <v-card>
              <v-card-title class="justify-space-between">
                <span>Filtros </span>
                <v-btn @click="dialog = false" icon>
                  <i class="fas fa-times fa-2x"></i>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <Filtro></Filtro>
              </v-card-text>
            </v-card>
          </v-dialog>
          <Anuncios :anuncios="filtro" :loadingData="loadingData"> </Anuncios
        ></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db, st } from "../main.js";
import Anuncios from "@/components/Anuncios.vue";
import Filtro from "@/components/Filtro.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Anuncios,
    Filtro,
  },
  data: function() {
    return {
      anuncios: [],
      anunciosFiltrados: [],
      loadingData: true,
      dialog: false,
    };
  },
  methods: {
    async obtenerAnuncios() {
      var anunciosLocal = [];
      await db
        .collection("anuncios")
        .get()
        .then((r) => {
          var cantidadAnuncios = r.size;
          var contador = 0;
          r.forEach(async (anuncio) => {
            let anuncioData = anuncio.data();
            await st
              .ref()
              .child(anuncio.id + "-img/")
              .list({ maxResults: 1 })
              .then(async (img) => {
                await st
                  .ref()
                  .child(anuncio.id + "-img/" + img.items[0].name)
                  .getDownloadURL()
                  .then((url) => {
                    contador = contador + 1;
                    anuncioData.imagen = url;
                  })
                  .catch((eUrl) => {
                    console.log(eUrl);
                  });
              })
              .catch((eImg) => {
                contador = contador + 1;
                anuncioData.imagen =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
                console.log(eImg);
              });
            if (contador == cantidadAnuncios) {
              this.loadingData = false;
            }
            anuncioData.id = anuncio.id;
            anunciosLocal.push(anuncioData);
          });
        })
        .catch((e) => {
          console.log(e);
        });
      //this.anuncios = anunciosLocal;
      this.anuncios = anunciosLocal;
    },
  },
  created() {
    this.obtenerAnuncios();
  },
  computed: {
    ...mapState([
      "marcas",
      "sistemaOP",
      "ram",
      "rom",
      "storeMarca",
      "storeEstado",
      "storeSistema",
      "storeRam",
      "storeRom",
      "storePrecioMin",
      "storePrecioMax",
      "nuevo",
    ]),
    filtro() {
      var arrayFiltrado = [];
      var condicion = {
        estado: "",
        marca: "",
        sistema: "",
        ram: "",
        rom: "",
        precio: "true",
      };
      var arrayFiltrado = [];
      if (
        this.storeEstado.length > 0 ||
        this.storeMarca.length > 0 ||
        this.storeSistema.length > 0 ||
        this.storeRam.length > 0 ||
        this.storeRom.length > 0 ||
        this.storePrecioMin != null ||
        this.storePrecioMax != null
      ) {
        if (this.storeEstado.length > 0) {
          this.storeEstado.forEach((estado) => {
            condicion.estado = condicion.estado.concat(
              "v['estado']==",
              estado,
              "||"
            );
          });
        } else {
          condicion.estado = "v['estado']==true||v['estado']==false||";
        }
        if (this.storeMarca.length > 0) {
          this.storeMarca.forEach((marca) => {
            condicion.marca = condicion.marca.concat(
              "v['marca']=='",
              marca,
              "'||"
            );
          });
        } else {
          this.marcas.forEach((marca) => {
            condicion.marca = condicion.marca.concat(
              "v['marca']=='",
              marca,
              "'||"
            );
          });
        }
        if (this.storeSistema.length > 0) {
          this.storeSistema.forEach((sistema) => {
            condicion.sistema = condicion.sistema.concat(
              "v['sistema']=='",
              sistema,
              "'||"
            );
          });
        } else {
          this.sistemaOP.forEach((sistema) => {
            condicion.sistema = condicion.sistema.concat(
              "v['sistema']=='",
              sistema.tipo,
              "'||"
            );
          });
        }
        if (this.storeRam.length > 0) {
          this.storeRam.forEach((ram) => {
            condicion.ram = condicion.ram.concat("v['ram']==", ram, "||");
          });
        } else {
          this.ram.forEach((ram) => {
            condicion.ram = condicion.ram.concat("v['ram']==", ram, "||");
          });
        }
        if (this.storeRom.length > 0) {
          this.storeRom.forEach((rom) => {
            condicion.rom = condicion.rom.concat("v['rom']==", rom, "||");
          });
        } else {
          this.rom.forEach((rom) => {
            condicion.rom = condicion.rom.concat("v['rom']==", rom, "||");
          });
        }
        if (this.storePrecioMin != null && this.storePrecioMax == null) {
          condicion.precio = "v['precio']>=" + this.storePrecioMin;
        } else if (this.storePrecioMax != null && this.storePrecioMin == null) {
          condicion.precio = "v['precio']<=" + this.storePrecioMax;
        } else if (this.storePrecioMin != null && this.storePrecioMax != null) {
          condicion.precio =
            "v['precio']>=" +
            this.storePrecioMin +
            " && " +
            "v['precio']<=" +
            this.storePrecioMax;
        } else {
          condicion.precio = "true";
        }
        condicion.estado = condicion.estado.substring(
          0,
          condicion.estado.length - 2
        );
        condicion.marca = condicion.marca.substring(
          0,
          condicion.marca.length - 2
        );
        condicion.sistema = condicion.sistema.substring(
          0,
          condicion.sistema.length - 2
        );
        condicion.ram = condicion.ram.substring(0, condicion.ram.length - 2);
        condicion.rom = condicion.rom.substring(0, condicion.rom.length - 2);
        arrayFiltrado = this.anuncios.filter(function(v, i) {
          return (
            eval(condicion.estado) &&
            eval(condicion.marca) &&
            eval(condicion.sistema) &&
            eval(condicion.ram) &&
            eval(condicion.rom) &&
            eval(condicion.precio)
          );
        });
        return arrayFiltrado;
      } else {
        return this.anuncios;
      }
    },
  },
  watch: {
    nuevo: function(val) {
      this.loadingData = true;
      this.obtenerAnuncios();
    },
  },
};
</script>
