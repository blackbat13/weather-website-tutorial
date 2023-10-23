// Asynchronous function to fetch weather data based on a search query
async function getWeather(data) {

    // Grabbing the search input element by its ID
    let searchInput = document.getElementById("search-input");

    // Getting the value (place) entered by the user in the search input
    let place = searchInput.value;

    // Fetching geographical coordinates for the input place using the geocode API
    let response = await fetch("http://geocode.maps.co/search?q=" + place);

    // Parsing the response to JSON
    let myJson = await response.json();

    // Extracting longitude and latitude for the given place
    let lon = myJson[0]["lon"];
    let lat = myJson[0]["lat"];

    // Fetching weather data for the given coordinates using the open-meteo API
    let weatherResponse = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current_weather=true");

    // Parsing the weather response to JSON
    let weatherJson = await weatherResponse.json();

    // Extracting current weather data from the response
    let currentWeather = weatherJson["current_weather"];

    // Grabbing the element to display the temperature by its ID
    let temperatureEl = document.getElementById("temperature-text");

    // Updating the search input with the complete name of the place for clarity
    place = myJson[0]["display_name"];
    searchInput.value = place;

    // Logging current weather data to console (for debugging or other purposes)
    console.log(currentWeather);

    // Updating the temperature element with the current temperature value
    temperatureEl.innerHTML = currentWeather["temperature"] + " °C";

    // Retrieve the day status (1 for day, 0 for night) from the currentWeather object
    let isDay = currentWeather["is_day"];

    // Retrieve the weather code that represents the current weather condition
    let weatherCode = currentWeather["weathercode"];

    // Check the weather condition based on the weather code
    if (weatherCode >= 95) {
        // Set background image to 'storm.jpg' and text color to white if there's a storm
        document.body.style.backgroundImage = "url('./assets/images/storm.jpg')";
        document.body.style.color = "#fff";
    } else if (weatherCode >= 61 && weatherCode <= 65) {
        // Set background image to 'rain.jpg' and text color to black if it's raining
        document.body.style.backgroundImage = "url('./assets/images/rain.jpg')";
        document.body.style.color = "#000";
    } else if (isDay == 0) {
        // Set background image to 'night.jpg' and text color to white if it's nighttime
        document.body.style.backgroundImage = "url('./assets/images/night.jpg')";
        document.body.style.color = "#fff";
    } else {
        // Default: set background image to 'clear.jpg' and text color to black
        document.body.style.backgroundImage = "url('./assets/images/clear.jpg')";
        document.body.style.color = "#000";
    }
}