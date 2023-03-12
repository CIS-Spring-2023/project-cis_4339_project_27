
<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
    //Chart props to send data from parent component to piechart
    props: {
        label: {
            type: Array
        },
        chartData: {
            type: Array
        }
    },
    mounted() {
        // Mounting the chart
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
                },
                responsive: true,
                maintainAspectRatio: false,
            }
        }
        );
    }
}
</script>

<template>
    <div class="shadow-lg rounded-lg h-96">
        <canvas id="p-10" ref="myChart"></canvas>
    </div>
</template>

