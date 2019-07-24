const request = require('request')

const forecast = (lat, long, callback) => {

    if(!long || !lat) {
        console.log("Please provide both a latitude and a longitude.")
        return
    }
    url = 'https://api.darksky.net/forecast/a09c6a82d724332b7dc116c7858ec0d7/' + lat + ',' + long
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("The request couldn't be processed...", undefined)
            return
        }
         else if (body.error) {
            callback("The request data was poorly formatted...", undefined)
            return
        } 
        callback(undefined, (body.daily.data[0].summary + " The weather is going to be " + body.currently.summary + " with a high of " + body.daily.data[0].temperatureMax))

    })
}

module.exports = forecast