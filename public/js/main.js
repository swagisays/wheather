const input = document.querySelector('input')
const form = document.querySelector('form')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const address = input.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch("http://localhost:3000/weather/?address="+address).then(res => {
        res.json().then(data => {
            if (data.err){
                msg1.textContent = data.err
            }else{
            msg1.textContent = data.location
            msg2.textContent = data.forcast
            }

        })
    })

})