// récupère les produits dans le LocalStorage //
try {
  function getLocalStorageProducts() {
    try {
      const localStorageProducts = JSON.parse(
        // renvoie la valeur du storage
        localStorage.getItem("localStorageProducts")
      );
      console.log(localStorageProducts);

      // Fonction pour afficher les données ajoutées dans le localstorage
      function localStorageProductsDOM() {
        if (localStorageProducts) {
          for (let index = 0; index < localStorageProducts.length; index++) {
            const productTotalPrice = localStorageProducts[index].price;
            localStorageProducts[index].quantity;
            // Insère les noeuds du DOM à une position spécifique //
            const productCart = `<article class="cart__item" data-id="${localStorageProducts[index].id}" data-color="${localStorageProducts[index].color}">
        <div class="cart__item__img">
        <img src="${localStorageProducts[index].image}" alt="${localStorageProducts[index].alt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
        <h2>${localStorageProducts[index].name}</h2>
        <p >${localStorageProducts[index].color}</p>
        <p>${productTotalPrice}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageProducts[index].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`;
            document
              .getElementById("cart__items")
              .insertAdjacentHTML("beforeend", productCart);
          }

          // Fonction pour modifier la quantité un produit //
          function changeQuantity() {
            const itemQuantity = document.querySelectorAll(".itemQuantity");
            for (let index = 0; index < itemQuantity.length; index++) {
              itemQuantity[index].addEventListener("change", (event) => {
                event.preventDefault();
                // Nouvelle quantité //
                const itemNewQuantity = event.target.value;
                const newLocalStorageProducts = localStorageProducts;
                const newStorageArray = {
                  id: localStorageProducts[index].id,
                  name: localStorageProducts[index].name,
                  price: localStorageProducts[index].price,
                  color: localStorageProducts[index].color,
                  quantity: itemNewQuantity,
                  image: localStorageProducts[index].image,
                  alt: localStorageProducts[index].alt,
                };
                // Créer un nouveau tableau avec la nouvelle quantité //
                newLocalStorageProducts[index] = newStorageArray;
                // Supprimer le localstorage //
                localStorage.clear();
                localStorage.setItem(
                  "localStorageProducts",
                  JSON.stringify(newLocalStorageProducts)
                );
                // Recharger la page cart.html pour mettre à jour la quantité et le prix //
                location.reload();
              });
            }
          }
          changeQuantity();

          // Fonction supprimer un article //
          function deleteArticle() {
            const deleteItem = document.querySelectorAll(".deleteItem");
            for (let index = 0; index < deleteItem.length; index++) {
              // Bouton pour supprimer un produit dans le panier //
              deleteItem[index].addEventListener("click", (event) => {
                event.preventDefault();

                // Ampile les nouveaux produit /
                const newLocalStorageProducts = localStorageProducts;
                newLocalStorageProducts.splice(index, 1);
                localStorage.setItem(
                  "localStorageProducts",
                  JSON.stringify(newLocalStorageProducts)
                );
                // Recharger la page cart.html pour mettre à jour la quantité et le prix //
                location.reload();
              });
            }
          }
          deleteArticle();
          //----------------------------------------------------//

          // Fonction : calculer le prix des articles selectionner //
          function priceCalculation() {
            const priceCalculation = [];
            for (let index = 0; index < localStorageProducts.length; index++) {
              // Additionne le prix selon la quantité selectionnée //
              const prixMontant =
                localStorageProducts[index].price *
                localStorageProducts[index].quantity;
              priceCalculation.push(prixMontant);
              // Additionne la somme des resultats obtenus //
              const reduce = (previousValue, curentValue) =>
                previousValue + curentValue;
              total = priceCalculation.reduce(reduce);
            }
            // Afficher le prix total de l'article
            const totalPrice = document.getElementById("totalPrice");
            totalPrice.textContent = total;
          }
          priceCalculation();

          //Fonction : prix total//
          function totalArticles() {
            let total = 0;
            for (let index in localStorageProducts) {
              // Quantité total des articles //
              const quantity = parseInt(
                localStorageProducts[index].quantity,
                10
              );
              // Calcul le montant total //
              total += quantity;
            }
            return total;
          }
          // Affiche le montant total du panier //
          const totalQuantity = document.getElementById("totalQuantity");
          totalQuantity.textContent = totalArticles();

          //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
          // Formulaire //
          // Construction d'un tableau //
          class Form {
            constructor() {
              this.firstName = document.getElementById("firstName").value;
              this.lastName = document.getElementById("lastName").value;
              this.address = document.getElementById("address").value;
              this.city = document.getElementById("city").value;
              this.email = document.getElementById("email").value;
            }
          }

          // Fonctton : Validation. Teste la validité du formulaire //
          function validation() {
            // Récupère le tableau construit //
            const contact = new Form();
            // Fonction pour le prénom //
            function firstNameIsValid() {
              const firstNameRegExp = contact.firstName;
              const firstNameErrorMsg =
                document.getElementById("firstNameErrorMsg");
              // Teste //
              if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(firstNameRegExp)) {
                firstNameErrorMsg.innerText = "";
                return true;
              } else {
                // Message d'erreur en rouge //
                firstNameErrorMsg.innerText =
                  "L'élément renseigné n'est pas conforme. (3 caractères minimum)";
                firstNameErrorMsg.style.color = "red";
              }
            }
            // Fonction pour le nom de famille //
            function lastNameIsValid() {
              const lastNameRegExp = contact.lastName;
              const lastNameErrorMsg =
                document.getElementById("lastNameErrorMsg");
              // Teste //
              if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(lastNameRegExp)) {
                lastNameErrorMsg.innerText = "";
                return true;
              } else {
                // Message d'erreur en rouge //
                lastNameErrorMsg.innerText =
                  "L'élément renseigné n'est pas conforme. (3 caractères minimum)";
                lastNameErrorMsg.style.color = "red";
              }
            }

            // Fonction pour l'adresse //
            function addressIsValid() {
              const addressRegExp = contact.address;
              const addressErrorMsg =
                document.getElementById("addressErrorMsg");
              // Teste //
              const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g;

              if (!regex.test(addressRegExp)) {
                addressErrorMsg.innerText = "";
                return true;
              } else {
                // Message d'erreur en rouge //
                addressErrorMsg.innerText =
                  "L'élément renseigné n'est pas conforme. (3 caractères minimum)";
                addressErrorMsg.style.color = "red";
              }
            }
            // Fonction pour la ville //
            function cityIsValid() {
              const cityRegExp = contact.city;
              const cityErrorMsg = document.getElementById("cityErrorMsg");
              // Teste //
              if (
                /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(
                  cityRegExp
                )
              ) {
                cityErrorMsg.innerText = "";
                return true;
              } else {
                // Message d'erreur en rouge //
                cityErrorMsg.innerText =
                  "La ville renseignée n'est pas trouvée.";
                cityErrorMsg.style.color = "red";
              }
            }
            // Fonction pour l'email //
            function emailIsValid() {
              const emailRegExp = contact.email;
              const emailErrorMsg = document.getElementById("emailErrorMsg");
              // Teste //
              if (
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                  emailRegExp
                )
              ) {
                emailErrorMsg.innerText = "";
                return true;
              } else {
                // Message d'erreur en rouge //
                emailErrorMsg.innerText =
                  "Merci de renseigner un email valide. (format: Abc@example.com)";
                emailErrorMsg.style.color = "red";
              }
            }
            if (
              // Si le formulaire est correctement rempli alors il est valide //
              firstNameIsValid() &&
              lastNameIsValid() &&
              addressIsValid() &&
              cityIsValid() &&
              emailIsValid()
            ) {
              return true;
            } else {
              // Si le formulaire n'est pas rempli, une alerte apparait //
              alert("Merci de remplir correctement le formulaire.");
              return false;
            }
          }

          //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

          // Bouton valider qui renvoi vers la page confirmation avec le numéro de commande //
          function validOrder() {
            const order = document.getElementById("order");
            order.addEventListener("click", (event) => {
              event.preventDefault();
              if (validation()) {
                // Si la fonction validation est true //
                const products = [];
                for (
                  let index = 0;
                  index < localStorageProducts.length;
                  index++
                ) {
                  products.push(localStorageProducts[index].id);
                }
                // Tableau contenant toutes les données du formulaire rempli + les produits achetés //
                const contactProductsArray = {
                  contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value,
                  },
                  products,
                };
                // Transmettre les données au backend avec la requête POST //
                fetch("http://localhost:3000/api/products/order", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  // Tableau javascript en json //
                  body: JSON.stringify(contactProductsArray),
                })
                  .then((response) => response.json())
                  .then((id) => {
                    // Une fois la commande validée, le localestorage se vide //
                    localStorage.clear();
                    // Une fois la commande validée, direction vers la page confirmation //
                    document.location.href = `confirmation.html?id=${id.orderId}`;
                  })
                  // Si l'API ne répond pas, un message d'erreur apparait //
                  .catch((error) => {
                    const errorMessage = document.createElement("marquee");
                    error.textContent =
                      "Le serveur ne répond pas pour le moment.";
                  });
              }
            });
          }
          validOrder();
        } else {
          // Confirmation de commande //

          function letOrderId() {
            let params = new URL(document.location).searchParams;
            let id = params.get("id");
            //Afficher le numéro de commande //
            document.getElementById("orderId").innerText = id;
          }
          letOrderId();
        }
      }
      localStorageProductsDOM();
    } catch (error) {
      const errorMessage = document.createElement("marquee");
      error.textContent = "Le serveur ne répond pas pour le moment.";
    }
  }
  getLocalStorageProducts();
} catch (error) {
  const errorMessage = document.createElement("marquee");
  error.textContent = "Le serveur ne répond pas pour le moment.";
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------//
