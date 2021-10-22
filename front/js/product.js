// Id de l'url récupérer
const urlId = window.location.search;

//supprimer le "?"
const id = urlId.slice(1);

//Url pour le produit
const productURL = "http://localhost:3000/api/products/" + id;
console.log(productURL);

//formater le prix :
let euro = Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

//On selectionne les balises HTML pour intégrer le JS
const affichageImg = document.querySelector(".item__img");
const affichageTitle = document.querySelector("#title");
const affichagePrice = document.querySelector("#price");
const affichageContent = document.querySelector(".item__content__titlePrice");
const affichageDescription = document.querySelector("#description");
const affichageOption = document.querySelector("#colors");
const affButton = document.querySelector(".item__content__addButton");
const linkButton = document.querySelector("#addToCart");
console.log(linkButton);

//création d'une constante pour afficher les elements de l'API
const promise01 = fetch(productURL);
promise01
  .then((response) => {
    console.log(response);

    const productData = response.json();
    console.log(productData);

    productData.then((product) => {
      console.log(product);

      const imageUrl = document.createElement("img");
      imageUrl.src = product.imageUrl;
      affichageImg.appendChild(imageUrl);

      const altTxt = document.createElement("alt");
      altTxt.textContent = product.altTxt;
      imageUrl.appendChild(altTxt);

      const title = product.name;
      affichageTitle.innerHTML = title;

      const price = product.price;
      affichagePrice.innerHTML = price;

      const description = product.description;
      affichageDescription.innerHTML = description;

      for (index in product.colors) {
        affichageOption.options[affichageOption.options.length] = new Option(
          product.colors[index],
          product.colors[index]
        );
      }
    });
  })

  .catch((err) => {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `It's not working!`;
  });


  
