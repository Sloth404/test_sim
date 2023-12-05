'use strict'

window.addEventListener('DOMContentLoaded', function () {
    getUserData();
    setInterval(getUserData, 1000);

    function getUserData()  {
        fetch("/api/depotAlle")
            .then((response) => response.json())
            .then((user_data) => {
                processing_ranking(user_data);
                console.log(user_data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    function processing_ranking(user_data) {
        const dataArray = Array.from(user_data);

        dataArray.sort((a, b) => b.summe - a.summe);

        const user_list = document.getElementById('user_list');

        user_list.innerHTML = '';

        dataArray.forEach((user) => {
            const user_div = document.createElement('div');
            user_div.innerHTML = `<h3>${user.name}</h3><p>${user.summe} EUR</p>`;
            user_list.appendChild(user_div);
            user_div.style.padding = '20px';
            user_div.childNodes.forEach(i => {
                i.style.textAlign = 'center';
            })
        })
    }

    function deleteAllItems() {
        const user_list = document.getElementById('user_list');

        user_list.childNodes.forEach((children) => {
            children.remove();
        });
    }
})