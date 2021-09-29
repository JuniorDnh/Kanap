const url = 'http://localhost:3000/api/cameras';

fetch(url)

.then(function (response) {
    return response.json()
}).then(function (data){
    console.log(data)
})