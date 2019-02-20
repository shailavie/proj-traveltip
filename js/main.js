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


export function renderLocationName() {
    locService.getPosition()
        .then(myPos => {
            let lat = myPos.coords.latitude;
            let lng = myPos.coords.longitude;
            console.log(myPos.coords)
            locService.getFormattedAddressByLocation(lat, lng)
                .then(res => {
                    document.querySelector('.formatted-address').innerText = res
                })
        })
}

window.onload = () => {
    mapService.initMap()
        .then(
            () => {
                locService.getPosition()
                    .then(myPos => {
                        let lat = myPos.coords.latitude;
                        let lng = myPos.coords.longitude;
                        console.log(myPos.coords)
                        mapService.addMarker({ lat: lat, lng: lng }, 'You are here');
                        mapService.panTo({ lat: lat, lng: lng })
                        weatherService.getWeatherByLocation(lat, lng).then(res => {
                            renderWeather(res);
                        })
                    })
            }
        ).catch(console.warn);



    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

 

export function renderWeather(weather) {
    var strHTML = `
        <h4><span>What\'s going on in ${weather.name}? <h4><br/>
        <h5>${weather.text} with ${weather.temp}°C and ${weather.humidity}% humidity</span></h5>`


    // for (let key in weather) {
    //     var niceKey = key.charAt(0).toUpperCase()+key.slice(1).replace('_','')
    //     strHTML += `<li>${niceKey}:${weather[key]}</li>`
    // }
    document.querySelector('.weather-stats').innerHTML = strHTML;
}


// Event Listeners

document.querySelector('.my-location-go').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);

    //TO DO - Get my location from location services
    mapService.panTo(35.6895, 139.6917);
})

document.querySelector('.location-search-go').addEventListener('click', (ev) => {
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
                let lat = res.lat
                let lng = res.lng
                mapService.panTo(lat, lng)
            })
    }
})

document.querySelector('.my-location-go').addEventListener('click', (ev) => {
    locService.getPosition().then(myPos => {
        let lat = myPos.coords.latitude
        let lng = myPos.coords.longitude
        console.log(lat, lng)
        mapService.panTo(lat, lng)
    })
    renderLocationName()
})



document.querySelector('.qa-btn').addEventListener('click', (ev) => {
    renderLocationName()
})





