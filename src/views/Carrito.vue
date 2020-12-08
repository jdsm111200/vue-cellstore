<template>
  <div class="Carrito">
    <v-container fluid>
      <h1>Articulos en el Carrito</h1>
      <v-card
        v-for="(articulo, index) in carrito"
        :key="articulo.id + '-m'"
        class="my-2  d-sm-none"
      >
        <v-row>
          <v-col cols="5">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none"
            >
              <v-img
                :src="articulo.imagen"
                height="120"
                width="120"
                class=" mx-auto my-auto rounded"
              ></v-img>
            </router-link>
          </v-col>
          <v-col cols="7">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none black--text"
            >
              <v-row class="mr-auto ">{{
                articulo.titulo.substring(0, 49).concat("...")
              }}</v-row>
            </router-link>
            <v-row class=" text-caption font-weight-light d-flex aling-center">
              <span>Vendedor :</span>
              <v-chip small pill class="mx-1">
                <i class="far fa-user mr-2"></i>
                <span>{{ articulo.vendedor }}</span>
              </v-chip>
            </v-row>
            <v-row class=" text-caption font-weight-light">
              <span>Tel: {{ articulo.telefono }}</span>
            </v-row>
            <v-row class=" text-caption font-weight-light">
              Estado : {{ articulo.estado ? "Nuevo" : "Usado" }}
            </v-row>
            <v-row>${{ articulo.precio }}</v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex flex-column">
            <v-row><span class="mx-auto font-weight-bold">Cantidad</span></v-row>
            <v-row>
              <v-btn-toggle class="mx-auto">
                <v-btn
                  :class="{ red: articulo.cantidad == 1 }"
                  :dark="articulo.cantidad == 1"
                  @click="quitar(articulo.id, index)"
                >
                  <i
                    :class="
                      articulo.cantidad > 1
                        ? 'fas fa-minus'
                        : 'fas fa-trash-alt fa-2x'
                    "
                  ></i>
                </v-btn>
                <v-avatar tile style=" border: 1px solid #E0E0E0;">{{
                  articulo.cantidad
                }}</v-avatar>
                <v-btn @click="agregarCantidad(articulo.id)">
                  <i class="fas fa-plus"></i>
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
          <v-col cols="6" class="d-flex flex-column">
            <v-row><span class="mx-auto font-weight-bold">Subtotal</span></v-row>
            <v-row class="text-h5">
              <span class="mx-auto">$ {{ articulo.subTotal }} </span>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        v-for="(articulo, index) in carrito"
        :key="articulo.id + '-t'"
        class="my-2  d-none d-sm-flex d-md-none"
      >
        <v-row>
          <v-col sm="4">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none"
            >
              <v-img
                :src="articulo.imagen"
                height="150"
                width="150"
                class=" mx-auto my-auto rounded"
              ></v-img>
            </router-link>
          </v-col>
          <v-col sm="8">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none black--text"
            >
              <v-row class="mr-auto">{{
                articulo.titulo.substring(0, 49).concat("...")
              }}</v-row>
            </router-link>
            <v-row>${{ articulo.precio }}</v-row>
            <v-row class=" text-caption font-weight-light d-flex aling-center">
              <span>Vendedor :</span>
              <v-chip small pill class="mx-1">
                <i class="far fa-user mr-2"></i>
                <span>{{ articulo.vendedor }}</span>
              </v-chip>
              <span>Tel: {{ articulo.telefono }}</span>
            </v-row>
            <v-row class=" text-caption font-weight-light">
              Estado : {{ articulo.estado ? "Nuevo" : "Usado" }}
            </v-row>
            <v-row>
              <v-col cols="6" class="d-flex flex-column">
                <v-row><span class="mx-auto font-weight-bold">Cantidad</span></v-row>
                <v-row>
                  <v-btn-toggle class="mx-auto">
                    <v-btn
                      :class="{ red: articulo.cantidad == 1 }"
                      :dark="articulo.cantidad == 1"
                      @click="quitar(articulo.id, index)"
                    >
                      <i
                        :class="
                          articulo.cantidad > 1
                            ? 'fas fa-minus'
                            : 'fas fa-trash-alt fa-2x'
                        "
                      ></i>
                    </v-btn>
                    <v-avatar tile style=" border: 1px solid #E0E0E0;">{{
                      articulo.cantidad
                    }}</v-avatar>
                    <v-btn @click="agregarCantidad(articulo.id)">
                      <i class="fas fa-plus"></i>
                    </v-btn>
                  </v-btn-toggle>
                </v-row>
              </v-col>
              <v-col cols="6" class="d-flex flex-column">
                <v-row><span class="mx-auto font-weight-bold">Subtotal</span></v-row>
                <v-row class="text-h5">
                  <span class="mx-auto">$ {{ articulo.subTotal }} </span>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        v-for="(articulo, index) in carrito"
        :key="articulo.id"
        class="my-2 d-none d-md-flex"
      >
        <v-row>
          <v-col cols="3">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none"
            >
              <v-img
                :src="articulo.imagen"
                height="175"
                width="175"
                class=" mx-auto my-auto rounded"
              ></v-img>
            </router-link>
          </v-col>
          <v-col md="5">
            <router-link
              :to="{ name: 'Anuncio', params: { id: articulo.id } }"
              class="text-decoration-none"
            >
              <v-row class="text-h6 black--text">{{ articulo.titulo }}</v-row>
            </router-link>
            <v-row class=" text-caption font-weight-light d-flex aling-center">
              <span>Vendedor :</span>
              <v-chip small pill class="mx-1">
                <i class="far fa-user mr-2"></i>
                <span>{{ articulo.vendedor }}</span>
              </v-chip>
              <span>Tel: {{ articulo.telefono }}</span>
            </v-row>
            <v-row class=" text-caption font-weight-light">
              Estado : {{ articulo.estado ? "Nuevo" : "Usado" }}
            </v-row>
            <v-row class="mt-1 text-subtitle-1">$ {{ articulo.precio }}</v-row>
          </v-col>
          <v-col md="2" class="d-flex flex-column">
            <v-row
              ><span class="mx-auto font-weight-bold">Cantidad</span></v-row
            >
            <v-row>
              <v-btn-toggle class="mx-auto">
                <v-btn
                  :class="{ red: articulo.cantidad == 1 }"
                  :dark="articulo.cantidad == 1"
                  @click="quitar(articulo.id, index)"
                >
                  <i
                    :class="
                      articulo.cantidad > 1
                        ? 'fas fa-minus'
                        : 'fas fa-trash-alt fa-2x'
                    "
                  ></i>
                </v-btn>
                <v-avatar tile style=" border: 1px solid #E0E0E0;">{{
                  articulo.cantidad
                }}</v-avatar>
                <v-btn @click="agregarCantidad(articulo.id)">
                  <i class="fas fa-plus"></i>
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
          <v-col md="2" class="d-flex flex-column">
            <v-row
              ><span class="mx-auto font-weight-bold">Subtotal</span></v-row
            >
            <v-row class="text-h5">
              <span class="mx-auto">$ {{ articulo.subTotal }} </span>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-row>
        <v-col class="text-right text-h4"
          >Total a Pagar: $ {{ totalAPagar }}</v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Carrito",
  data: () => {
    return {
      subTotal: [],
      carritoLocal: [],
    };
  },
  methods: {
    ...mapMutations(["agregarCantidad", "quitarCantidad", "quitarArticulo"]),
    quitar(id, index) {
      if (this.carrito[index].cantidad > 1) {
        this.quitarCantidad(id);
      } else {
        this.quitarArticulo(index);
      }
    },
  },
  computed: {
    ...mapState(["carrito"]),
    totalAPagar() {
      var total = 0;
      this.carrito.forEach((item) => {
        total = total + item.cantidad * item.precio;
      });
      return parseFloat(Math.round(total * 100) / 100).toFixed(2);
    },
  },
};
</script>
