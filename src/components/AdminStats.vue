<script setup>



const barChart =  {
          
          series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
          }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
          }],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
              title: {
                text: '$ (thousands)'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return "$ " + val + " thousands"
                }
              }
            }
          }, 
        }

</script>

<template>
   <div class="w-full z-0">
        <div class="grid grid-cols-3 gap-4 h-28">
            <div class="bg-white p-2 rounded-lg drop-shadow-lg flex justify-center">
                <div class="w-1/2 p-5 flex space-x-5">
                    <div class="px-4 py-4 rounded-full bg-orange-200 hover:bg-orange-300 hover:scale-105 duration-500">
                        <img src="../assets/icons/user-line.png" alt="" srcset="" class="h-5">
                     </div>
                    <div class="flex flex-col gap-2">
                        <h1 class="text-xl font-semibold border-b-2 border-gray-100 tracking-widest">
                            3000
                        </h1>
                        <p class="capitalize text-xs text-gray-400">
                            employees 
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <apexchart type="bar" height="150" :options="barChart.chartOptions" :series="barChart.series"></apexchart>
            </div>
            <div>
                3
            </div>
        </div>
   </div>
</template>