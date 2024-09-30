const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', evt => {
  if (evt.key === 'Enter') getResults(searchbox.value);
});

window.onload = () => {
  getResults("Karachi");
  ['Lahore', 'Islamabad', 'Multan', 'Peshawar'].forEach(fetchCityWeather);
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

  document.querySelector('.location .date').innerText = dateBuilder(new Date());
  const currentTemp = Math.round(weather.main.temp);
  document.querySelector('.current .temp').innerHTML = `${currentTemp || 'N/A'}<span>°c</span>`;
  document.querySelector('.current .weather').innerText = weather.weather[0]?.main || 'No weather data';
  document.querySelector('.hi-low').innerText = `${Math.round(weather.main.temp_min) || 'N/A'}°c / ${Math.round(weather.main.temp_max) || 'N/A'}°c`;
}

function fetchCityWeather(cityName) {
  fetch(`${api.base}weather?q=${cityName}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then(data => {
      const cityCard = document.getElementById(cityName.toLowerCase());
      cityCard.querySelector('.temp').innerText = `${Math.round(data.main.temp)}°c`;
      cityCard.querySelector('.weather').innerText = data.weather[0]?.main || 'No data';
    })
    .catch(() => alert(`Failed to retrieve weather data for ${cityName}.`));
}

function dateBuilder(d) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
