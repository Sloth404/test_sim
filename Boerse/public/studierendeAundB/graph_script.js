'use strict'

window.addEventListener('DOMContentLoaded', function () {
    setData();
    setInterval(setData, 1000);


    function setData() {
        const ctx = document.getElementById('stockgraph');

        new Chart(ctx, {
            type: 'line',
            data: array,
        })

        console.log(array);
        console.log('yep');
    }
})


//TODO Rangliste
//TODO Errorlog
//TODO Graphen

//TODO zu async await wechseln
//TODO marquee ändern
