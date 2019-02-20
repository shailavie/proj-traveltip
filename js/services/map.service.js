
export default {
    initMap,
    addMarker,
    panTo
}

const API_KEY = 'AIzaSyAVYfPJkGVVDmnWNHgknGYnP4x7hhAwPGk';

// const API_KEY = '';

var map;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            let elInput = document.querySelector('.location-search-input')
            let autocomplete = new google.maps.places.Autocomplete(elInput)
            autocomplete.addListener('place_changed', () => {
                let place = autocomplete.getPlace();
                console.log('Wowza',place);
                let newLocation = place.geometry.location;
                panTo(newLocation.lat(), newLocation.lng());
                // document.querySelector('.selected-location').innerText = place.formatted_address
                map.setZoom(17);
                addMarker(newLocation,'here')
            })
            console.log('Map!', map);
        })
}


function addMarker(loc, name) {
    console.log('trying to add new marker!')
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
    map.setZoom(20);
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




