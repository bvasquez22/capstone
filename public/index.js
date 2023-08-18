const products = document.querySelector('main');
let cartCount = document.querySelector('#cart-count');
let cartTotal = document.querySelector('#cart-total');

const footer = document.querySelector("footer");
const signUpForm = document.querySelector(".email-sign-up");
const input = document.querySelector("input");
const signUpBtn = document.querySelector("#sign-up");
const allNav = document.querySelector("#all");
const pokemonNav = document.querySelector("#PokemonTCG");
const fleshAndBloodNav = document.querySelector("#Flesh-and-Blood");
const magicNav = document.querySelector("#Magic");
const pokemonProducts = document.querySelectorAll(".pokemon");
const fleshAndBloodProducts = document.querySelectorAll(".flesh-and-blood");
const magicProducts = document.querySelectorAll(".magic-the-gathering");
const cartButtons = document.querySelectorAll(".add-to-cart-btn");

const getCart = () => {
  axios.get('http://localhost:4004/cart')
    .then(res => {
      if (res.data.cartCount == 1) {
        cartCount.textContent = `${res.data.cartCount} item`;
      } else {
        cartCount.textContent = `${res.data.cartCount} items`;
      }

      cartTotal.textContent = `$${Number(res.data.cartTotal).toFixed(2)}`;
    })
}

const addToCart = (e) => {
  e.preventDefault()

  let item = {
    id: e.target.parentNode.id,
    quantity: 1,
    price: e.target.parentNode.children[2].textContent,
  }

  axios.post('http://localhost:4004/products', item)
    .then((res) => {
      alert(res.data)
      getCart()
    })
}

const getProducts = () => {
  axios.get('http://localhost:4004/products')
    .then(res => {
      res.data.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', product.product_category);
        productCard.setAttribute('id', product['product_id']);
        products.appendChild(productCard);

        const productImg = document.createElement('img');
        productImg.classList.add('product-img');
        productImg.src = product.product_img_url;
        productImg.alt = `image of ${product.product_name}`;
        productCard.appendChild(productImg);

        const productName = document.createElement('h2');
        productName.textContent = product.product_name;
        productCard.appendChild(productName);

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.product_price}`;
        productCard.appendChild(productPrice);

        const productBtn = document.createElement('button');
        productBtn.classList.add('add-to-cart-btn');
        productBtn.textContent = 'Add to Cart';
        productBtn.addEventListener("click", addToCart);
        productCard.appendChild(productBtn);
      })
    })
}

getProducts();
getCart();

// cartButtons.forEach(function (btn) {
//   btn.addEventListener("click", addToCart);
// });

// function addToCart() {
//   counter += 1;
//   if (counter === 1) {
//     cartCountText.textContent = counter + " item";
//   } else {
//     cartCountText.textContent = counter + " items";
//   }
// }

// function submitHandler() {
//   if (input.value === "") {
//     return;
//   }
//   var confirmationMsg = document.createElement("p");
//   confirmationMsg.textContent = "Thank you for signing up " + input.value;
//   signUpForm.remove();
//   footer.appendChild(confirmationMsg);
// }

// signUpBtn.addEventListener("click", submitHandler);

// input.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     document.querySelector("#sign-up").click();
//   }
// });

function displayAll() {
  const pokemonProducts = document.querySelectorAll(".pokemon");
  const fleshAndBloodProducts = document.querySelectorAll(".flesh-and-blood");
  const magicProducts = document.querySelectorAll(".magic-the-gathering");
  pokemonProducts.forEach((product) => (product.style.display = "flex"));
  fleshAndBloodProducts.forEach((product) => (product.style.display = "flex"));
  magicProducts.forEach((product) => (product.style.display = "flex"));
}

function displayPokemon() {
  const pokemonProducts = document.querySelectorAll(".pokemon");
  const fleshAndBloodProducts = document.querySelectorAll(".flesh-and-blood");
  const magicProducts = document.querySelectorAll(".magic-the-gathering");
  fleshAndBloodProducts.forEach((product) => (product.style.display = "none"));
  magicProducts.forEach((product) => (product.style.display = "none"));
  pokemonProducts.forEach((product) => (product.style.display = "flex"));
}

function displayFleshAndBlood() {
  const pokemonProducts = document.querySelectorAll(".pokemon");
  const fleshAndBloodProducts = document.querySelectorAll(".flesh-and-blood");
  const magicProducts = document.querySelectorAll(".magic-the-gathering");
  pokemonProducts.forEach((product) => (product.style.display = "none"));
  magicProducts.forEach((product) => (product.style.display = "none"));
  fleshAndBloodProducts.forEach((product) => (product.style.display = "flex"));
}

function displayMagic() {
  const pokemonProducts = document.querySelectorAll(".pokemon");
  const fleshAndBloodProducts = document.querySelectorAll(".flesh-and-blood");
  const magicProducts = document.querySelectorAll(".magic-the-gathering");
  pokemonProducts.forEach((product) => (product.style.display = "none"));
  fleshAndBloodProducts.forEach((product) => (product.style.display = "none"));
  magicProducts.forEach((product) => (product.style.display = "flex"));
}

allNav.addEventListener("click", displayAll);

pokemonNav.addEventListener("click", displayPokemon);

fleshAndBloodNav.addEventListener("click", displayFleshAndBlood);

magicNav.addEventListener("click", displayMagic);