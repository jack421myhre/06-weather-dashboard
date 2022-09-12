// API key
const apiKey = "34aca20e0979c07d79c0d88adea87fbf";
let city;
let searchBoxEl = $("#search-box");
let searchForm = $("#search-form");

// DOM variables
let cityTitle = $(".city-name");
let temp = $("#temp");
let wind = $("#wind");
let humidity = $("#humidity");
let uvIndex = $("#uv-index");

function weatherSearch() {
    city = searchBoxEl.text().trim();
    setUrl();
    getWeather(queryUrl);
}

// Fetch API
function setUrl() {
    let queryUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial" +
        "&appid=" +
        apiKey;
    return queryUrl;
}

function getWeather(queryUrl) {
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityTitle.text(`${data.name} ${data.weather[0].main}`);
            temp.text(
                `${Math.trunc(data.main.temp)} ${String.fromCharCode(176)} F`
            );
            wind.text(`${data.wind.speed} MPH`);
            humidity.text(`${data.main.humidity} %`);
            uvIndex.text("Index PH");
            console.log(data.dt);
        });
}
// getWeather(queryUrl);

searchForm.on("submit", function (e) {
    e.preventDefault();
    weatherSearch();
    console.log("clicked");
});
