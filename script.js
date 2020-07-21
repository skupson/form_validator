const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//? Show input error message
function showError(input, message = "Error") {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

//? Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//? Check required fields
function checkRequired(inputs) {
  let password;
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      showError(
        input,
        `${input.id[0].toUpperCase()}${input.id.slice(1)} is required`
      );
      return;
    }
    if (input.id === "email") {
      if (validateEmail(input.value) === false) {
        showError(input, "Given email is not a valid address");
      }
    } else showSuccess(input);
    if (input.id === "password") {
      validatePassword(input, 8);
      password = input.value;
    } else if (input.id === "password2")
      checkConfirmPassword(password, password2);
    else showSuccess(input);
  });
}

//? Validate email
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//? Validate password lenght
function validatePassword(password, min = 6) {
  if (password.value.length < min) {
    showError(password, `Password needs to be at least ${min} characters long`);
  }
}

//? Check confirm password
function checkConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword.value)
    showError(confirmPassword, `Passwords do not match`);
}

//? Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
});
