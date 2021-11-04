//Appel de l'API //
function items() {
  fetch("http://localhost:3000/api/products")
    // Transformation des données en format json //
    .then((response) => response.json())
    .then((data) => {
      addProducts(data);
    })
    // Si l'API ne répond pas, un message d'erreur apparait //
    .catch((error) => {
      const errorMessage = document.createElement("marquee");
      error.textContent = "Le serveur ne répond pas pour le moment.";
    });
}
items();

// Affichage des données de L'API sur la page //
function addProducts(data) {
  //for...of pet de créer une boucle Array qui parcourt un objet itérable //
  for (const product of data) {
    // Insère les noeuds du DOM à une position spécifique //
    const cardProducts = `
          <a href="./product.html?_id=${product._id}">
          <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
             <h3 class="productName">${product.name}</h3>
             <p class="productDescription">${product.description}</p>
          </article>
          </a>
        `;
    document
      .getElementById("items")
      .insertAdjacentHTML("beforeend", cardProducts);
  }
}
