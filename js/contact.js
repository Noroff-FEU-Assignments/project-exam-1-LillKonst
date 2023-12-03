document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
  
      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const subjectError = document.getElementById("subjectError");
      const messageError = document.getElementById("messageError");
  
  
      nameError.style.display = "none";
      emailError.style.display = "none";
      subjectError.style.display = "none";
      messageError.style.display = "none";
  
      const emailPattern = /\S+@\S+\.\S+/;
  
      let hasError = false;
  
      if (name.length < 5) {
        nameError.textContent = "Name should be more than 5 characters.";
        nameError.style.display = "block";
        hasError = true;
      }
  
      if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block";
        hasError = true;
      }
  
      if (subject.length < 15) {
        subjectError.textContent = "Subject should be more than 15 characters.";
        subjectError.style.display = "block";
        hasError = true;
      }
  
      if (message.length < 25) {
        messageError.textContent = "Message should be more than 25 characters.";
        messageError.style.display = "block";
        hasError = true;
      }
  
      if (!hasError) {
  
        successModal.style.display = "block";

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";

        window.addEventListener("click", function(event) {
            if (event.target == successModal) {
                successModal.style.display = "none";
            }
        });
    }
});

const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", function() {
    successModal.style.display = "none";
});
});