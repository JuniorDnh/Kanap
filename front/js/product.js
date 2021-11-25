//Produit sélectionner afficher //
const dataID = new URLSearchParams(location.search).get("_id");

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
        for (i = 0; i < data.colors.length; i++) {
          document.getElementById("colors").innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        }
      }
      dataProduct();

      // Ajouter élements dans localstorage //
      // Ajouter au panier //
      function buttonAddToCart() {
        document
          .getElementById("addToCart")
          .addEventListener("click", (event) => {
            event.preventDefault();
            let dataQuantity = document.getElementById("quantity");
            const dataColor = document.getElementById("colors");
            // Conditition : la quantité est > 0 et qu'une couleur est selectionné, alors le produit est envoyé au panier
            if (dataQuantity.value > 0 && dataColor.value !== "") {
              let = arrayProductsInCart = [];
              const storageArray = {
                id: dataID,
                name: data.name,
                price: data.price,
                color: dataColor.value,
                quantity: dataQuantity.value,
                image: data.imageUrl,
                alt: data.altTxt,
              };
              if (localStorage.getItem("products") == null){

              arrayProductsInCart.push(productAdded);
              localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

            } else {

              // if there is already items in the local storage, then we extract the local storage in the array

              arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

              for (let item of arrayProductsInCart){
                item.quantity = parseInt(item.quantity);
              };

              const productIndex = arrayProductsInCart.findIndex(
                (product) =>
                  product.id === productAdded.id && product.color === productAdded.color
              );

              if (productIndex === -1) { // if an identical item isn't already present, then we add the new item to the array
        
                arrayProductsInCart.push(productAdded);
                localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

              } else { // if an identical item is already present in the local storage, then we increment the quantity of said item
                arrayProductsInCart[productIndex].quantity = arrayProductsInCart[productIndex].quantity + productAdded.quantity;
                localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
                

              };
            };
            }
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
