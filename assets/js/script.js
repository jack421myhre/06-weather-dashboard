// API key
const apiKey = "34aca20e0979c07d79c0d88adea87fbf";

let searchBoxEl = $("#search-box");
let searchForm = $("#search-form");

// DOM variables
let cityTitle = $(".city-name");
let temp = $("#temp");
let wind = $("#wind");
let humidity = $("#humidity");

// cards
let tempCard = $(".tempCard");
let windCard = $(".windCard");
let humidCard = $(".humidCard");

// Sets URL and city value from input field
function weatherSearch() {
    let city = searchBoxEl.val();
    let queryUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial" +
        "&appid=" +
        apiKey;

    getWeather(queryUrl);
}

// Gets weather data
function getWeather(queryUrl) {
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            cityTitle.text(`${data.name}`);
            temp.text(
                `${Math.trunc(data.main.temp)} ${String.fromCharCode(176)} F`
            );
            wind.text(`Wind: ${data.wind.speed} MPH`);
            humidity.text(`Humidity: ${data.main.humidity} %`);
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            forecast(lat, lon);
        });
}

// Generates 5 day forecast
function forecast(lat, lon) {
    let forecastUrl =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&appid=" +
        apiKey;

    getFiveDay(forecastUrl);
}

// Populates 5 day forecast to the page
function getFiveDay(forecastUrl) {
    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // 3, 11, 19, 27, 35
            let x = 0;
            for (let i = 3; i < 36; i += 8) {
                let time = data.list[i].dt_txt.split(" ");

                document.querySelector(`#day-${x}`).children[0].textContent =
                    time[0];
                document.querySelector(
                    `#day-${x}`
                ).children[1].textContent = `Temp: ${Math.trunc(
                    data.list[i].main.temp
                )} ${String.fromCharCode(176)} F`;
                document.querySelector(
                    `#day-${x}`
                ).children[2].textContent = `Wind: ${data.list[i].wind.speed} MPH`;
                document.querySelector(
                    `#day-${x}`
                ).children[3].textContent = `Humidity: ${data.list[i].main.humidity} %`;
                x++;
            }
        });
}

// event listener for search button
searchForm.on("submit", function (e) {
    e.preventDefault();
    weatherSearch();
    searchBoxEl.val("");
});
