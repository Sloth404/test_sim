"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const stockList = document.getElementById("stock-list");
    const nextScrollButton = document.getElementById("nextScrollButton");
    const prevScrollButton = document.getElementById("prevScrollButton");

    let startIndex = 0;
    let entriesPerPage = calculateEntriesPerPage();

    function fetchData() {
        fetch("/api/aktien")
            .then((response) => response.json())
            .then((data_stock) => {
                updateStockList(data_stock);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    function updateStockList(data) {
        stockList.innerHTML = "";

        const endIndex = startIndex + entriesPerPage;
        const visibleEntries = data.slice(startIndex, endIndex);

        visibleEntries.forEach((entry) => {
            const stockDiv = document.createElement("div");
            stockDiv.innerHTML = `<h3>${entry.name}</h3><p>${entry.preis} EUR</p>`;
            stockDiv.style.padding = '20px';
            stockDiv.childNodes.forEach((item) => {
                item.style.textAlign = 'center';
            })
            stockList.appendChild(stockDiv);
        });

        nextScrollButton.style.display =
            data.length > endIndex ? "block" : "none";
        prevScrollButton.style.display =
            startIndex > 0 ? 'block' : 'none';
    }

    function handleNextScroll() {
        startIndex += entriesPerPage;
        fetchData();
    }

    function handlePreviousScroll() {
        startIndex = Math.max(0, startIndex - entriesPerPage);
        fetchData();
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

    nextScrollButton.addEventListener("click", handleNextScroll);
    prevScrollButton.addEventListener("click", handlePreviousScroll);

    window.addEventListener("resize", handleResize);

    fetchData();
    setInterval(fetchData, 1000);
});