async function getWeather(data) {
    let searchInput = document.getElementById("search-input");
    let place = searchInput.value;
    let response = await fetch("http://geocode.maps.co/search?q=" + place);
    let myJson = await response.json();
    let lon = myJson[0]["lon"];
    let lat = myJson[0]["lat"];
    let weatherResponse = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current_weather=true");
    let weatherJson = await weatherResponse.json();
    let currentWeather = weatherJson["current_weather"];
    let temperatureEl = document.getElementById("temperature");
    place = myJson[0]["display_name"];
    searchInput.value = place;
    console.log(currentWeather);
    temperatureEl.innerHTML = currentWeather["temperature"] + " °C";
}