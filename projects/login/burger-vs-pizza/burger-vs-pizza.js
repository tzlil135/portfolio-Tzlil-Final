const icon = document.getElementById('i-love');
const images = document.querySelectorAll('.image');
const burger = document.getElementById('burger');
const pizza = document.getElementById('pizza');
const logOutBtn = document.getElementById('log-out-btn');
const pizzaIcon = document.getElementById('pizzaIcon');
const burgerIcon = document.getElementById('burgerIcon');


document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const maxTilt = 30;
    const maxShadowMove = 20;

    let deltaX = (e.clientX - centerX) / centerX;
    let deltaY = (e.clientY - centerY) / centerY;

    let rotateX = deltaY * maxTilt;
    let rotateY = -deltaX * maxTilt;

    let shadowX = -deltaX * maxShadowMove;
    let shadowY = maxShadowMove;

    icon.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    icon.style.filter = `drop-shadow(${shadowX}px ${shadowY}px 8.5px rgba(0, 0, 0, 0.822))`;
});


images.forEach((img) => {
    const imageId = img.querySelector('.img').id;
    const checkIcon = img.querySelector('.check-icon');

    img.addEventListener('click', () => {
        let user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            console.log('User not found in localStorage');
            return;
        }

        const activeIcon = document.querySelector('.check-icon.active');

        if (activeIcon && activeIcon !== checkIcon) {
            activeIcon.classList.remove('active');
            activeIcon.style.opacity = '0';
        }

        if (checkIcon.classList.contains('active')) {
            checkIcon.classList.remove('active');
            checkIcon.style.opacity = '0';
            delete user.selectedFood;
            localStorage.removeItem('selectedFood');
        } else {
            checkIcon.classList.add('active');
            checkIcon.style.opacity = '1';
            user.selectedFood = imageId;
            localStorage.setItem('selectedFood', imageId);
        }

        localStorage.setItem('user', JSON.stringify(user));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.fullName) {
        const namePlaceholder = document.getElementById('p1');
        if (namePlaceholder) {
            namePlaceholder.innerHTML = `My name is <span style="font-weight:600">${user.fullName}</span> and I am making a Statement Today!`;
        }
    }

    const savedChoice = localStorage.getItem('selectedFood');

    if (savedChoice) {
        const selectedImg = document.getElementById(savedChoice);

        if (selectedImg) {
            const checkIcon = selectedImg.closest('.image').querySelector('.check-icon');
            if (checkIcon) {
                checkIcon.classList.add('active');
                checkIcon.style.opacity = '1';
            } else {
                console.log('Check icon not found.');
            }
        } else {
            console.log('Selected image not found.');
        }
    }
});


logOutBtn.addEventListener('click', () => {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        user.isLoggedIn = false;
        localStorage.setItem('user', JSON.stringify(user));

        window.location.href = "../index.html";
    }
});






