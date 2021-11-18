//Produit sélectionner afficher //
const newID = new URLSearchParams(location.search);
const dataID = newID.get("_id");

console.log(dataID);

//Fonction pour afficher les elements de l'API //
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
        let color = document.getElementById("colors");
        for (i = 0; i < data.colors.length; i++) {
          color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        }
      }
      dataProduct();

      // Ajouter élements dans localstorage //
      // Ajouter au panier //
      function buttonAddToCart() {
        const addToCart = document.getElementById("addToCart");
        addToCart.addEventListener("click", (event) => {
          event.preventDefault();
          let dataQuantity = document.getElementById("quantity");
          const dataColor = document.getElementById("colors");
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

          // Si le produit ajouté est un article déjà dans le panier //
          localStorageProducts.forEach((product) => {
            if (product.id === dataID && product.color === dataColor.value) {
              sameProduct = product.quantity++;

              productAdded = true;
            }
          });

          // Si le produit ajouté est un nouvel article //
          if (!productAdded) {
            // ajoute l'élement au tableau et retourne la nouvelle taille du tableau
            localStorageProducts.push(storageArray);
          } // ajoute dans l'emplacement de stockage
          localStorage.setItem(
            "localStorageProducts",
            JSON.stringify(localStorageProducts)
          );
        });
      }
      buttonAddToCart();
    })
    // Si l'API ne répond pas, un message d'erreur apparait //
    .catch((error) => {
      const errorMessage = document.createElement("marquee");
      error.textContent = "Le serveur ne répond pas pour le moment.";
    });
}
productPageId();
