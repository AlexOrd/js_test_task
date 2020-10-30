const products = [{
  id: 1,
  name: 'Овсяная каша с фруктами',
  price: 25,
  category: 'dinner',
  img: 'i/im1.jpg'
},
{
  id: 2,
  name: 'Яичница глазунья с овощами на сковородке',
  price: 35,
  category: 'breakfast',
  img: 'i/im2.jpg'
},
{
  id: 3,
  name: 'Яичница глазунья с овощами',
  price: 25,
  category: 'breakfast',
  img: 'i/im2.jpg'
},
{
  id: 4,
  name: 'Яичница глазунья с овощами',
  price: 25,
  category: 'dinner',
  img: 'i/im2.jpg'
}]

const productCategories = [... new Set(products.map(product => product.category))];
const shoppingCard = [];

const productsContainer = document.getElementById('productsContainer');
const numberOfGoods = document.getElementById('numberOfGoods');
const orderSum = document.getElementById('orderSum');

function addToCard(curProduct, curAmount) {
  shoppingCard.push({
    product: curProduct,
    amount: curAmount
  });
  cardInfoRefresh();
}

function cardInfoRefresh() {
  shoppingCard.total = shoppingCard.reduce((acc, current) => {
    return acc + (current.amount * current.product.price);
  }, 0)
  numberOfGoods.innerText = shoppingCard.length;
  orderSum.innerText = shoppingCard.total;
}

function cardCreator(product) {
  const container = document.createElement('div');
  container.className= 'product-box__item';
  // name
  const h3Title = document.createElement('h3');
  h3Title.className= 'product-box__title';
  h3Title.innerText = product.name;
  container.appendChild(h3Title)
  // img
  const imgContainer = document.createElement('div');
  imgContainer.className= 'product-box__img';
  const img = document.createElement('img');
  img.className= 'img-fluid';
  img.src = product.img;
  imgContainer.appendChild(img);
  container.appendChild(imgContainer);
  // product-box
  const innerContainer = document.createElement('div');
  innerContainer.className= 'product-box__meta';
  const price = document.createElement('p');
  price.innerText = `${product.price} грн.`;
  innerContainer.appendChild(price);
  const inputContainer = document.createElement('div');
  inputContainer.className= 'qty';
  //!!!!
  const input = document.createElement('input');
  input.className= 'qty__item';
  input.type = "number";
  inputContainer.appendChild(input);
  innerContainer.appendChild(inputContainer);
  const button = document.createElement('button');
  button.className = 'product-box__btn';
  button.innerText = 'Добавить';
  button.addEventListener('click', () => {
    addToCard(product, input.value);
  });
  // !!!
  innerContainer.appendChild(button);
  container.appendChild(innerContainer);

  return container;
}

function refreshProducts(filterCategory) {
  productsContainer.innerHTML = '';
  let filteredProducts = products;
  if (filterCategory) {
    filteredProducts = products.filter(product => product.category == filterCategory)
  }
  filteredProducts.forEach((product) => {
    const currentProduct = cardCreator(product);
    productsContainer.appendChild(currentProduct);
  })
}
const selectElement = document.getElementById('productSelect');
selectElement.addEventListener('change', (event) => {
  const category = event.target.value;
  refreshProducts(category);
});

refreshProducts();


