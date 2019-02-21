console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather-service.js';





export function onAddMarker() {
    console.log('potato')
    locService.getPosition()
        .then(myPos => {
            let lat = myPos.coords.latitude;
            let lng = myPos.coords.longitude;
            console.log(myPos.coords)
            mapService.addMarker({ lat: lat, lng: lng }, 'You are here');
        })
}


window.onload = () => {
    mapService.initMap()
        .then(
            () => {
                getCurrPosition().then(latLng => {
                    mapService.panTo(latLng)
                    mapService.renderLocationName(latLng.lat, latLng.lng)
                    mapService.renderLocationAndMarker(latLng.lat, latLng.lng)
                    mapService.renderWeather(latLng.lat, latLng.lng)
                })
                // locService.getPosition()
                //     .then(myPos => {
                //         let latLng = {
                //             lat: myPos.coords.latitude,
                //             lng: myPos.coords.longitude
                //         }

                //         // renderLocationAndMarker(latLng)
                //         // renderWeather(latLng)
                //     })
                // mapService.setAutoComplete()
                // setAutoComplete()
                //     .then(res => console.log(res))
            }
        ).catch(console.warn);
}


function getCurrPosition() {
    locService.getPosition()
        .then(myPos => {
            let latLng = {
                lat: myPos.coords.latitude,
                lng: myPos.coords.longitude
            }
            return latLng
        })
}


// Event Listeners

document.querySelector('.btn-my-location-go').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);

    //TO DO - Get my location from location services
    mapService.panTo(31.2623104, 35.209216);
    // (lat = , lng =)
})

document.querySelector('.btn-search-location-go').addEventListener('click', (ev) => {
    // if (ev.key === 'enter') {
    // console.log('Aha!', ev);
    let elSearchInput = document.querySelector('.location-search-input').value
    console.log('User pressed "GO" and searched for:', elSearchInput);
    let searchStr = elSearchInput.replace(/\s/ig, '+').toLowerCase()
    console.log(searchStr)

})

document.querySelector('.location-search-input').addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
        // console.log('Aha!', ev);
        let elSearchInput = document.querySelector('.location-search-input').value
        console.log('User pressed enter and searched for:', elSearchInput);
        let searchStr = elSearchInput.replace(/\s/ig, '+').toLowerCase()
        console.log(searchStr)
        locService.getLocationBySearch(searchStr)
            .then(res => {
                let latLng = {
                    lat: res.coords.latitude,
                    lng: res.coords.longitude
                }
                console.log('focus here', latLng)
                // let lat = res.lat
                // let lng = res.lng
                // mapService.panTo(lat, lng)
                mapService.renderLocationName(latLng.lat, latLng.lng)
                mapService.renderLocationAndMarker(latLng.lat, latLng.lng)
                mapService.renderWeather(latLng.lat, latLng.lng)
            })
    }
})

document.querySelector('.btn-my-location-go').addEventListener('click', (ev) => {
    locService.getPosition().then(myPos => {
        let lat = myPos.coords.latitude
        let lng = myPos.coords.longitude
        console.log('hiiiiiiiii',lat, lng)
        mapService.panTo(lat, lng)
        let latLng = {
            lat: myPos.coords.latitude,
            lng: myPos.coords.longitude
        }
        mapService.renderLocationName(latLng.lat, latLng.lng)
        mapService.renderLocationAndMarker(latLng.lat, latLng.lng)
        mapService.renderWeather(latLng.lat, latLng.lng)
    })
})



// document.querySelector('.qa-btn').addEventListener('click', (ev) => {
//     mapService.renderLocationName()
// })





