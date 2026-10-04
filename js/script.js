console.log("Spice Courtyard JavaScript is connected!");

const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const formMessage = document.getElementById("form-message");
const checkoutButton = document.getElementById("checkout-btn");
const checkoutSection = document.getElementById("checkout-section");
const checkoutForm = document.getElementById("checkout-form");
const orderConfirmation = document.getElementById("order-confirmation");

const navLinks = document.querySelectorAll(".nav-link");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.textContent = "Thank you! We have received your request.";
    formMessage.classList.remove("d-none");

    form.reset();
});


// ==============================
// Navbar Click Highlight
// ==============================

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (navLink) {
            navLink.classList.remove("active");
        });

        link.classList.add("active");

    });

});



// ==============================
// Active Navigation Link
// ==============================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});



// ==============================
// Shopping Cart
// ==============================

const orderButtons = document.querySelectorAll("[data-dish]");
const packageButtons = document.querySelectorAll("[data-package]");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const clearCartButton = document.getElementById("clear-cart");

let cart = [];


// ==============================
// Add Menu Item to Cart
// ==============================

orderButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const itemName = button.getAttribute("data-dish");
        const itemPrice = Number(button.getAttribute("data-price"));

        addToCart(itemName, itemPrice);

        updateCart();

    });

});


// ==============================
// Add Package to Cart
// ==============================

packageButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const itemName = button.getAttribute("data-package");
        const itemPrice = Number(button.getAttribute("data-price"));

        addToCart(itemName, itemPrice);

        updateCart();

    });

});


// ==============================
// Add Item to Cart
// ==============================

function addToCart(itemName, itemPrice) {

    const existingItem = cart.find(function (item) {
        return item.name === itemName;
    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });

    }

}


function updateCart() {

    cartItems.innerHTML = "";

    // Show empty cart message
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="text-center py-4">
                <h5> Your cart is currently empty.</h5>
                <p>
                    Add something delicious from our menu!
                </p>
            </div>
        `;

        cartTotal.textContent = "Rs. 0";
        cartCount.textContent = "(0)";

        return;
    }


    let total = 0;
    let totalQuantity = 0;


    cart.forEach(function (item, index) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        totalQuantity += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "card mb-3";


        cartItem.innerHTML = `
            <div class="card-body">

                <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">

                    <div>
                        <h5 class="mb-1">${item.name}</h5>

                        <p class="mb-0">
                            Rs. ${item.price} × ${item.quantity}
                        </p>
                    </div>


                    <div class="d-flex align-items-center gap-2">

                        <button 
                            class="btn btn-outline-secondary btn-sm decrease-btn"
                            data-index="${index}">
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button 
                            class="btn btn-outline-secondary btn-sm increase-btn"
                            data-index="${index}">
                            +
                        </button>


                        <strong class="ms-3">
                            Rs. ${itemTotal}
                        </strong>


                        <button 
                            class="btn btn-outline-danger btn-sm remove-btn"
                            data-index="${index}">
                            Remove
                        </button>

                    </div>

                </div>

            </div>
        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent = "Rs. " + total;

    cartCount.textContent = "(" + totalQuantity + ")";

}

// ==============================
// Clear Cart
// ==============================

clearCartButton.addEventListener("click", function () {

    cart = [];

    updateCart();

});


// ==============================
// Proceed to Checkout
// ==============================

checkoutButton.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add an item first.");

        return;
    }

    checkoutSection.classList.remove("d-none");

    checkoutSection.scrollIntoView({
        behavior: "smooth"
    });

});


// ==============================
// Phone Number Validation
// ==============================

const checkoutPhone = document.getElementById("checkout-phone");

checkoutPhone.addEventListener("input", function () {

    checkoutPhone.value = checkoutPhone.value.replace(/\D/g, "");

});

// ==============================
// Place Order
// ==============================

checkoutForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const customerName = document.getElementById("checkout-name").value;
    const customerPhone = checkoutPhone.value;

    // Check phone number length
    if (customerPhone.length !== 11) {

        alert("Phone number must be exactly 11 digits.");

        checkoutPhone.focus();

        return;
    }

    // Place order
    orderConfirmation.classList.remove("d-none");

    orderConfirmation.querySelector("p").textContent =
        "Thank you, " + customerName + "! Your order has been received successfully.";

    checkoutForm.reset();

    cart = [];

    updateCart();

    orderConfirmation.scrollIntoView({
        behavior: "smooth"
    });

});