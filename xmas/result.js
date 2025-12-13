import { zodiacSigns, horoscopes } from '../data.js';

function createSnowflakes() {
    const snowfall = document.getElementById('snowfall');
    const flakeCount = 50;

    for (let i = 0; i < flakeCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';

        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 8;
        const delay = Math.random() * 10;

        flake.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        snowfall.appendChild(flake);
    }
}

function initResult() {
    const signIcon = document.getElementById('signIcon');
    const signName = document.getElementById('signName');
    const dateLabel = document.getElementById('dateLabel');
    const horoscopeBody = document.getElementById('horoscopeBody');
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
    signName.textContent = sign.nameGen;
    dateLabel.textContent = sign.dates;

    const text = horoscopes[sign.id];
    const paragraphs = text.split('\n\n');
    horoscopeBody.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');

    btnBack.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    initResult();
});
