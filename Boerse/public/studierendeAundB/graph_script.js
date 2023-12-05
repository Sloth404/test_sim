'use strict'

window.addEventListener('DOMContentLoaded', function () {
    function prepareChartData(data) {
        const chartData = {};

        data.forEach(entry => {
            if(!chartData[entry.name]) {
                chartData[entry.name] = {
                    labels: [],
                    prices: []
                };
            }

            chartData[entry.name].labels.push(new Date().toLocaleDateString());
            chartData[entry.name].prices.push(entry.preis);
        });

        return chartData;
    }

    function createStockChart(chartData) {
        const datasets = [];

        for(const stockName in chartData) {
            datasets.push({
                label: stockName,
                data: chartData[stockName].prices,
                fill: false,
                borderColor: getRandomColor()
            });
        }

        const stockChart = new Chart(stockChartCanvas, {
            type: 'line',
            data: {
                labels: chartData[Object.keys(chartData)[0]].labels,
                datasets: datasets
            }
        });
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
})

//TODO Errorlog
//TODO Graphen

//TODO zu async await wechseln
//TODO marquee ändern
