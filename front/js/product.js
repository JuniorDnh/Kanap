//Produit sélectionner afficher 
const dataID = new URLSearchParams(location.search).get("_id");

//Fonction pour afficher les elements de l'API 
function productPageId() {
  fetch(`http://localhost:3000/api/products/${dataID}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      function dataProduct() {
        //On selectionne la balise HTML pour intégrer l'image
        const image = document.querySelector(".item__img");
        image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;

        //affichage du prix du produit
        const price = document.getElementById("price");
        price.innerText = `${data.price}`;

        //affichage du nom du produit
        const name = document.getElementById("title");
        name.innerHTML = `<h1>${data.name}</h1>`;

        //affichage de la description du produit
        const description = document.getElementById("description");
        description.innerText = `${data.description}`;

        //affichage des differentes couleurs du produit
        for (index = 0; index < data.colors.length; index++) {
          document.getElementById("colors").innerHTML += `<option value="${data.colors[index]}">${data.colors[index]}</option>`;
        }
      }
      dataProduct();

      // Ajouter élements dans localstorage 
      // Ajouter au panier 
      function buttonAddToCart() {
        document
          .getElementById("addToCart")
          .addEventListener("click", (event) => {
            event.preventDefault();
            let dataQuantity = document.getElementById("quantity");
            const dataColor = document.getElementById("colors");
            // Conditition : la quantité est > 0 et qu'une couleur est selectionné, alors le produit est envoyé au panier
            if (100>=dataQuantity.value && dataQuantity.value > 0 && dataColor.value !== "") {
              const storageArray = {
                id: dataID,
                name: data.name,
                price: data.price,
                color: dataColor.value,
                quantity: dataQuantity.value,
                image: data.imageUrl,
                alt: data.altTxt,
              };
              // Produit envoyé dans le localstorage en format JSON
              let localStorageProducts = JSON.parse(
                localStorage.getItem("localStorageProducts")
              );
              // Condition : LocalStorage vide
              if (localStorageProducts === null) {
                localStorageProducts = [];
              }
              let productAdded = false;

              // Si le produit ajouté est un article déjà dans le panier, seulement 1 article sera ajouté.
              localStorageProducts.forEach((product) => {
                if (product.id === dataID && product.color === dataColor.value) {
                  1>=dataQuantity.value && dataQuantity.value > 0 && dataColor.value !== 
                  product.quantity++
                  productAdded = true;
                  if (dataQuantity.value > 1) {
                    alert ("Merci d'ajouter seulement 1 article à la fois.")
                  }
                }
              });
              
              
              // Si le produit ajouté est un nouvel article 
              if (!productAdded) {
                // ajoute l'élement au tableau et retourne la nouvelle taille du tableau
                localStorageProducts.push(storageArray);
              } // ajoute dans l'emplacement de stockage
              localStorage.setItem(
                "localStorageProducts",
                JSON.stringify(localStorageProducts)
              ); 
            
            } else {
              alert("Attention, le nombre d'article doit être compris entre 1 et 100 maximum."); 
            }
          });
      }
      buttonAddToCart();
    })
    // Si l'API ne répond pas, un message d'erreur apparait 
    .catch((error) => {
      alert("Le serveur ne répond pas pour le moment.")
    });
}
productPageId();
