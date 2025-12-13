import { zodiacSigns } from './data.js';

function initWheelPicker() {
    const wheelInner = document.getElementById('wheelInner');
    const picker = document.querySelector('.wheel-picker');
    const confirmBtn = document.getElementById('confirmBtn');

    const itemHeight = 48;
    const visibleItems = 5;
    const centerOffset = Math.floor(visibleItems / 2) * itemHeight;

    let currentIndex = 0;
    let startY = 0;
    let lastY = 0;
    let currentOffset = 0;
    let isDragging = false;
    let velocity = 0;
    let animationId = null;

    zodiacSigns.forEach((sign, index) => {
        const item = document.createElement('div');
        item.className = `wheel-item ${index === 0 ? 'active' : ''}`;
        item.innerHTML = `<span class="symbol">${sign.symbol}</span> ${sign.name}`;
        item.dataset.index = index;
        wheelInner.appendChild(item);
    });

    wheelInner.style.top = `${centerOffset}px`;

    function updateActiveItem(index) {
        const items = wheelInner.querySelectorAll('.wheel-item');
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function scrollToIndex(index, animated = true) {
        index = Math.max(0, Math.min(index, zodiacSigns.length - 1));
        currentIndex = index;
        const offset = -index * itemHeight;

        if (animated) {
            wheelInner.style.transition = 'transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)';
        } else {
            wheelInner.style.transition = 'none';
        }

        wheelInner.style.transform = `translateY(${offset}px)`;
        currentOffset = offset;
        updateActiveItem(index);
    }

    function getEventY(e) {
        return e.touches ? e.touches[0].clientY : e.clientY;
    }

    function handleStart(e) {
        isDragging = true;
        startY = getEventY(e);
        lastY = startY;
        velocity = 0;

        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        wheelInner.style.transition = 'none';
    }

    function handleMove(e) {
        if (!isDragging) return;
        e.preventDefault();

        const currentY = getEventY(e);
        const deltaY = currentY - lastY;
        velocity = deltaY;
        lastY = currentY;

        const diff = currentY - startY;
        let newOffset = currentOffset + diff;

        const minOffset = -(zodiacSigns.length - 1) * itemHeight;
        const maxOffset = 0;

        if (newOffset > maxOffset) {
            newOffset = maxOffset + (newOffset - maxOffset) * 0.3;
        } else if (newOffset < minOffset) {
            newOffset = minOffset + (newOffset - minOffset) * 0.3;
        }

        wheelInner.style.transform = `translateY(${newOffset}px)`;
    }

    function handleEnd(e) {
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

        scrollToIndex(targetIndex, true);
    }

    picker.addEventListener('touchstart', handleStart, { passive: true });
    picker.addEventListener('touchmove', handleMove, { passive: false });
    picker.addEventListener('touchend', handleEnd);

    picker.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    picker.addEventListener(
        'wheel',
        e => {
            e.preventDefault();
            const direction = e.deltaY > 0 ? 1 : -1;
            const newIndex = currentIndex + direction;

            if (newIndex >= 0 && newIndex < zodiacSigns.length) {
                scrollToIndex(newIndex, true);
            }
        },
        { passive: false }
    );

    wheelInner.addEventListener('click', e => {
        if (Math.abs(startY - lastY) > 5) return;

        const item = e.target.closest('.wheel-item');
        if (item) {
            const index = parseInt(item.dataset.index);
            scrollToIndex(index, true);
        }
    });

    scrollToIndex(0, false);

    confirmBtn.addEventListener('click', () => {
        const selectedSign = zodiacSigns[currentIndex];
        localStorage.setItem('selectedSign', JSON.stringify(selectedSign));
        window.location.href = 'result.html';
    });
}

document.addEventListener('DOMContentLoaded', initWheelPicker);
