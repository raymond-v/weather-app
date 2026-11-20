import "./style.css"

const form = document.querySelector('form')
const input = document.querySelector('input')
const divDisplay = document.querySelector('#display')

const getData = async(location) => {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=current,days,hours&contentType=json`)
    if (!response.ok) {
        throw new Error('Unable to retrieve weather data.')
    }
    const data = await response.json()
    console.log(data)
    return data
}

const processWeatherData = (weather) => {
    return {
        address: weather.address,
        temp: weather.currentConditions.temp
    }
}

let weather
let temp
let currentUnit = 'C'

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const location = input.value
        const data = await getData(location)
        weather = processWeatherData(data)
        temp = weather.temp
        divDisplay.innerHTML = `The weather in ${weather.address} is ${temp} °C <button id="toggle">Toggle Unit</button>`
    } catch(error) {
        divDisplay.textContent = error.message
    }

})


divDisplay.addEventListener('click', (e) => {
    if (e.target.id === "toggle") {
        if (currentUnit == 'C') {
            const formulaF = (temp * 9 / 5) + 32
            divDisplay.innerHTML = `The weather in ${weather.address} is ${formulaF.toFixed(1)} °F <button id="toggle">Toggle °C / °F</button>`
            currentUnit = 'F'
        } else if (currentUnit == 'F') {
            divDisplay.innerHTML = `The weather in ${weather.address} is ${temp.toFixed(1)} °C <button id="toggle">Toggle °C / °F</button>`
            currentUnit = 'C'
        }
    }
})