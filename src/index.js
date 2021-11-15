// Time and Week day
function dateMaker(now) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = weekDays[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${weekDay} ${hour}:${minute}`;
}
let now = new Date();

let h4 = document.querySelector("h4");
h4.innerHTML = dateMaker(now);

// Adding entered city
function displayWeather(response) {
  let tempElement = response.data.main.temp;
  let inputTemp = document.querySelector(".curruntTemp");
  inputTemp.innerHTML = `${Math.round(tempElement)} °C`;
  let button = document.querySelector("#unitButton");
  button.innerHTML = "to °F";
}

function addCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#entered-city");
  let curruntCity = document.querySelector(".curruntCity");
  curruntCity.innerHTML = inputCity.value;

  //Receiving actual temperature

  let apiKey = "b0052e8711d9397947c7695febf9aa9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let citySearch = document.querySelector("#enter-city");

citySearch.addEventListener("submit", addCity);

function changeUnit(event) {
  event.preventDefault();
  let button = document.querySelector("#unitButton");
  if (button.innerHTML === "to °F") {
    let inputTemp = document.querySelector(".curruntTemp");
    let tempElement = Number(inputTemp.innerHTML.replace(" °C", ""));
    tempElement = Math.round(tempElement * 1.8 + 32);
    inputTemp.innerHTML = `${tempElement} °F`;
    button.innerHTML = "to °C";
  } else {
    let inputTemp = document.querySelector(".curruntTemp");
    let tempElement = Number(inputTemp.innerHTML.replace(" °F", ""));
    tempElement = Math.round((tempElement - 32) / 1.8);
    inputTemp.innerHTML = `${tempElement} °C`;
    button.innerHTML = "to °F";
  }
}
let unit = document.querySelector("#changeUnit");
unit.addEventListener("submit", changeUnit);

// Get currunt location and update city and temperature
function showCity(response) {
  let inputCity = response.data.name;
  let curruntCity = document.querySelector(".curruntCity");
  curruntCity.innerHTML = inputCity.value;

  let apiKey = "b0052e8711d9397947c7695febf9aa9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function retrievePosition(position) {
  let apiKey = "b0052e8711d9397947c7695febf9aa9a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCity);
}

function receiveLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let myLocation = document.querySelector("#curruntLocation");
myLocation.addEventListener("submit", receiveLocation);
