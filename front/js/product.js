// Id de l'url récupérer
const urlId = window.location.search;

//supprimer le "?"
const id = urlId.slice(1);

//Url pour le produit
const productURL = "http://localhost:3000/api/products/" + id;
console.log(productURL);

//formater le prix :
let euro = Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });


const affichageImg = document.querySelector(".item__img")
const affichageTitle = document.querySelector("#title")
const affichagePrice = document.querySelector("#price")
const affichageContent = document.querySelector(".item__content__titlePrice")
const affichageDescription = document.querySelector("#description")
const affichageOption = document.querySelector('colors')
console.log(affichageOption)




const promise01 = fetch(productURL)
promise01
.then((response) => {
    console.log(response);

    const productData = response.json();
    console.log(productData);

    productData.then((product) => {
        console.log(product);

        const imageUrl = document.createElement("img");
        imageUrl.src = product.imageUrl;

        const altTxt = document.createElement("alt")
        altTxt.textContent = product.altTxt
        
        const title = product.name

        const price = product.price

        const description = product.description

        const color = document.createElement("option")
        color.value = product.colors
        color.textContent = product.colors
        console.log(color)

        
        affichageImg.appendChild(imageUrl)
        imageUrl.appendChild(altTxt)
        affichageTitle.innerHTML = title;
        affichagePrice.innerHTML = price;
        affichageDescription.innerHTML = description;
        
        
        
        
        
        
    
    
    })

})

.catch ((err) => {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
})
