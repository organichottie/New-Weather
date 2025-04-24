function updateWeather(response) {
  let tempElement = document.querySelector("#temp");
  let temp = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  //replacement elements
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temp);
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class = "weather-icon" />`;
  getForecast(response.data.city);
}

//Arrays for days

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "11cb60e5ofea031ab3tc8e1af4a45bbb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  // let cityElement = document.querySelector("#city");
  // cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Soweto");

/*Forecast*/

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "11cb60e5ofea031ab3tc8e1af4a45bbb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(showForecast);
  console.log(apiUrl);
}

function showForecast(response) {
  console.log(response.data);
  /* let dayz = ["Tues", "Wed", "Thu", "Fri", "Sat"];*/
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
          <div class="weather-forecast-date">
            <div class="weather-forecast-day">${formatDay(day.time)}</div>
            <div ><img src="${
              day.condition.icon_url
            }"class="weather-forecast-icon"/></div>
            <div class="weather-forecast-temp">
              <div class="weather-forecast-high"><strong>${Math.round(
                day.temperature.maximum
              )}°</strong></div>
              <div class="weather-forecast-low">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
            </div>
            `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
showForecast();
