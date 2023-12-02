'use strict'

const username_span = document.getElementById('username');
const value_span = document.getElementById('balance');

function init() {
    getUser();
}

function getUser() {
    const user = '/api/benutzerdaten';

    fetch(user)
        .then(response => {
            if(!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .then(data_user => {
            processing_user(data_user);
        })
        .catch(error => {
            console.error(error);
        });
}

function processing_user(data_user) {
    const number = new Intl.NumberFormat().format(data_user.kontostand);

    username_span.textContent = data_user.name.charAt(0).toUpperCase() + data_user.name.slice(1);
    value_span.textContent = number + '€';

}

window.addEventListener('load', init);

//TODO elemente holen, wenn ich sie brauche, nicht vorher