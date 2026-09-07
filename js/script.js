 let products = [

  {
    id: 1,
    name: "Fresh Split Air Conditioner 1.5 HP",
    price: 18000,
    category: "Air Conditioners",
    image:"photos/product1112.jpeg"
  },

  {
    id: 2,
    name: "Samsung No Frost Refrigerator 340L",
    price: 12000,
    category: "Refrigerators",
    image:"photos/product2.jpeg"
  },

  {
    id: 3,
    name: "Kenwood Stand Mixer 1400W 5L",
    price: 8500,
    category: "Kitchen Appliances",
    image:"photos/product4.jpeg"
  },

  {
    id: 4,
    name: "Philips Steam Iron 2400W",
    price: 3500,
    category: "Home Appliances",
    image:"photos/product3.jpeg"
  },

  {
    id: 5,
    name: "Philips Coffee Maker",
    price: 3500,
    category: "Coffee Makers",
    image:"photos/product15.jpeg"
  },

 {
    id: 6,
    name: "Black Microwave Oven 25L",
    price: 7000,
    category: "Microwaves",
    image:"photos/product666.jpeg"
 },

 {
    id: 7,
    name: "Handheld Vacuum Cleaner",
    price: 10000,
    category: "Vacuum Cleaners",
    image:"photos/product77.jpeg"
 },

 {
    id: 8,
    name: "Philips Blender 600W",
    price: 3000,
    category: "Blenders",
    image:"photos/product8.jpeg"
 },

 {
    id: 9,
    name: "Electrolux Vacuum Cleaner",
    price: 6500,
    category: "Vacuum Cleaners",
    image:"photos/product9.jpeg"
 },

 {
    id: 10,
    name: "Philips Air Fryer 4.1L",
    price: 5500,
    category: "Air Fryers",
    image:"photos/product10.jpeg"
 }

 ]

let cart=JSON.parse(localStorage.getItem("cart"))||[]
let favorites =JSON.parse(localStorage.getItem("favorites"))||[]
////// //
// jتعريف
  
 let productsContainer=document.getElementById("products")
let cartContainer= document.getElementById("cart")
let favoritesContainer=document.getElementById("favorites")
 let cartCount = document.querySelector("#cartCount")
 let openCart = document.getElementById("openCart");
let cartPopup = document.getElementById("cartPopup");
let cartPopupItems = document.getElementById("cartPopupItems");
 let favCount = document.querySelector("#favCount")

// /////
  function saveData(){
     localStorage.setItem("cart", JSON.stringify(cart))
        localStorage.setItem("favorites", JSON.stringify(favorites))
}


///عرض ال لاproducts

function renderProducts(productList = products) {

    if (productsContainer == null) {
        return;
    }

    productsContainer.innerHTML = "";

    productList.forEach(function(product) {

        let inCart = cart.find(function(item) {
            return item.id === product.id;
        });

        let inFavorite = favorites.find(function(item) {
            return item.id === product.id;
        });

        let card = `
            <div class="card">

                <img src="${product.image}" alt="${product.name}">
              
                <div class="card-content">

                    <h3>${product.name}</h3>


                    <p class="price">Price:${product.price} EGP</p>
                    <p class="category">Category:${product.category}</p>

                   <div class="card-buttons">

    <button 
    class="cart-btn ${inCart ? "active" : ""}"
    onclick="addToCart(${product.id})">

    ${inCart ? "Remove From Cart" : "Add To Cart"}

</button>

    <button 
        class="fav-btn ${inFavorite ? "active" : ""}"
        onclick="addToFavorites(${product.id})">

        <i class="fa-solid fa-heart"></i>

    </button>

</div>
                </div>

            </div>
        `;

        productsContainer.innerHTML += card;
    });
}
// //////السله

 function addToCart(id) {

    let isLogin = localStorage.getItem("isLogin");

    if (isLogin !== "true") {
        window.location.href = "login.html";
        return;
    }

    let product;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            product = products[i];
        }
    }

    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            found = true;
        }
    }

    if (found == false) {

        cart.push({...product, quantity: 1});

    } else {

        cart = cart.filter(function(item) {
            return item.id !== id;
        });
    }

    saveData();
    renderProducts();
    renderCart();
    updateCounters();
}

