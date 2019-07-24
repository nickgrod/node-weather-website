console.log("Client side JS File Has Loaded.")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationName = document.querySelector('#location-name')
const forecast = document.querySelector('#forecast')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    locationName.textContent = 'Loading...'
    forecast.textContent = ''
    if (!location) {
        locationName.textContent = "No value provided."
        return
    }
    fetch('/weather?location=' + location).then( (response) => {
    response.json().then((data) => {
        if(data.error){
            return locationName.textContent = data.error
        }
        locationName.textContent = data.location
        forecast.textContent = data.forecast
    })
})
})