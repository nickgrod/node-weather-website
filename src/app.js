const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather App',
        name: 'Dog Bounty Hunter'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Dog'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'Dog',
        message:'I Need Some Help'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location) {
        return (res.send({
            error: 'No location given'
        }))
    }
    const search = req.query.location
    geocode(search, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                res.send({error})
            }
            res.send({ forecast: forecastData, location, search})
          })

    })

})

app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error:'No search term provided'
        })
        
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404 Page',
        name: 'Dog',
        message:'That help page couldn\'t be found...'
    })
})
//404 Page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Dog',
        message:'Page not found...'
    })
})

app.listen(port, () => {
    console.log('Server is up and running.')
})