// //////hgالمفضله

   function addToFavorites(id) {

    let isLogin = localStorage.getItem("isLogin");

    if (isLogin !== "true") {
        window.location.href = "login.html";
        return;
    }

    let product;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            product = products[i];
        }
    }

    let found = false;

    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id == id) {
            found = true;
        }
    }

    if (found == false) {

        favorites.push(product);

    } else {

        favorites = favorites.filter(function(item) {
            return item.id !== id;
        });
    }

    saveData();
    renderProducts();
    renderFavorites();
    updateCounters();
}
//////////











function searchProducts() {

    let searchValue = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    let result = products.filter(function(product) {

        return product.name.toLowerCase().includes(searchValue) ||
               product.category.toLowerCase().includes(searchValue);

    });

    renderProducts(result);
}
// ////////////
function renderCartPopup() {

    if (!cartPopupItems) {
        return;
    }

    cartPopupItems.innerHTML = "";

    // /tفاضيه
    if (cart.length === 0) {

        cartPopupItems.innerHTML = `
            <div class="my-empty-cart">
                Your cart is empty.
            </div>
        `;

        return;
    }

    cart.forEach(function(product) {

        if (!product.quantity) {
            product.quantity = 1;
        }

        let totalPrice = product.price * product.quantity;

        let card = `
            <div class="my-cart-item">

                <img 
                    src="${product.image}"
                    class="my-cart-image"
                    alt="${product.name}"
                >

                <div class="my-cart-details">

                    <div class="my-cart-name">
                        ${product.name}
                    </div>

                    <div class="my-cart-price">
                        Price: ${totalPrice} EGP
                    </div>

                    <div class="my-cart-quantity">

                        <button 
                            type="button"
                            onclick="decreaseQuantity(event, ${product.id})">
                            -
                        </button>

                        <strong>
                            ${product.quantity}
                        </strong>

                        <button 
                            type="button"
                            onclick="increaseQuantity(event, ${product.id})">
                            +
                        </button>

                    </div>

                </div>

            </div>
        `;

        cartPopupItems.innerHTML += card;
    });
}
if (openCart) {

    openCart.addEventListener("click", function(e) {

        e.stopPropagation();

        renderCartPopup();

        cartPopup.classList.toggle("show");

    });

}

document.addEventListener("click", function(e) {
    if (!cartPopup || !openCart) {
        return;
    }

    if (
        !cartPopup.contains(e.target) &&
        !openCart.contains(e.target)
    ) {
        cartPopup.classList.remove("show");
    }

});


function increaseQuantity(event, id) {

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    let product = cart.find(function(item) {

        return item.id == id;

    });


    if (product) {

        product.quantity = (product.quantity || 1) + 1;

        saveData();

        renderCart();

        renderCartPopup();

        updateCounters();

    }

}

function decreaseQuantity(event, id) {

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    let product = cart.find(function(item) {
        return item.id == id;

    });


    if (product) {
        product.quantity = product.quantity || 1;

        if (product.quantity > 1) {
            product.quantity--;

        } else {

            cart = cart.filter(function(item) {
                return item.id != id;

            });
        }
        saveData();
        renderCart();
        renderCartPopup();
        renderProducts();
        updateCounters();
    }
}

