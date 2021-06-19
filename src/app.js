const geocoding = require('./utils/geocode');
const wheather = require('./utils/wheather');
const express = require('express');
const path = require('path');
const hbs = require('hbs')
require('dotenv').config()


const app = express();
const partialsPath = path.join(__dirname,'./template/partials')
const viewsPath = path.join(__dirname,'./template/views')


app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('weather',{
        title: 'Weather',
        author: 'Swagi Says'
    })
})


app.get('/weather', (req,res)=> {

    if (!req.query.address) {
        return res.send({
            err: 'please provide an address'
        })
        
        
    }else {
        geocoding( req.query.address,(err,{location, long,lac} = {}) => {
            if (err) {
                return res.send({
                    err
                })
                
            } else {
                
                wheather(lac,long,(err,{weather_descriptions,temperature,feelslike} = {})=> {
                    if (err) {
                        return console.log(err);
                    }

                    const forcast = "It's "+weather_descriptions[0]+", "+temperature+" degree Out Their, it Feelslike "+feelslike + " degree"
                        res.send({                            
                            location,
                            forcast                            
                        })
                })
            }
        })
    }

})

app.get('*', (req,res) => {
    res.render('404',{
        title: 'Error 404',
        msg: 'Page Not Found',
        author: 'Swagi Says'
    })
})

app.listen('3000', (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('server is running on port 3000');
})