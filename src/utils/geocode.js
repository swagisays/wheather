const request = require('request')

const geocoding = (addres, callback) => {

    const apiKey = process.env.API_KEY

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(addres) + ".json?access_token=" + apiKey+"&limit=1"

    request({url, json: true }, (err, {body} = {}) => {

        if (err) {
            callback('unable to connect with wheather server.\n please check your internet connection.');


        } else if (body.features.length === 0) {
            callback('unable to find that location.');

        } else {

            const data = {
                location: body.features[0].place_name,
                long: body.features[0].center[0],
                lac: body.features[0].center[1]
            }

            callback(undefined, data);

        }


    })



}
module.exports = geocoding;