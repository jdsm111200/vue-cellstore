<template>
  <div class="Estadisticas">
    <v-container>
      <h1>Estadisticas</h1>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="justify-center">
              Top Marcas Vendidas
            </v-card-title>
            <v-card-text>
              <BarChart />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="justify-center">
              Top 2 Celulares
            </v-card-title>
            <v-card-text>
              <RadarChart />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="justify-center">
              Ventas segun precio
            </v-card-title>
            <v-card-text>
              <PieChart />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="justify-center">
              Anuncios Publicados Semanalmente
            </v-card-title>
            <v-card-text>
              <LineChart />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LineChart from "@/components/graficos/LineChart.vue";
import BarChart from "@/components/graficos/BarChart.vue";
import RadarChart from "@/components/graficos/RadarChart.vue";
import PieChart from "@/components/graficos/PieChart.vue";
export default {
  name: "Estadisticas",
  components: {
    LineChart,
    BarChart,
    RadarChart,
    PieChart,
  },
  data: function() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
