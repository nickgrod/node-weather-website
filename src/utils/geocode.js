const request = require('request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGlteW5hbWVzbmljayIsImEiOiJjanlhYXpzZjIwZDJhM2Nyd3lqMXVnam94In0.Y_Fy_EaIlhavdxXm9Oiydw'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("The request couldn't be processed...", undefined)
            return
        }
         else if (body.features.length === 0) {
            callback("Unable to find a place by that name...", undefined)
            return
        } else if (body.message) {
            callback(body.message, undefined)
            return
        }
        // const {lat:center[1], long:center[0], place: place_name } = response.body.features[0]
        latitude = body.features[0].center[1]
        longitude = body.features[0].center[0]
        location = body.features[0].place_name
        data = {
            latitude,
            longitude,
            location
        }
        console.log(data)
        callback(undefined, data)
    })
}
module.exports = geocode