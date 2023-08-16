var products = document.querySelector('main');

var cartCountText = document.querySelector("#cart-count");
var counter = 0;
var footer = document.querySelector("footer");
var signUpForm = document.querySelector(".email-sign-up");
var input = document.querySelector("input");
var signUpBtn = document.querySelector("#sign-up");
var allNav = document.querySelector("#all");
var pokemonNav = document.querySelector("#PokemonTCG");
var fleshAndBloodNav = document.querySelector("#Flesh-and-Blood");
var magicNav = document.querySelector("#Magic");
var pokemonSection = document.querySelector(".pokemon");
var fleshAndBloodSection = document.querySelector(".flesh-and-blood");
var magicSection = document.querySelector(".magic-the-gathering");
var cartButtons = document.querySelectorAll(".add-to-cart-btn");

const getProducts = () => {
  axios.get('http://localhost:4004/products')
    .then(res => {
      res.data.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
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
        productCard.appendChild(productBtn);
      })
    })
}

getProducts();

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

// function displayAll() {
//   pokemonSection.style.display = "block";
//   fleshAndBloodSection.style.display = "block";
//   magicSection.style.display = "block";
// }

// function displayPokemon() {
//   fleshAndBloodSection.style.display = "none";
//   magicSection.style.display = "none";
//   pokemonSection.style.display = "block";
// }

// function displayFleshAndBlood() {
//   pokemonSection.style.display = "none";
//   magicSection.style.display = "none";
//   fleshAndBloodSection.style.display = "block";
// }

// function displayMagic() {
//   pokemonSection.style.display = "none";
//   fleshAndBloodSection.style.display = "none";
//   magicSection.style.display = "block";
// }

// allNav.addEventListener("click", displayAll);

// pokemonNav.addEventListener("click", displayPokemon);

// fleshAndBloodNav.addEventListener("click", displayFleshAndBlood);

// magicNav.addEventListener("click", displayMagic);
