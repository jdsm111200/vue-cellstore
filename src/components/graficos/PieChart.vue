<script>
import { Pie } from "vue-chartjs";
export default {
  name: "PieChart",
  extends: Pie,
  data: function() {
    return {
      chartdata: {
        labels: [
          "$ 100",
          "$ 200",
          "$ 300",
          "$ 400",
          "$ 500",
          "$ 600",
          "$ 700+",
        ],
        datasets: [
          {
            label: "Rango de precios",
            data: [20, 35, 15, 10, 10, 5, 5],
            backgroundColor: [
              "#00a5e3",
              "#ffd872",
              "#8dd7bf",
              "#fc6238",
              "#c05780",
              "#ffa23a",
              "#4dd091",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
