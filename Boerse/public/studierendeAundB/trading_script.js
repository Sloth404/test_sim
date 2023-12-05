// Function to populate the stock dropdown
function populateStockOptions(Aktien) {
    const stockSelect = document.getElementById("stock-select");

    Aktien.forEach(stock => {
        const option = document.createElement("option");
        option.value = stock.name;
        option.text = `${stock.name}`;

        // Check if the option already exists before adding it
        if (!stockSelect.querySelector(`option[value="${stock.name}"]`)) {
            stockSelect.appendChild(option);
        }
    });
}

// Function to handle buy/sell transactions
function performTransaction(data_stock, type) {
    const stockSelect = document.getElementById("stock-select");
    const quantityInput = document.getElementById("quantity-input");
    const errorSection = document.getElementById("error-section");

    const selectedStock = data_stock.find(stock => stock.name === stockSelect.value);
    const quantity = parseInt(quantityInput.value, 10);

    if (!selectedStock || isNaN(quantity) || quantity < 1 || quantity > selectedStock.anzahlVerfuegbar) {
        // Display error message
        errorSection.textContent = "Invalid transaction. Please check your input.";
        errorSection.style.display = "block";

        // Hide error message after 5 seconds
        setTimeout(() => {
            errorSection.style.display = "none";
        }, 5000);
    } else {
        // Perform the buy/sell transaction
        if (type === 'buy') {
            postData(selectedStock.name, quantity);
            console.log(`Buy ${quantity} shares of ${selectedStock.name}`);
        } else if (type === 'sell') {
            // Sell transaction logic (you can implement this part)
            postData(selectedStock.name, -quantity);
            console.log(`Sell ${quantity} shares of ${selectedStock.name}`);
        }
    }
}

function postData(stockname, quantity) {
    const url = '/api/umsaetze';

    const postData = {
        'aktie': {
            'name': stockname
        },
        'anzahl': quantity
    };

    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    };

    fetch(url, requestOption)
        .then(response => {
            if(!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        });
}

function getStockData(type) {
    fetch("/api/aktien")
        .then((response) => response.json())
        .then((data_stock) => {
            performTransaction(data_stock, type);
        })
        .catch((error) => console.error("Error fetching data:", error));
    return null;
}

// Initialize the form and event listeners
window.onload = function() {
};