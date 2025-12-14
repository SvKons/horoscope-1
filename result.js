import { zodiacSigns, horoscopes } from './data.js';

function initResultPage() {
    const zodiacIcon = document.getElementById('zodiacIcon');
    const signName = document.getElementById('signName');
    const dateBadge = document.getElementById('dateBadge');
    const horoscopeText = document.getElementById('horoscopeText');
    const backBtn = document.getElementById('backBtn');

    const savedSign = localStorage.getItem('selectedSign');

    let sign;
    if (savedSign) {
        sign = JSON.parse(savedSign);
    } else {
        sign = zodiacSigns[0];
    }

    zodiacIcon.src = sign.img;
    zodiacIcon.alt = sign.name;
    signName.textContent = sign.nameGen;
    dateBadge.textContent = sign.dates;

    const horoscopeContent = horoscopes[sign.id];
    const paragraphs = horoscopeContent.split('\n\n');
    horoscopeText.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', initResultPage);
