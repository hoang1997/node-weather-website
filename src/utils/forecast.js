const request = require('request')

const forecast = (lat, long, callback)=>{
    const url = "https://api.darksky.net/forecast/a28bcec4d39de14aa6b1a19c7e9e2b7e/" + lat + "," + long + "?units=si"
    request({url, json:true}, (error, {body})=>{
        if(error) {
            callback("Unable to connect to forecast services", undefined)
        } else if(body.error) {
            callback("Unable to find location, please try again", undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast