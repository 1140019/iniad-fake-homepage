
let API_KEY_GOOGLE = 'AIzaSyBOZ6tkbWNdSqfb_o_QMTbBH11KjVT60vc';
let API_KEY_WEATHER = '03a7fd64dbd45d244a20c28f2d8ff6be';

let map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.7804643, lng: 139.7151025 },
        zoom: 15
    });
}