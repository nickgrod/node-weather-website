const request = require('request')
const weather = (lat, long, place) => {
    url = 'https://api.darksky.net/forecast/a09c6a82d724332b7dc116c7858ec0d7/' + lat + ',' + long
    request({url: url, json: true}, (error, response) => {
        if (error) {
            console.log("Couldn't reach the weather service...")
            return
        } else if (response.body.error) {
            console.log("Error, could not get data for the following reason:")
            console.log(response.body.error)
            return
        }
        console.log(response.body.daily.data[0].summary + " The weather in " + place + " is going to be " + response.body.currently.summary + " with a high of " + response.body.daily.data[0].temperatureMax)
    })
}
module.exports = weather
