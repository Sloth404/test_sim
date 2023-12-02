'use strict'

window.addEventListener('DOMContentLoaded', function () {
    //const stockNameBuy = document.getElementById();
    //const qauntityBuy = document.getElementById();
    //const stockNameSell = document.getElementById();
    //const qauntitySell = document.getElementById();

    const buybtn = document.getElementById('buy');
    const sellbtn = document.getElementById('sell');

    buybtn.addEventListener('click', buyAction);
    sellbtn.addEventListener('click', sellAction);

    function buyAction() {
        //let stockname = stockNameBuy.innerHTML;
        //let quantity = qauntityBuy.innerHTML;

        let stockname = 'AMD';
        let quantity = '3';

        postData(stockname, quantity);
    }

    function sellAction() {
        //let stockname = stockNameSell.innerHTML;
        //let quantity = qauntitySell.innerHTML;

        let stockname = 'AMD';
        let quantity = '3';

        postData(stockname, -quantity);
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
                outerGetNews();
            })
            .catch(error => {
                console.log(error);
            });

        getUser();
    }
})