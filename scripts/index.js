const popUp = document.getElementById("pop-up");
const closeBtn = document.querySelector(".close-btn");

window.addEventListener('scroll', () => {
    const items = document.querySelectorAll('.js-item');
    const windowHeight = window.innerHeight;

    items.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        if (itemPosition < windowHeight * 0.8) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
});


document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    let nameInput = document.getElementById("name");
    let emailInput = document.getElementById("email");
    let phoneInput = document.getElementById("phone");
    let messageInput = document.getElementById("message");

    if (nameInput.value && emailInput.value && phoneInput.value && messageInput.value) {
        popUp.style.display = "block";
    }
});

closeBtn.addEventListener("click", () => {
    document.getElementById("pop-up").style.display = "none";
});