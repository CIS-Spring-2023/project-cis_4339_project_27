
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
        const pieBackgroundColor = this.chartData.map(() => this.getColor())
        new Chart(this.$refs.myChart, {
            type: 'doughnut',
            data: {
                labels: this.label,
                datasets: [
                    {
                        data: this.chartData,
                        backgroundColor: pieBackgroundColor
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        }
        );
    },
    methods: {
        getColor() {
            let channel = () => Math.random() * 255
            return `rgba(${channel()}, ${channel()}, ${channel()}, 0.8)`
        }
    }
}
</script>

<template>
    <div class="shadow-lg rounded-lg overflow-hidden">
        <canvas id="p-10" ref="myChart"></canvas>
    </div>
</template>

