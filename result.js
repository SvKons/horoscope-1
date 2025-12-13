import { zodiacSigns, horoscopes } from './data.js';

// Инициализация страницы результата
function initResultPage() {
    const zodiacIcon = document.getElementById('zodiacIcon');
    const signName = document.getElementById('signName');
    const dateBadge = document.getElementById('dateBadge');
    const horoscopeText = document.getElementById('horoscopeText');
    const backBtn = document.getElementById('backBtn');
    
    // Получаем выбранный знак из localStorage
    const savedSign = localStorage.getItem('selectedSign');
    
    let sign;
    if (savedSign) {
        sign = JSON.parse(savedSign);
    } else {
        // По умолчанию показываем Овна
        sign = zodiacSigns[0];
    }
    
    // Заполняем данные
    zodiacIcon.src = sign.img;
    zodiacIcon.alt = sign.name;
    signName.textContent = sign.nameGen;
    dateBadge.textContent = sign.dates;
    
    // Получаем текст гороскопа
    const horoscopeContent = horoscopes[sign.id];
    const paragraphs = horoscopeContent.split('\n\n');
    horoscopeText.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
    
    // Кнопка назад
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', initResultPage);

