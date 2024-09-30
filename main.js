const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', evt => {
  if (evt.keyCode === 13) getResults(searchbox.value);
});

window.onload = () => {
  getResults("Karachi");
  fetchCityWeather('Lahore');
  fetchCityWeather('Islamabad');
  fetchCityWeather('Multan');
  fetchCityWeather('Peshawar');
};

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then(displayResults)
    .catch(() => alert("Failed to retrieve weather data. Please check the city name."));
}

function displayResults(weather) {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  document.querySelector('.location .date').innerText = dateBuilder(now);

  const currentTemp = Math.round(weather.main.temp);
  document.querySelector('.current .temp').innerHTML = `${!isNaN(currentTemp) ? currentTemp : 'N/A'}<span>°c</span>`;
  
  document.querySelector('.current .weather').innerText = weather.weather[0]?.main || 'No weather data';

  const minTemp = Math.round(weather.main.temp_min);
  const maxTemp = Math.round(weather.main.temp_max);
  document.querySelector('.hi-low').innerText = `${!isNaN(minTemp) ? minTemp : 'N/A'}°c / ${!isNaN(maxTemp) ? maxTemp : 'N/A'}°c`;
}

// Fetch weather for specific city
function fetchCityWeather(cityName) {
  fetch(`${api.base}weather?q=${cityName}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then(data => {
      const cityCard = document.getElementById(cityName.toLowerCase());
      const temp = Math.round(data.main.temp);
      cityCard.querySelector('.temp').innerText = `${temp}°c`;
      cityCard.querySelector('.weather').innerText = data.weather[0]?.main || 'No data';
    })
    .catch(() => alert(`Failed to retrieve weather data for ${cityName}.`));
}

function dateBuilder(d) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
