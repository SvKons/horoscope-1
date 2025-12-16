import {zodiacSigns, horoscopes, horoscopeDetails, advice, dictionary} from './data.js';

function initResultPage() {
    const signIcon = document.getElementById('signIcon');
    const signNameElements = document.querySelectorAll('.sign-name');
    const signTaglineElements = document.querySelectorAll('.sign-tagline');
    const signDatesSubElements = document.querySelectorAll('.sign-dates-sub');
    const signNameGenElements = document.querySelectorAll('.sign-name-gen');
    const horoscopeText = document.getElementById('horoscopeText');
    const horoscopeDetailsList = document.getElementById('horoscopeDetails');
    const adviceText = document.getElementById('adviceText');
    const dictionaryList = document.getElementById('dictionaryList');
    const backBtn = document.getElementById('backBtn');

    const savedSign = localStorage.getItem('selectedSign');

    let sign;
    if (savedSign) {
        sign = JSON.parse(savedSign);
    } else {
        sign = zodiacSigns[0];
    }

    signIcon.src = sign.img;
    signIcon.alt = sign.name;
    signNameElements.forEach(el => (el.textContent = sign.name));
    signTaglineElements.forEach(el => (el.textContent = sign.tagline));
    signDatesSubElements.forEach(el => (el.textContent = sign.dates));
    signNameGenElements.forEach(el => (el.textContent = sign.nameGen));

    const horoscopeContent = horoscopes[sign.id];
    const paragraphs = horoscopeContent.split('\n\n');
    horoscopeText.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');

    // Генерация списка деталей
    const details = horoscopeDetails[sign.id] || [];
    horoscopeDetailsList.innerHTML = details.map(item => `<li><span class='horoscope-details-title'>${item.label}:</span> ${item.text}</li>`).join('');

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

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', initResultPage);
