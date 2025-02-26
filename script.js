const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const weatherIcon = document.getElementById("weather-icon");
const errorMsg = document.getElementById("error-msg");

async function fetchWeather(city) {
    if (!city.trim()) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temperature").innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById("humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("wind-speed").innerText = `${data.wind.speed} km/h`;

        const weatherCondition = data.weather[0].main.toLowerCase();
        let iconPath = "img/clear.png";

        switch (weatherCondition) {
            case "clouds": iconPath = "img/clouds.png"; break;
            case "clear": iconPath = "img/clear.png"; break;
            case "rain": iconPath = "img/rain.png"; break;
            case "drizzle": iconPath = "img/drizzle.png"; break;
            case "mist": iconPath = "img/mist.png"; break;
        }

        weatherIcon.src = iconPath;

        weatherInfo.style.display = "block";
        errorMsg.style.display = "none";
    } catch (error) {
        errorMsg.style.display = "block";
        weatherInfo.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => fetchWeather(searchBox.value));

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchWeather(searchBox.value);
    }
});

fetchWeather("Delhi");
