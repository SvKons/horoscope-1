import {zodiacSigns, horoscopes, horoscopeDetails, advice, dictionary} from './data.js';

function createSnowflakes() {
    const snowfall = document.getElementById('snowfall');
    const flakeCount = 40;

    for (let i = 0; i < flakeCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';

        const size = Math.random() * 28 + 12;
        const left = Math.random() * 100;
        const duration = Math.random() * 8 + 10;
        const rotation = Math.random() * 360;
        const opacity = 0.4 + Math.random() * 0.6;
        const delay = -(Math.random() * duration);

        flake.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --rotation: ${rotation}deg;
            opacity: ${opacity};
        `;

        snowfall.appendChild(flake);
    }
}

function initResult() {
    const signIcon = document.getElementById('signIcon');
    const signNameElements = document.querySelectorAll('.sign-name');
    const signTaglineElements = document.querySelectorAll('.sign-tagline');
    const signDatesSubElements = document.querySelectorAll('.sign-dates-sub');
    const signNameGenElements = document.querySelectorAll('.sign-name-gen');
    const horoscopeBody = document.getElementById('horoscopeBody');
    const horoscopeDetailsList = document.getElementById('horoscopeDetails');
    const adviceText = document.getElementById('adviceText');
    const dictionaryList = document.getElementById('dictionaryList');
    const btnBack = document.getElementById('btnBack');

    const saved = localStorage.getItem('selectedSign');

    let sign;
    if (saved) {
        sign = JSON.parse(saved);
    } else {
        sign = zodiacSigns[0];
    }

    signIcon.src = `../${sign.img}`;
    signIcon.alt = sign.name;
    signNameElements.forEach(el => (el.textContent = sign.name));
    signTaglineElements.forEach(el => (el.textContent = sign.tagline));
    signDatesSubElements.forEach(el => (el.textContent = sign.dates));
    signNameGenElements.forEach(el => (el.textContent = sign.nameGen));

    const text = horoscopes[sign.id];
    const paragraphs = text.split('\n\n');
    horoscopeBody.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');

    // Генерация списка деталей
    const details = horoscopeDetails[sign.id] || [];
    horoscopeDetailsList.innerHTML = details.map(item => `<li><span class="horoscope-details-title">${item.label}:</span> ${item.text}</li>`).join('');

    // Главный совет
    adviceText.textContent = advice[sign.id] || '';

    // Генерация словарика
    const words = dictionary[sign.id] || [];
    dictionaryList.innerHTML = words
        .map(
            item => `
            <li class="questions__item">
                <div class="questions__expand">
                    <p class="questions__question questions__word">${item.word}</p>
                    <span class="questions__arrow">+</span>
                </div>
                <div class="questions__answer">
                    <p class="questions__text">${item.translation}</p>
                </div>
            </li>
        `
        )
        .join('');

    btnBack.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    initResult();
});
