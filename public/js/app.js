console.log('Client Side Javascript')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    const url = "/weather?address=" + location

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error) {
                messageOne.textContent = "Error: " + data.error
            } else {
                messageOne.textContent = "Location: " + data.location
                messageTwo.textContent = "Forecast: " + data.forecast + " The temperature high for today is " + data.dailyHigh + " degrees and temperature low is " + data.dailyLow + " degrees."
            }
        })
    })
})