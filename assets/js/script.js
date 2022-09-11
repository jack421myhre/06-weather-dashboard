// API key
const apiKey = "34aca20e0979c07d79c0d88adea87fbf";
let city = "Chicago";

// DOM variables
let cityTitle = $(".city-name");
let temp = $("#temp");
let wind = $("#wind");
let humidity = $("#humidity");
let uvIndex = $("#uv-index");

cityTitle.text(city);

// Fetch API
let queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

function tempConverter(kelvin) {
    let toFahrenheit = (kelvin - 273.15) * 1.8 + 32;
    return toFahrenheit;
}

function getWeather(queryUrl) {
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityTitle.text(`${data.name} ${data.weather[0].main}`);
            temp.text(
                `${Math.trunc(
                    tempConverter(data.main.temp)
                )} ${String.fromCharCode(176)} F`
            );
            wind.text(`${data.wind.speed} MPH`);
            humidity.text(`${data.main.humidity} %`);
            uvIndex.text("Index PH");
        });
}
getWeather(queryUrl);

// fetch(queryUrl)
//     .then(function (response) {
//         response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });

let searchBoxEl = $("#search-box");
// console.log(searchBoxEl).text();