// ////////////////////////////
function renderCart() {
    if (cartContainer == null) {
        return;
    }
    cartContainer.innerHTML = "";
    

    if (cart.length === 0) {

        cartContainer.innerHTML = `<div class="empty-message"> Your cart is empty. </div>  `;
        updateTotalPrice();
        return;
    }


   
    cart.forEach(function(product) {

        if (!product.quantity) {
            product.quantity = 1;
        }

        let card = `

            <div class="cart-item">

                <img 
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="cart-item-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Price: ${product.price} EGP
                    </p>

                    <div class="cart-quantity">

                        <button 
                            type="button"
                            onclick="decreaseQuantity(event, ${product.id})">
                            -
                        </button>

                        <span>
                            ${product.quantity}
                        </span>

                        <button 
                            type="button"
                            onclick="increaseQuantity(event, ${product.id})">
                            +
                        </button>

                    </div>

                </div>


                <button 
                    class="cart-remove"
                    type="button"
                    onclick="removeFromCart(${product.id})">

                    Remove from Cart

                </button>

            </div>

        `;

        cartContainer.innerHTML += card;

    });


    updateTotalPrice();

}
// ///////////////////////////
function updateTotalPrice() {

    let total = 0;

    cart.forEach(function(product) {

        total += product.price * (product.quantity || 1);

    });


    let totalPrice = document.getElementById("totalPrice");

    if (totalPrice) {

        totalPrice.innerHTML = total.toFixed(2);

    }

}

// p السله حذف 

    function removeFromCart(id) {

    cart = cart.filter(function(item) {

        return item.id != id;

    });


    saveData();

    renderProducts();

    renderCart();

    renderCartPopup();

    updateCounters();

}

/////

function renderFavorites() {

    if (favoritesContainer == null) {
        return;
    }

    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {

        favoritesContainer.innerHTML = `
            <div class="empty-message">
                You have no favorite items.
            </div>
        `;

        return;
    }

    favorites.forEach(function(product) {

        let card = `

            <div class="favorite-item">

                <img 
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="favorite-info">

    <h3>
        ${product.name}
    </h3>

    <p class="category">
        Category: ${product.category}
    </p>

    <button 
        class="favorite-heart"
        type="button"
        onclick="removeFromFavorites(${product.id})">

        <i class="fa-solid fa-heart"></i>

    </button>

</div>
            </div>

        `;

        favoritesContainer.innerHTML += card;

    });
}
///حذف  مفضله

      function removeFromFavorites(id) {

    favorites = favorites.filter(function(item) {

        return item.id != id;

    });


    saveData();

    renderProducts();

    renderFavorites();

    updateCounters();

}
// ////////////////////////
      
function updateCounters(){

    if(cartCount){

        let totalQuantity = 0;

        cart.forEach(function(item){

            totalQuantity += item.quantity || 1;

        });

        cartCount.innerHTML = totalQuantity;
    }

    if(favCount){
        favCount.innerHTML = favorites.length;
    }

}

function updateLoginUI() {

    let isLogin = localStorage.getItem("isLogin");
    let firstName = localStorage.getItem("FirstName");

    let loginLink = document.getElementById("loginLink");
    let registerLink = document.getElementById("registerLink");

    let welcomeUser = document.getElementById("welcomeUser");
    let userName = document.getElementById("userName");

    let logoutLink = document.getElementById("logoutLink");

    // السلة
    let cartLink = document.getElementById("cartLink");


    if (isLogin === "true") {

        loginLink.style.display = "none";
        registerLink.style.display = "none";

        welcomeUser.style.display = "block";
        userName.innerHTML = firstName;

        logoutLink.style.display = "block";

       
        cartLink.style.display = "block";

    } else {

        loginLink.style.display = "block";
        registerLink.style.display = "block";

        welcomeUser.style.display = "none";
        logoutLink.style.display = "none";


        cartLink.style.display = "none";
    }
}

function logout() {

    localStorage.removeItem("isLogin");
    localStorage.removeItem("FirstName");

    window.location.href = "login.html";
}



saveData();
updateCounters();
renderProducts();
renderCart();
renderFavorites();
renderCartPopup();
updateLoginUI();



