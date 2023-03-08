
<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
    props: {
        label: {
            type: Array
        },
        chartData: {
            type: Array
        }
    },
    mounted() {
        new Chart(this.$refs.myChart, {
            type: 'doughnut',
            data: {
                labels: this.label,
                datasets: [
                    {
                        label: 'Clients by Zip',
                        data: this.chartData,
                        backgroundColor: ['blue',
                            '#c8102e',
                            'orange',
                            'violet',
                            'pink'
                        ]
                    }
                ]
            },
            options : {
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        }
        );
    }
}
</script>

<template>
    <div class="shadow-lg rounded-lg">
        <canvas id="p-10" ref="myChart"></canvas>
    </div>
</template>

