// Id de l'url récupérer
const urlId = window.location.search;

//supprimer le "?"
const id = urlId.slice(1);

//Url pour le produit
const productURL = "http://localhost:3000/api/products/" + id;
console.log(productURL);

//formater le prix :
let euro = Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

const affichageImg = document.querySelector(".item__img");
const affichageTitle = document.querySelector("#title");
const affichagePrice = document.querySelector("#price");
const affichageContent = document.querySelector(".item__content__titlePrice");
const affichageDescription = document.querySelector("#description");
const affichageOption = document.querySelector("#colors");
const affButton = document.querySelector(".item__content__addButton");
const linkButton = document.querySelector("#addToCart");
console.log(linkButton);

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

      const altTxt = document.createElement("alt");
      altTxt.textContent = product.altTxt;

      const title = product.name;

      const price = product.price;

      const description = product.description;

      var colorValue0 = product.colors[0];
      var colorValue1 = product.colors[1];
      var colorValue2 = product.colors[2];
      var colorValue3 = product.colors[3];
      const color0 = document.createElement("option");
      const color1 = document.createElement("option");
      const color2 = document.createElement("option");
      const color3 = document.createElement("option");
      color0.value = colorValue0;
      color1.value = colorValue1;
      color2.value = colorValue2;
      color3.value = colorValue3;
      color0.textContent = colorValue0;
      color1.textContent = colorValue1;
      color2.textContent = colorValue2;
      color3.textContent = colorValue3;

      affichageImg.appendChild(imageUrl);
      imageUrl.appendChild(altTxt);
      affichageTitle.innerHTML = title;
      affichagePrice.innerHTML = price;
      affichageDescription.innerHTML = description;
      affichageOption.appendChild(color0);
      affichageOption.appendChild(color1);
      affichageOption.appendChild(color2);
      affichageOption.appendChild(color3);
    });
  })

  .catch((err) => {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
  });
