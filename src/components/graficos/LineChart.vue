<script>
import { Line } from "vue-chartjs";
export default {
  name: "LineChart",
  extends: Line,
  data: function() {
    return {
      chartdata: {
        labels: ["Lun.", "Mar.", "Mir.", "Jue.", "Vie.", "Sab.", "Dom."],
        datasets: [
          {
            label: "Auncios Publicados SemanalMente",
            data: [50, 20, 35, 65, 75, 90, 100],
            backgroundColor: "transparent",
            lineTension: 0,
            borderColor: "#ff0000",
            pointBackgroundColor: "#FFFFFF",
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Miles",
              },
            },
          ],
        },
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
