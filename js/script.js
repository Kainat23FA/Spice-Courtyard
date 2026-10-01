console.log("Spice Courtyard JavaScript is connected!");

const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const formMessage = document.getElementById("form-message");


form.addEventListener("submit", function (event) {
    event.preventDefault();


    formMessage.textContent = "Thank you! We have received your request.";
    formMessage.classList.remove("d-none");

    form.reset();
});