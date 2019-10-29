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
    const url = "http://localhost:3000/weather?address=" + location

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error) {
                messageOne.textContent = "Error: " + data.error
            } else {
                messageOne.textContent = "Location: " + data.location
                messageTwo.textContent = "Forecast: " + data.forecast
            }
        })
    })
})