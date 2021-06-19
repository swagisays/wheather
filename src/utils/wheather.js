const request = require('request')

const forcast = (lac, long, callback) => {

    access_key = process.env.ACCESS_KEY
    const url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + lac + ',' + long

    request({url, json: true }, (err, {body} ) => {

        if (err) {
            callback('unable to connect to weather api')

        } else if (body.error) {

            callback('unable to find location')
        } else {
            const forcastData = {
                weather_descriptions: body.current.weather_descriptions,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            }
            callback(undefined, forcastData)
        }
    })

}
module.exports = forcast