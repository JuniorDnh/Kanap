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


//création d'une constante pour afficher les elements de l'API
const promise01 = fetch(productURL);
promise01
  .then((response) => {
    console.log(response);

    const productData = response.json();
    console.log(productData);

    productData.then((product) => {
      console.log(product);

      //affichage de l'image du produit
      const imageUrl = document.createElement("img");
      imageUrl.src = product.imageUrl;
      affichageImg.appendChild(imageUrl);


      const altTxt = document.createElement("alt");
      altTxt.textContent = product.altTxt;
      imageUrl.appendChild(altTxt);

      //affichage du nom du produit
      const title = product.name;
      affichageTitle.innerHTML = title;

      //affichage du prix du produit
      const price = product.price;
      affichagePrice.innerHTML = price;

      //affichage de la description du produit
      const description = product.description;
      affichageDescription.innerHTML = description;

      //affichage des differentes couleurs du produit
      for (i in product.colors) {
        affichageOption.options[affichageOption.options.length] = new Option(
          product.colors[i],
        );
      }
    });
  })

  .catch((err) => {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `It's not working!`;
  });


  //Ajouter au panier
  //Ajouter elements dans localstorage

  const buttonAddTaCart = document.querySelector('#addToCart')
  buttonAddTaCart.addEventListener('click', function () {

    if (quantity.value > 0 && affichageOption.value !== "") {

      let arrayInCart = [];
  
      let productAdded = {
        id: id,
        quantity: parseInt(quantity.value),
        color: affichageOption.value,
  
      }
      
      
        // Si le localstorage est vide on y crée un tableau
  
      if (localStorage.getItem("products") == null){
  
        arrayInCart.push(productAdded);
        localStorage.setItem("products", JSON.stringify(arrayInCart));
  
      } else {
  
        // S'il y a déjà des éléments dans le localstorage, on ajoute le locale storage dans le tableau
  
        arrayInCart = JSON.parse(localStorage.getItem("products"));
  
        for (let item of arrayInCart){
          item.quantity = parseInt(item.quantity);
        };
  
        const productIndex = arrayInCart.findIndex(
          (product) =>
            product.id === productAdded.id && product.color === productAdded.color
        );
  
        if (productIndex === -1) { //Si un élément identique n'est pas déjà présent, alors nous ajoutons le nouvel élément au tableau.
   
          arrayInCart.push(productAdded);
          localStorage.setItem("products", JSON.stringify(arrayInCart));
  
        } else { //Si un article identique est déjà présent dans le stockage local, alors nous incrémentons la quantité de cet article.
          arrayInCart[productIndex].quantity = arrayInCart[productIndex].quantity + productAdded.quantity;
          localStorage.setItem("products", JSON.stringify(arrayInCart));
  
  
        } 
        
      };
      
      
      console.log(arrayInCart);
          console.log(localStorage);
  
    }
  
    
  
  })
  
  
  



  
