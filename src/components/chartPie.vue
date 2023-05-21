<script setup>
import { defineComponent } from "vue";

const props = defineProps({chart : null});

</script>



<template>
     <apexchart type="donut" width="200" :options="chart.chartOptions" :series="chart.series">
                    </apexchart>
</template>