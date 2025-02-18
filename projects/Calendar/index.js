// dom

const days = document.getElementById('days');
const monthDisplay = document.getElementById('month-display');
const yearDisplay = document.getElementById('year-number');
const prevYear = document.getElementById('prev-year');
const nextYear = document.getElementById('next-year');
const monthNames = document.getElementById('month-names');
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('today-date');

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const renderCalendar = (year, month) => {
    days.innerHTML = '';
    monthDisplay.textContent = months[month];
    yearDisplay.textContent = year;

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("empty");
        days.appendChild(emptyDiv);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.textContent = i;
        dayDiv.classList.add("day");

        if (
            i === currentDate.getDate() &&
            month === currentDate.getMonth() &&
            year === currentDate.getFullYear()
        ) {
            dayDiv.classList.add("today");
        }

        days.appendChild(dayDiv);

    }
};

let monthNamesVisible = false;

monthDisplay.addEventListener("click", () => {
    monthNamesVisible = !monthNamesVisible;
    if (monthNamesVisible) {
        monthNames.style.display = "flex";
    } else {
        monthNames.style.display = "none";
    }
});


const monthDivs = document.querySelectorAll('.month-names div');
monthDivs.forEach((monthDiv, index) => {
    monthDiv.addEventListener('click', () => {
        currentMonth = index;
        renderCalendar(currentYear, currentMonth);
        monthNamesVisible = true;

    });
});


prevYear.addEventListener("click", function () {
    currentYear--;
    renderCalendar(currentYear, currentMonth);
});

nextYear.addEventListener("click", function () {
    currentYear++;
    renderCalendar(currentYear, currentMonth);
});

renderCalendar(currentYear, currentMonth);


const updateTimeAndDate = () => {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // חודש מתחיל מ-0
    const year = currentDate.getFullYear();

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = `${day} - ${month} - ${year}`;
};

setInterval(updateTimeAndDate, 1000);

updateTimeAndDate();