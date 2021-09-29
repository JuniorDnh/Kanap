const app = document.getElementById('root')



const container = document.createElement('div')
container.setAttribute('class', 'container')


app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'http://localhost:3000/api/cameras', true)
request.onload = function () {
  
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach((camera) => {
        
        console.log(camera)
      const card = document.createElement('div')
      card.setAttribute('class', 'card')


      const name = document.createElement('name')
      name.textContent = camera.name

      const imageUrl = document.createElement('imageUrl')
      imageUrl.src = "http://localhost:3000/api/cameras"
      console.log(imageUrl)
      

      const price = document.createElement('price')
      price.textContent = camera.price


      

      container.appendChild(card)
      document.body.appendChild(imageUrl)
      card.appendChild(name)
      card.appendChild(price)
      
      

    
      
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()




