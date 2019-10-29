const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Initialise express
const app = express()

//Define Paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (request, response)=>{
    response.render('index', {
        title: 'Weather App',
        name: 'Joe Hoang'
    })
})

app.get('/about', (request, response)=>{
    response.render('about', {
        title: 'About',
        name: 'Joe Hoang'
    })
})

app.get('/help', (request, response)=>{
    response.render('help', {
        title: 'Help',
        helpText: 'This is helpful text',
        name: 'Joe Hoang'
    })
})

app.get('/weather', (request, response)=>{
    if(!request.query.address) {
        return response.send({
            error: 'Must provide an address'
        })
    }

    geocode(request.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error) {
            return response.send({error})
        } 
        
        forecast(latitude, longitude , (error, {summary, temperature, precipProbability}) => {
            if(error) {
                return response.send({error})
            } 
            
            response.send({
                forecast: summary,
                temperature: temperature,
                precipProbability: precipProbability,
                location,
                address: request.query.address
            })
        })
    })
})

app.get('/help/*', (request, response)=>{
    response.render('404', {
        title: 'Error: 404',
        errorMessage: 'Help article not found'
    })
})

//Has to be last because it needs to go through all the ones that could match
app.get('*', (request, response)=>{
    response.render('404', {
        title: 'Error: 404',
        errorMessage: 'Page not found.',
        name: 'Joe Hoang'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port: 3000')
})