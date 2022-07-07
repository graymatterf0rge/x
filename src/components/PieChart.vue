<template>
  <div style="max-width: 400px">
    <vue3-chart-js v-bind="{ ...pieChart }" />
  </div>
</template>

<script setup>
  import Vue3ChartJs from "@j-t-mcc/vue3-chartjs"
  const pieChart = {
    type: "pie",
    data: {
      labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: [40, 20, 80, 10],
        },
      ],
    },
  }  
</script>