const allNav = document.querySelector("#all");
const pokemonNav = document.querySelector("#PokemonTCG");
const fleshAndBloodNav = document.querySelector("#Flesh-and-Blood");
const magicNav = document.querySelector("#Magic");
const products = document.querySelector('main');
let cartCount = document.querySelector('#cart-count');
let cartTotal = document.querySelector('#cart-total');
const signUpForm = document.querySelector(".sign-up-form");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector('#email-input')
const signUpBtn = document.querySelector("#sign-up");
let subsciberEmailList = [];

const getProducts = () => {
  axios.get('http://localhost:4004/products')
    .then((res) => {
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

function displayAll() {
  const pokemonProducts = document.querySelectorAll(".pokemon");
  const fleshAndBloodProducts = document.querySelectorAll(".flesh-and-blood");
  const magicProducts = document.querySelectorAll(".magic-the-gathering");
  pokemonProducts.forEach((product) => (product.style.display = "flex"));
  fleshAndBloodProducts.forEach((product) => (product.style.display = "flex"));
  magicProducts.forEach((product) => (product.style.display = "flex"));
}

const displayPokemon = () => {
  const pokemonProducts = document.querySelectorAll(".pokemon");
  const fleshAndBloodProducts = document.querySelectorAll(".flesh-and-blood");
  const magicProducts = document.querySelectorAll(".magic-the-gathering");
  fleshAndBloodProducts.forEach((product) => (product.style.display = "none"));
  magicProducts.forEach((product) => (product.style.display = "none"));
  pokemonProducts.forEach((product) => (product.style.display = "flex"));
}

const displayFleshAndBlood = () => {
  const pokemonProducts = document.querySelectorAll(".pokemon");
  const fleshAndBloodProducts = document.querySelectorAll(".flesh-and-blood");
  const magicProducts = document.querySelectorAll(".magic-the-gathering");
  pokemonProducts.forEach((product) => (product.style.display = "none"));
  magicProducts.forEach((product) => (product.style.display = "none"));
  fleshAndBloodProducts.forEach((product) => (product.style.display = "flex"));
}

const displayMagic = () => {
  const pokemonProducts = document.querySelectorAll(".pokemon");
  const fleshAndBloodProducts = document.querySelectorAll(".flesh-and-blood");
  const magicProducts = document.querySelectorAll(".magic-the-gathering");
  pokemonProducts.forEach((product) => (product.style.display = "none"));
  fleshAndBloodProducts.forEach((product) => (product.style.display = "none"));
  magicProducts.forEach((product) => (product.style.display = "flex"));
}

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

const getSubscribers = async() => {

  const res = await axios.get('http://localhost:4004/subscribers');
    const subsciberEmailList = res.data.map((subscriber) => subscriber.email);
      return subsciberEmailList;
}

const subscribe = async(e) => {
  e.preventDefault()

  const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (nameInput.value == "") {
    alert('You must enter your name')
    return
  }

  if (emailInput.value == "") {
    alert('You must enter your email')
    return
  } else if (!validEmailRegex.test(emailInput.value)) {
    alert('You must enter a valid email')
    return
  }

  const subsciberEmailList = await getSubscribers();

  if (subsciberEmailList.includes(emailInput.value)) {
    alert('This email is already subscribed')
    nameInput.value = ""
    emailInput.value = ""
    return
  }

  let subscriber = {
    name: nameInput.value,
    email: emailInput.value,
  }

  axios.post('http://localhost:4004/subscribers', subscriber)
    .then(() => {
      alert('You are subscribed')
    })
  
  nameInput.value = ""
  emailInput.value = ""
}

getProducts();
getCart();

signUpBtn.addEventListener("click", subscribe);
allNav.addEventListener("click", displayAll);
pokemonNav.addEventListener("click", displayPokemon);
fleshAndBloodNav.addEventListener("click", displayFleshAndBlood);
magicNav.addEventListener("click", displayMagic);