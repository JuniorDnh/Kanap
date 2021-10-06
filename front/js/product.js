// Id de l'url récupérer
const urlId = window.location.search;

//supprimer le "?"
const id = urlId.slice(1);

//Url pour le produit
let productURL = "http://localhost:3000/api/products/" + id;
console.log(productURL);

//formater le prix :
let euro = Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

function item() {
  fetch('productURL',).then((res) => {
      
    console.log(res);
    if (res.ok) {
      res.json().then((data) => {
        let article = document.createElement("article");
        article.setAttribute("class", "item");
        productURL.appendChild(article);

        let img = document.createElement("img");
        imageUrl.src = productURL.imageUrl;
        article.appendChild(imageUrl);

        let name = document.createElement("h1");
        name.textContent = productURL.name;
        

        let price = document.createElement("price");
        //On recupère le prix en le formatant : d'abord en le définissant comme monaie, puis en le divisant par 100 pour afficher le prix en Euro
        price.textContent = euro.format(products.price / 100);
      });
    } else {
      console.log("error");
    }
  });
}
