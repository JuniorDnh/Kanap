const app = document.getElementById("items");

var request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/products/", true);
request.onload = function () {
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach((products) => {
      console.log(products);

      const productURL = document.createElement("a");
      productURL.href = "product.html?" + products._id;
      app.appendChild(productURL);

      const article = document.createElement("article");
      article.setAttribute("class", "items");
      productURL.appendChild(article);

      const imageUrl = document.createElement("img");
      imageUrl.src = products.imageUrl;
      article.appendChild(imageUrl);

      const name = document.createElement("h3");
      name.textContent = products.name;
      article.appendChild(name);

      const description = document.createElement("p");
      description.textContent = products.description;
      article.appendChild(description);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};

request.send();
