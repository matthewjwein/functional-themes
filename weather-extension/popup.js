let zipcodeInput = document.getElementById("zipcode");
let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", () => {
  browser.runtime.sendMessage({zipcode: zipcodeInput.value});
});