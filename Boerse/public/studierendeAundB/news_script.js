'use strict'

function init() {
    //constant and variable declaration

    const min = 5;
    let time = '';
    if(min) {
        time = '?letzteZeit=' + convert(min).toString();
    }
    //methode calling
    getNews(time);
}

function outerGetNews() {
    const min = 5;
    let time = '';
    if(min) {
        time = '?letzteZeit=' + convert(min).toString();
    }
    //methode calling
    getNews(time);
}

function getNews(time) {
    const user = '/api/nachrichten' + time;

    fetch(user)
        .then(response => {
            if(!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .then(data_news => {
            processing_news(data_news)
        })
        .catch(error => {
            console.log(error);
        });
}

function convert(min) {
    const currTime = new Date().getTime();
    const minInMil = min * min * 1000;
    return currTime - minInMil;
}

function processing_news(data_news) {
    const news_mar = document.getElementById('news');
    news_mar.innerHTML = '';
    let news_str = '';

    console.log(news_str)
    try {
        data_news.forEach(entry => {
            news_str += entry.uhrzeit;
            news_str += ': '
            news_str += entry.text;
        });
    } catch {
        console.error('Keine Nachrichten');
    }

    if(!news_str) {
        news_str = 'Bisher wurden noch keine Aktien gekauft.'
    }

    news_mar.textContent = news_str;
}

window.addEventListener('load', init);