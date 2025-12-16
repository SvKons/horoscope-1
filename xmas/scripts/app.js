import {zodiacSigns} from './data.js';

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

function initPicker() {
    const track = document.getElementById('pickerTrack');
    const wrapper = document.querySelector('.picker-wrapper');
    const btnConfirm = document.getElementById('btnConfirm');

    const itemHeight = 44;

    let currentIndex = 0;
    let startY = 0;
    let lastY = 0;
    let currentOffset = 0;
    let isDragging = false;
    let velocity = 0;

    zodiacSigns.forEach((sign, index) => {
        const item = document.createElement('div');
        item.className = `picker-item ${index === 0 ? 'active' : ''}`;
        item.innerHTML = `<span class="zodiac-symbol">${sign.symbol}</span> ${sign.name}`;
        item.dataset.index = index;
        track.appendChild(item);
    });

    function updateActive(index) {
        const items = track.querySelectorAll('.picker-item');
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function scrollTo(index, animated = true) {
        index = Math.max(0, Math.min(index, zodiacSigns.length - 1));
        currentIndex = index;

        const offset = -(index * itemHeight + itemHeight / 2);

        track.style.transition = animated ? 'transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)' : 'none';
        track.style.transform = `translateY(${offset}px)`;
        currentOffset = -index * itemHeight;
        updateActive(index);
    }

    function getY(e) {
        return e.touches ? e.touches[0].clientY : e.clientY;
    }

    function onStart(e) {
        isDragging = true;
        startY = getY(e);
        lastY = startY;
        velocity = 0;
        track.style.transition = 'none';
    }

    function onMove(e) {
        if (!isDragging) return;
        e.preventDefault();

        const y = getY(e);
        velocity = y - lastY;
        lastY = y;

        const diff = y - startY;
        let newOffset = currentOffset + diff;

        const minOffset = -(zodiacSigns.length - 1) * itemHeight;
        const maxOffset = 0;

        if (newOffset > maxOffset) {
            newOffset = maxOffset + (newOffset - maxOffset) * 0.3;
        } else if (newOffset < minOffset) {
            newOffset = minOffset + (newOffset - minOffset) * 0.3;
        }

        const visualOffset = newOffset - itemHeight / 2;
        track.style.transform = `translateY(${visualOffset}px)`;
    }

    function onEnd(e) {
        if (!isDragging) return;
        isDragging = false;

        const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
        const diff = endY - startY;
        const newOffset = currentOffset + diff;

        let targetIndex = Math.round(-newOffset / itemHeight);

        if (Math.abs(velocity) > 5) {
            targetIndex -= Math.sign(velocity) * Math.min(Math.floor(Math.abs(velocity) / 10), 2);
        }

        targetIndex = Math.max(0, Math.min(targetIndex, zodiacSigns.length - 1));
        scrollTo(targetIndex, true);
    }

    wrapper.addEventListener('touchstart', onStart, { passive: true });
    wrapper.addEventListener('touchmove', onMove, { passive: false });
    wrapper.addEventListener('touchend', onEnd);

    wrapper.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    wrapper.addEventListener(
        'wheel',
        e => {
            e.preventDefault();
            const dir = e.deltaY > 0 ? 1 : -1;
            const newIndex = currentIndex + dir;
            if (newIndex >= 0 && newIndex < zodiacSigns.length) {
                scrollTo(newIndex, true);
            }
        },
        { passive: false }
    );

    track.addEventListener('click', e => {
        if (Math.abs(startY - lastY) > 5) return;
        const item = e.target.closest('.picker-item');
        if (item) {
            scrollTo(parseInt(item.dataset.index), true);
        }
    });

    scrollTo(0, false);

    btnConfirm.addEventListener('click', () => {
        const selected = zodiacSigns[currentIndex];
        localStorage.setItem('selectedSign', JSON.stringify(selected));
        window.location.href = 'result.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    initPicker();
});
