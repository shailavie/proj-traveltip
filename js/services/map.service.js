import weatherService from './weather-service.js';
import locService from './loc.service.js';


export default {
    initMap,
    addMarker,
    panTo,
    setMapOnCurrLocation,
    renderLocationName,
    renderLocationAndMarker,
    renderWeather
}

const API_KEY = 'AIzaSyAVYfPJkGVVDmnWNHgknGYnP4x7hhAwPGk';

// const API_KEY = '';

var map;

function setMapOnCurrLocation(laLatLng) {
    // console.log(lat,lng)
    // map.panTo(lat, lng;
    map.panTo(laLatLng);
    // document.querySelector('.selected-location').innerText = place.formatted_address
    map.setZoom(10);
}

// function setSearchLocation(lat,lng){
//     var prm = Promise.resolve(lat,lng)
// }

function initMap(lat = 31.2623104, lng = 35.209216) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 10
                })
            let elInput = document.querySelector('.location-search-input')
            let autocomplete = new google.maps.places.Autocomplete(elInput)
            autocomplete.addListener('place_changed', () => {
                let place = autocomplete.getPlace();
                // console.log('Wowza', place);
                let newLocation = place.geometry.location;
                let lat = newLocation.lat()
                let lng = newLocation.lng()

                console.log('toast potato', lat, lng)

                // setSearchLocation(lat,lng)
                renderLocationAndMarker(lat, lng)
                renderWeather(lat, lng)
                renderLocationName(lat, lng)
                return newLocation
            })
            // console.log('Map!', map);
        })
}

function renderLocationAndMarker(lat, lng) {
    let latLng = { lat: lat, lng: lng }
    console.log(latLng)
    addMarker(latLng, 'You are here');
    panTo({ lat: lat, lng: lng })
}

function renderWeather(lat, lng) {
    console.log('over here', lat, lng)
    weatherService.getWeatherByLocation(lat, lng)
        .then(res => {
            getWeatherHtml(res);
        })
}

function getWeatherHtml(weather) {
    var strHTML = `
        <h4><span>What\'s going on in ${weather.name}? <h4>
        <h5>${weather.text} with ${weather.temp}°C and ${weather.humidity}% humidity</span></h5>`
    document.querySelector('.weather-stats').innerHTML = strHTML;
}


function renderLocationName(lat, lng) {
    locService.getFormattedAddressByLocation(lat, lng)
        .then(res => {
            document.querySelector('.formatted-address').innerText = res
        })

}



function addMarker(loc, name) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: name || 'hello world'
    });
    marker.setMap(map);
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
    map.setZoom(14);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    // const API_KEY = 'AIzaSyDPBW6Icq4u_0ksmH0rc0q15nYrS2r3SRg';
    // const API_KEY = '';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
        // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
    })
}




