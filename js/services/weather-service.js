const W_KEY = 'fbb8e813e822db0167c06ff43fcae9ff'

export default {
    getWeatherByLocation
}

function getWeatherByLocation(lat,lng){
    console.log('lat lng',lat,lng)
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${W_KEY}&units=metric`

    // console.log('apiUrl',apiUrl);
    var res = axios.get(apiUrl)
        .then(res => {
            // console.log(res.data)

            return {
                temp: res.data.main.temp,
                min_temp: res.data.main.temp_min,
                max_temp: res.data.main.temp_max, 
                humidity: res.data.main.humidity,
                text: res.data.weather[0].description,
                name: res.data.name
            }
        })
    return res
}

