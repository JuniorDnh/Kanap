// Récupération du localstorage dans un tableau

let arrayInCart = JSON.parse(localStorage.getItem("products"));


// Récuperation des données de l'API pour chaque item du tableau

let protocol = "http";
let domain = "localhost:3000";

for (let item of arrayInCart) {
  let itemID = item.id;
  let itemQuantity = item.quantity;
  let itemColor = item.color;

  fetch(protocol + "://" + domain + "/api/products/" + itemID)
    .catch((error) => {
      let container = document.querySelector(".cart");
      container.innerHTML = "<p class= error_message> It's not working!</p>";
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (apiResults) {
      let product = apiResults;

      let altTxt = product.altTxt;
      let imageUrl = product.imageUrl;
      let name = product.name;
      let price = product.price;
      let itemTotalPrice = price * itemQuantity;

      // Affichage des produits dans le panier
      const cartContent = `<article class="cart__item" data-id="${itemID}">
                <div class="cart__item__img">
                    <img src="${imageUrl}" alt="${altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                <h2>${name}</h2>
                <p>${itemColor}</p>
                <p>${itemTotalPrice} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemQuantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
                </div>
                </article>`;
      document
        .getElementById("cart__items")
        .insertAdjacentHTML("beforeend", cartContent);
    });
}

//Calcul de la quantité totale d'article dans le panier
let arrayQuantities = [];

for (let item of arrayInCart) {
  let itemQuantity = item.quantity;

  arrayQuantities.push(itemQuantity);
}
console.log(arrayQuantities);

const reducer = (previousValue, currentValue) => previousValue + currentValue;

let totalQuantityInCart = arrayQuantities.reduce(reducer);

document.querySelector("#totalQuantity").innerHTML = totalQuantityInCart;

//Calcul du prix total

const arrayItemsPrices = [];

for (let item of arrayInCart) {
  let itemQuantity = item.quantity;
  let itemID = item.id;

  fetch(protocol + "://" + domain + "/api/products/" + itemID)
    .then(function (response) {
      return response.json();
    })
    .then(function (apiResults) {
      let product = apiResults;

      let altTxt = product.altTxt;
      let imageUrl = product.imageUrl;
      let name = product.name;
      let price = product.price;
      let itemTotalPrice = price * itemQuantity;
      arrayItemsPrices.push(itemTotalPrice);

      let totalPriceOfCart = arrayItemsPrices.reduce(reducer);
      document.querySelector("#totalPrice").innerHTML = totalPriceOfCart;
    });
}
console.log(arrayItemsPrices);


//Supprimer un élément du panier
const deleteItemInCart = document.querySelector(".deleteItem");
deleteItemInCart.insertAdjacentElement('beforeend', '<p class="deleteItem">Supprimer</p>')
console.log(deleteItemInCart);

deleteItemInCart.addEventListener('click', (e)=> {
e.preventDefault;
localStorage.removeItem("product");


});