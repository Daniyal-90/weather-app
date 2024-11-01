const api = { key: "fcc8de7015bbb202209bbf0261babf4c", base: "https://api.openweathermap.org/data/2.5/" };

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', e => e.key === 'Enter' && getResults(searchbox.value));

window.onload = () => {
  getResults("Karachi");
  ['Lahore', 'Islamabad', 'Multan', 'Peshawar'].forEach(fetchCityWeather);
};

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(displayResults)
    .catch(() => alert("Failed to retrieve weather data. Please check the city name."));
}

function displayResults(weather) {
  document.querySelector('.location .city').innerText = `${weather.name}, ${weather.sys.country}`;
  document.querySelector('.location .date').innerText = dateBuilder(new Date());
  document.querySelector('.current .temp').innerHTML = `${Math.round(weather.main.temp) || 'N/A'}<span>°c</span>`;
  document.querySelector('.current .weather').innerText = weather.weather[0]?.main || 'No weather data';
  document.querySelector('.hi-low').innerText = `${Math.round(weather.main.temp_min) || 'N/A'}°c / ${Math.round(weather.main.temp_max) || 'N/A'}°c`;
}

function fetchCityWeather(city) {
  fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(data => {
      const card = document.getElementById(city.toLowerCase());
      card.querySelector('.temp').innerText = `${Math.round(data.main.temp)}°c`;
      card.querySelector('.weather').innerText = data.weather[0]?.main || 'No data';
    })
    .catch(() => alert(`Failed to retrieve weather data for ${city}.`));
}

function dateBuilder(d) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
