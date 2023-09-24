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
  console.log(response.data)
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#current-condition").innerHTML =
    response.data.condition.description;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

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

// function searchCity(event) {
//   event.preventDefault();
//   let h1 = document.querySelector("#current-city");
//   let searchInput = document.querySelector("#search-input");
//   h1.innerHTML = searchInput.value;
// }

// function convertCelcius(event) {
//   event.preventDefault();
//   let temperatureIndex = document.querySelector("#current-temperature");
//   temperatureIndex.innerHTML = 17;
// }

// function convertFahrenheit(event) {
//   event.preventDefault();
//   let temperatureIndex = document.querySelector("#current-temperature");
//   temperatureIndex.innerHTML = 60;
// }

// let temperatureFahrenheit = document.querySelector("#fahrenheit-link");
// temperatureFahrenheit.addEventListener("click", convertFahrenheit);

// let temperatureCelcius = document.querySelector("#celcius-link");
// temperatureCelcius.addEventListener("click", convertCelcius);
