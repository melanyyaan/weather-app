function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let now = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now];

  return `${day}, ${hours}:${minutes}`;
}

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.city;

  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#current-humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#current-condition").innerHTML =
    response.data.condition.description;
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
}

function searchCity(city) {
  let apiKey = "13ec9b28aob0203t38b64f616f4cd0fb";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let date = document.querySelector("#current-date");
let currentDate = new Date();
date.innerHTML = formatDate(currentDate);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "13ec9b28aob0203t38b64f616f4cd0fb";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentCity = document.querySelector("#current-city-btn");

currentCity.addEventListener("click", searchLocation);

function convertFahrenheit(event) {
  event.preventDefault();
  temperatureCelsius.classList.remove("active");
  temperatureFahrenheit.classList.add("active");

  let temperatureIndexFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    temperatureIndexFahrenheit
  );
}

function convertCelsius(event) {
  event.preventDefault();
  temperatureCelsius.classList.add("active");
  temperatureFahrenheit.classList.remove("active");

  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let temperatureFahrenheit = document.querySelector("#fahrenheit-link");
temperatureFahrenheit.addEventListener("click", convertFahrenheit);

let temperatureCelsius = document.querySelector("#celsius-link");
temperatureCelsius.addEventListener("click", convertCelsius);
