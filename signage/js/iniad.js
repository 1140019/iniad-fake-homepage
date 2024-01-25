
let API_KEY_GOOGLE = 'AIzaSyBOZ6tkbWNdSqfb_o_QMTbBH11KjVT60vc';
let API_KEY_WEATHER = '03a7fd64dbd45d244a20c28f2d8ff6be';

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