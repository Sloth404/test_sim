document.addEventListener("DOMContentLoaded", function () {
    const stockList = document.getElementById("stock-list");
    const chartContainer = document.getElementById("chart-container");

    let entriesPerPage = calculateEntriesPerPage();
    const stockData = {};

    function fetchData() {
        fetch("/api/aktien")
            .then((response) => response.json())
            .then((data_stock) => {
                updateStockList(data_stock);
                populateStockOptions(data_stock);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    function updateStockList(data) {
        stockList.innerHTML = "";

        const numCharts = data.length;

        for (let i = 0; i < numCharts; i++) {
            const entry = data[i];

            const stockDiv = document.createElement("div");
            stockDiv.innerHTML = `<h3>${entry.name}</h3><p>${entry.preis} EUR</p>`;
            stockDiv.style.padding = '20px';
            stockDiv.childNodes.forEach((item) => {
                item.style.textAlign = 'center';
            });
            stockList.appendChild(stockDiv);

            if (!stockData[entry.name]) {
                const chartCanvas = document.createElement("canvas");
                chartCanvas.width = 400;
                chartCanvas.height = 200;
                chartContainer.appendChild(chartCanvas);

                stockData[entry.name] = {
                    chart: new Chart(chartCanvas, {
                        type: 'line',
                        data: {
                            labels: [],
                            datasets: [{
                                label: entry.name, // Hier den Namen der Aktie als Label verwenden
                                data: [],
                                fill: false,
                                borderColor: 'blue'
                            }]
                        }
                    }),
                    prices: []
                };
            }

            const chartData = prepareChartData(entry.name, entry.preis);
            updateStockChart(entry.name, chartData);
        }
    }

    function prepareChartData(stockName, currentPrice) {
        const chartData = {
            labels: [],
            prices: []
        };

        chartData.labels.push(new Date().toLocaleTimeString());
        chartData.prices.push(currentPrice);

        chartData.labels = [...stockData[stockName].chart.data.labels, ...chartData.labels];
        chartData.prices = [...stockData[stockName].prices, ...chartData.prices];

        const maxDataPoints = 20;
        if (chartData.labels.length > maxDataPoints) {
            chartData.labels = chartData.labels.slice(-maxDataPoints);
            chartData.prices = chartData.prices.slice(-maxDataPoints);
        }

        stockData[stockName].prices = chartData.prices;

        return chartData;
    }

    function updateStockChart(stockName, chartData) {
        stockData[stockName].chart.data.labels = chartData.labels;
        stockData[stockName].chart.data.datasets[0].data = chartData.prices;
        stockData[stockName].chart.update();
    }

    function calculateEntriesPerPage() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 500) {
            return 1;
        } else if (windowWidth < 750) {
            return 2;
        } else if (windowWidth < 1000) {
            return 3;
        } else if (windowWidth < 1250) {
            return 4;
        } else {
            return 5;
        }
    }

    function handleResize() {
        entriesPerPage = calculateEntriesPerPage();
        fetchData();
    }

    window.addEventListener("resize", handleResize);

    fetchData();
    setInterval(fetchData, 1000);
});