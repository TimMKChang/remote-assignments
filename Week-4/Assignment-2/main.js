function ajax(src, callback) {
  // your code here

  axios.get(src)
    .then(response => callback(response.data))
    .catch(error => console.error(error))
}
function render(data) {
  // your code here.
  // document.createElement() and appendChild() methods are preferred.

  const productsHTML = document.querySelector('.products');

  for (product of data) {

    // const productNode = document.createElement('div');

    // const nameNode = document.createElement('h1');
    // nameNode.textContent = product.name;
    // productNode.appendChild(nameNode);

    // const priceNode = document.createElement('h3');
    // priceNode.textContent = `$${product.price}`;
    // productNode.appendChild(priceNode);

    // const descriptionNode = document.createElement('p');
    // descriptionNode.textContent = product.description;
    // productNode.appendChild(descriptionNode);

    // productsHTML.appendChild(productNode);

    // -----------------------------------------

    const productHTML = `
    <div>
      <h1>${product.name}</h1>
      <h3>$${product.price}</h3>
      <p>${product.description}</p>
    </div>
    `;
    productsHTML.innerHTML += productHTML;
  }

}
ajax("https://cwpeng.github.io/live-records-samples/data/products.json", function (response) {
  render(response);
}); // you should get product information in JSON format and render data in the page