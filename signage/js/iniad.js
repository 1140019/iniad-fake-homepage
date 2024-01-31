
let API_KEY_GOOGLE = 'AIzaSyBOZ6tkbWNdSqfb_o_QMTbBH11KjVT60vc';
let API_KEY_WEATHER = '03a7fd64dbd45d244a20c28f2d8ff6be';


window.onload = function() {
    findlocation();
    findWeather();
}

let map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.7804643, lng: 139.7151025 },
        zoom: 16
    });
}

function apiError(error) {
    console.log('ERROR: ' + error);
}

function findWeather() {
    // GoogleAPIから緯度・経度の取得
    let inputAddress = document.getElementById('address');
    let address = inputAddress.textContent;
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) + '&key=' + API_KEY_GOOGLE)
        .then(response => response.json())
        .then(displayCoordinate)
        .catch(apiError);
}

function displayCoordinate(result) {
    // error
    if (result == null) {
        return;
    }

    let location = result.results[0].geometry.location;
    let lat = document.getElementById('latitude');
    let lon = document.getElementById('longitude');
    lat.textContent = location.lat;
    lon.textContent = location.lng;
    
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + location.lat + '&lon=' + location.lng + '&units=metric&appid=' + API_KEY_WEATHER)
        .then(response => response.json())
        .then(displayWeather)
        .catch(apiError);
}


function displayWeather(result) {
    let city = document.getElementById('td-city');
    let temperature = document.getElementById('td-temperature');
    let humidity = document.getElementById('td-humidity');
    let pressure = document.getElementById('td-pressure');
    let wind = document.getElementById('td-wind');
    let weatherCell = document.getElementById('weatherCell');

    city.textContent = result.name;
    temperature.textContent = result.main.temp;
    humidity.textContent = result.main.humidity;
    pressure.textContent = result.main.pressure;
    wind.textContent = result.wind.speed;

    
    const weatherCode = result.weather[0].icon;
    const weatherImage = `<img src="https://openweathermap.org/img/w/${weatherCode}.png" alt="${result.weather[0].description}">`;

    
    weatherCell.innerHTML = `${result.weather[0].main} ${weatherImage}`;
  }

  findWeather();
  



function findlocation(){
    // GoogleAPIから緯度・経度の取得
    let inputAddress = document.getElementById("address");
    let address = inputAddress.textContent;
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) + '&key=' + API_KEY_GOOGLE)
    .then(response => response.json())
    .then(displaymap)
    .catch(apiError);
}

function displaymap(result){
    // error
    if(result == null){
        return;
    }

    let location = result.results[0].geometry.location;
    let output_lat = document.getElementById("latitude");
    let output_lon = document.getElementById("longitude");
    let lat = location.lat;
    let lon = location.lng;
    output_lat.textContent = lat;
    output_lon.textContent = lon;
    map.setCenter({ lat: Number(lat), lng: Number(lon) });

    // // ピンを立てる
    // new google.maps.Marker({
    //     position: center,
    //     map: map
    // });
}

let address = findlocation();

let weatherIcons = {
    'Clear': 'clear.png',
    'Clouds': 'clouds.png',
    'Rain': 'rain.png',
    'Snow': 'snow.png'
};