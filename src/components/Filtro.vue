<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header
          :expand-icon="iconoEstado"
          :disable-icon-rotate="storeEstado.length > 0"
        >
          Estado
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox
            v-model="selectedEstado"
            :value="true"
            color="blue"
            dense
            hide-details
            @click="filtro"
          >
            <template v-slot:label>
              Nuevo
              <v-btn
                class=" ml-1"
                x-small
                disabled
                rounded
                :loading="loadingCantidad"
                >{{ cantidadNuevo }}</v-btn
              >
            </template>
          </v-checkbox>
          <v-checkbox
            v-model="selectedEstado"
            :value="false"
            color="blue"
            dense
            hide-details
            @click="filtro"
          >
            <template v-slot:label>
              Usado
              <v-btn
                class=" ml-1"
                x-small
                disabled
                rounded
                :loading="loadingCantidad"
                >{{ cantidadUsado }}</v-btn
              >
            </template>
          </v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          :expand-icon="iconoMarca"
          :disable-icon-rotate="storeMarca.length > 0"
        >
          Marcas
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox
            v-for="(item, index) in marcas"
            :key="index + 'A'"
            v-model="selectedMarcas"
            :value="item"
            color="blue"
            dense
            hide-details
            @click="filtro"
          >
            <template v-slot:label>
              {{ item }}
              <v-btn
                class=" ml-1"
                x-small
                disabled
                rounded
                :loading="loadingCantidad"
                >{{ cantidadMarca[index] }}</v-btn
              >
            </template>
          </v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          :expand-icon="iconoSistema"
          :disable-icon-rotate="storeSistema.length > 0"
        >
          Sistema Operativo
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox
            v-for="(item, index) in sistemaOP"
            :key="index + 'B'"
            v-model="selectedOP"
            :value="item.tipo"
            dense
            hide-details
            @click="filtro"
          >
            <template v-slot:label>
              {{ item.tipo }}
              <v-btn
                class=" ml-1"
                x-small
                disabled
                rounded
                :loading="loadingCantidad"
                >{{ cantidadOP[index] }}</v-btn
              >
            </template>
          </v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          :expand-icon="iconoAlmacenamiento"
          :disable-icon-rotate="storeRom.length > 0"
        >
          Almacenamiento
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox
            v-for="(item, index) in rom"
            :key="index + 'D'"
            v-model="selectedRom"
            :label="item + ' GB'"
            :value="item"
            dense
            hide-details
            @click="filtro"
          >
            <template v-slot:label>
              {{ item }} GB
              <v-btn
                class=" ml-1"
                x-small
                disabled
                rounded
                :loading="loadingCantidad"
                >{{ cantidadRom[index] }}</v-btn
              >
            </template>
          </v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          :expand-icon="iconoRam"
          :disable-icon-rotate="storeRam.length > 0"
        >
          RAM
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox
            v-for="(item, index) in ram"
            :key="index + 'C'"
            v-model="selectedRam"
            :label="item + ' GB'"
            :value="item"
            dense
            hide-details
            @click="filtro"
          >
            <template v-slot:label>
              {{ item }} GB
              <v-btn
                class=" ml-1"
                x-small
                disabled
                rounded
                :loading="loadingCantidad"
                >{{ cantidadRam[index] }}</v-btn
              >
            </template>
          </v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          :expand-icon="iconoPrecio"
          :disable-icon-rotate="
            storePrecioMin != null || storePrecioMax != null
          "
        >
          Precio
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-model.number="precioMin"
            placeholder="Min"
            color="blue"
            type="number"
            dense
            solo
            hide-details
            rounded
            prepend-inner-icon="$"
            filled
          ></v-text-field>
          <v-text-field
            v-model.number="precioMax"
            color="blue"
            placeholder="Max"
            type="number"
            dense
            solo
            prepend-inner-icon="$"
            filled
            rounded
            hide-details
            class="my-2"
          ></v-text-field>
          <v-btn block color="blue darken-4" dark @click="filtro"
            >Aplicar</v-btn
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { db } from "../main.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Filtro",
  data: function() {
    return {
      selectedEstado: [],
      selectedMarcas: [],
      selectedOP: [],
      selectedRam: [],
      selectedRom: [],
      precioMin: null,
      precioMax: null,
      cantidadNuevo: null,
      cantidadUsado: null,
      cantidadMarca: [],
      cantidadOP: [],
      cantidadRam: [],
      cantidadRom: [],
      loadingCantidad: true,
    };
  },
  methods: {
    traerCantidadFiltro() {
      db.collection("anuncios")
        .where("estado", "==", true)
        .get()
        .then((r) => {
          this.cantidadNuevo = r.size;
        });
      db.collection("anuncios")
        .where("estado", "==", false)
        .get()
        .then((r) => {
          this.cantidadUsado = r.size;
        });
      this.marcas.forEach((item) => {
        db.collection("anuncios")
          .where("marca", "==", item)
          .get()
          .then((r) => {
            this.cantidadMarca.push(r.size);
          });
      });
      this.sistemaOP.forEach((item) => {
        db.collection("anuncios")
          .where("sistema", "==", item.tipo)
          .get()
          .then((r) => {
            this.cantidadOP.push(r.size);
          });
      });
      this.ram.forEach((item) => {
        db.collection("anuncios")
          .where("ram", "==", item)
          .get()
          .then((r) => {
            this.cantidadRam.push(r.size);
          });
      });
      this.rom.forEach((item) => {
        db.collection("anuncios")
          .where("rom", "==", item)
          .get()
          .then((r) => {
            this.cantidadRom.push(r.size);
            this.loadingCantidad = false;
          });
      });
    },

    filtro() {
      if (this.precioMin < 0 || this.precioMin == "") {
        this.precioMin = null;
      }
      if (this.precioMax < 0 || this.precioMax == "") {
        this.precioMax = null;
      }
      this.setFiltros({
        estado: this.selectedEstado,
        marca: this.selectedMarcas,
        sistema: this.selectedOP,
        ram: this.selectedRam,
        rom: this.selectedRom,
        precioMin: this.precioMin,
        precioMax: this.precioMax,
      });
    },
    actualizarFiltrosLocal() {
      this.selectedMarcas = this.storeMarca;
      this.selectedEstado = this.storeEstado;
      this.selectedOP = this.storeSistema;
      this.selectedRam = this.storeRam;
      this.selectedRom = this.storeRom;
      this.precioMin = this.storePrecioMin;
      this.precioMax = this.storePrecioMax;
    },
    ...mapMutations(["setFiltros"]),
  },
  created() {
    this.actualizarFiltrosLocal();
    this.traerCantidadFiltro();
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
    ]),
    iconoEstado() {
      if (this.storeEstado.length == 0) {
        return "$expand";
      } else {
        return "far fa-check-square";
      }
    },
    iconoPrecio() {
      if (this.storePrecioMin != null || this.storePrecioMax != null) {
        return "far fa-check-square";
      } else {
        return "$expand";
      }
    },
    iconoMarca() {
      if (this.storeMarca.length == 0) {
        return "$expand";
      } else {
        return "far fa-check-square";
      }
    },
    iconoAlmacenamiento() {
      if (this.storeRom.length == 0) {
        return "$expand";
      } else {
        return "far fa-check-square";
      }
    },
    iconoRam() {
      if (this.storeRam.length == 0) {
        return "$expand";
      } else {
        return "far fa-check-square";
      }
    },
    iconoSistema() {
      if (this.storeSistema.length == 0) {
        return "$expand";
      } else {
        return "far fa-check-square";
      }
    },
  },
};
</script>
