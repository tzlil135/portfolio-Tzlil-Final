const API_KEY = "caaa3e39a7d9beab3bb9e0957f15b73e";
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=caaa3e39a7d9beab3bb9e0957f15b73e&q=";

const q = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const h1 = document.getElementById('city');
const temp = document.getElementById('temp');
const description = document.getElementById('desc');
const weatherIcon = document.getElementById('icon');
const errorMessage = document.getElementById('error-massage');
const moreInfo = document.getElementById('more-info');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');



const days = ["day1", "day2", "day3", "day4", "day5"];
const temps = ["temp1", "temp2", "temp3", "temp4", "temp5"];
const icons = ["icon1", "icon2", "icon3", "icon4", "icon5"];

const getWeather = async (city) => {
    const response = await fetch(URL + city);
    const data = await response.json();

    displayWeather(data);
};

const displayWeather = (weatherData) => {
    if (weatherData.cod === 200) {
        errorMessage.innerText = "";
        h1.innerText = weatherData.name;
        temp.innerText = weatherData.main.temp + "°C";
        description.innerText = weatherData.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        weatherIcon.alt = weatherData.name;

        humidity.innerText = `Humidity: ${weatherData.main.humidity}%`;
        windSpeed.innerText = `Wind Speed: ${weatherData.wind.speed} km/h`;
        pressure.innerText = `Pressure: ${weatherData.main.pressure} hPa`;

        moreInfo.classList.add("show");

        console.log(weatherData);
    } else {
        h1.innerText = "";
        temp.innerText = "";
        description.innerText = "";
        weatherIcon.src = "";
        weatherIcon.alt = "";
        moreInfo.classList.remove("show");
        errorMessage.innerText = "City not found";
    }
};

const getForecast = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${API_KEY}&q=${city}`);
    const data = await response.json();
    displayForecast(data);
};

const displayForecast = (forecastData) => {
    if (forecastData && forecastData.list) {
        let index = 0;
        for (let i = 0; i < 5; i++) {
            let forecast = forecastData.list[index];

            document.getElementById(days[i]).innerText = new Date(forecast.dt * 1000).toLocaleDateString('en', { weekday: 'short' });
            document.getElementById(temps[i]).innerText = Math.round(forecast.main.temp) + "°C";
            document.getElementById(icons[i]).src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

            index += 8; // קפיצה של יום קדימה
        }
    } else {
        for (let i = 0; i < 5; i++) {
            document.getElementById(days[i]).innerText = "";
            document.getElementById(temps[i]).innerText = "";
            document.getElementById(icons[i]).src = "";
        }
    }
};


searchBtn.addEventListener('click', () => {
    getWeather(q.value);
    getForecast(q.value);
    console.log(moreInfo);
});
