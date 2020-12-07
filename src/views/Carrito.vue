<template>
  <div class="Carrito">
    <v-container>
      <h1>Articulos en el Carrito</h1>

      <v-card
        v-for="(articulo, index) in carrito"
        :key="articulo.id"
        class="my-2"
      >
        <v-row>
          <v-col cols="2">
            <v-img
              :src="articulo.imagen"
              height="150"
              width="150"
              class=" mx-auto my-auto rounded"
            ></v-img>
          </v-col>
          <v-col cols="6">
            <v-row>{{ articulo.titulo }}</v-row>
            <v-row>${{ articulo.precio }}</v-row>
          </v-col>
          <v-col  cols="2" class="d-flex flex-column">
            <v-row><span class="mx-auto">Cantidad</span></v-row>
            <v-row>
              <v-btn-toggle class="mx-auto">
                <v-btn :class="{'red':articulo.cantidad==1}" :dark="articulo.cantidad==1">
                  <i :class="articulo.cantidad>1?'fas fa-minus':'fas fa-trash-alt fa-2x'"></i>
                </v-btn>
                <v-avatar tile style=" border: 1px solid #E0E0E0;">{{
                  articulo.cantidad
                }}</v-avatar>
                <v-btn>
                  <i class="fas fa-plus"></i>
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
          <v-col cols="2" class="d-flex flex-column">
            <v-row><span class="mx-auto">Subtotal</span></v-row>
            <v-row class="text-h5">
              <span class="mx-auto">$ {{ subTotal[index] }} </span>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-row>
        <v-spacer></v-spacer>
        <v-col class="text-right text-h4">Total a Pagar: $ {{ totalAPagar }}</v-col>
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
    };
  },
  methods: {
    calcularSubTotal() {
      this.carrito.forEach((item) => {
        this.subTotal.push(item.cantidad * item.precio);
      });
    },
  },
  computed: {
    ...mapState(["carrito"]),
    totalAPagar() {
      var total = 0;
      this.carrito.forEach((item) => {
        total = total + item.cantidad * item.precio;
      });
      return total;
    },
  },
  created() {
    console.log(this.carrito);
    this.calcularSubTotal();
  },
};
</script>
