// stage 4 defining update info function by using response fro the api

function updateInfo(response) {
  let temperatureValueElement = document.querySelector("#temperature-value");
  let temperature = response.data.temperature.current;
  temperatureValueElement.innerHTML = Math.round(temperature);

  let cityNameElement = document.querySelector("#city-name");
  let city = response.data.city;
  cityNameElement.innerHTML = city;

  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;

  let humidityElement = document.querySelector("#humidity");
  let humidityValue = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidityValue} %`;

  let windElement = document.querySelector("#wind");
  let windValue = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${windValue} km/h`;

  let date = new Date();
  function formatDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
  }

  let dateElement = document.querySelector("#date-element");
  dateElement.innerHTML = `${formatDate(date)}, `;

  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img
  src="${response.data.condition.icon_url}" 
  class="temperature-icon"/>`;

  // after we search for city it is when we call the forecast

  getForecast(response.data.city);
}

// stage 3 define the search function that uses api response
function searchCity(city) {
  let apiKey = "d2ebcoe34b6t502be4f636aa01ddf51f";
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(updateInfo);
}

// stage 2 call dispaly the city bt calling the search city function that uses api
function displayWeatherInfo(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");
  searchCity(searchInputElement.value);
}
// stage 1 adding an event listener to form that diaplays the weather info in general
let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", displayWeatherInfo);

///code for forecast

// step 1 get the api info using key and url

function getForecast(city) {
  let apiKey = "d2ebcoe34b6t502be4f636aa01ddf51f";
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(forecastApiUrl).then(dispalyForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "sun"];

  return days[date.getDay()];
}
function dispalyForecast(response) {
  //an array of forecast data are called daily i the api json
  let forecasthtml = "";
  let daily = response.data.daily;

  // iterating through each object in the daily array to get data
  daily.forEach(function (day, index) {
    if (index < 5) {
      forecasthtml += ` <div class="weather-forecast-day-info">
      <div class="weather-forecast-day">${formatDay(day.time)}</div>
      <div class="weather-forecast-icon">
      <img src="${day.condition.icon_url}" alt="icon_image"/></div>
      <div class="weather-forecast-temp-wrapper">
      <div class="weather-forecast-temp"><strong>
      ${Math.round(day.temperature.maximum)}°</strong></div>
      <div class="weather-forecast-temp">${Math.round(
        day.temperature.minimum
      )}°</div>
      </div>
      </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecasthtml;
}

//city that always run
searchCity("kigali");
