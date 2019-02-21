const LOC_API_KEI = 'AIzaSyAVYfPJkGVVDmnWNHgknGYnP4x7hhAwPGk'

export default {
    getLocs,
    getPosition,
    getFormattedAddressByLocation,
    getLocationBySearch
}

var locs = [{lat: 11.22, lng: 22.11}]

function getLocs1() {
    return Promise.resolve(locs); 
}

function getLocs() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(locs);
        }, 2000)
    });
 
}


function getPosition() {
    // console.log('Getting Pos');
    
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}



function getFormattedAddressByLocation(lat,lng){
    let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${LOC_API_KEI}`
    // console.log('apiUrl',apiUrl);
    var res = axios.get(apiUrl)
        .then(res => res.data.results[0].formatted_address)
    return res
}


function getLocationBySearch(searchStr){
    let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchStr}&key=${LOC_API_KEI}`
    console.log('apiUrl',apiUrl);
    var res = axios.get(apiUrl)
        .then(res => res.data.results[0].geometry.location)
    return res
}