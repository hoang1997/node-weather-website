const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiaG9hbmcxOTk3IiwiYSI6ImNrMmF4emNhOTN1cG4zbW12MXJzeWJvM3EifQ.PUNA8SWGX0QdUhFJ0WHQmA"
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if(body.features === undefined || body.features.length == 0) {
            callback('Unable to find location, please try again', undefined)
        } else {
            callback(undefined , {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode