document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission for now
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
  
      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const subjectError = document.getElementById("subjectError");
      const messageError = document.getElementById("messageError");
  
      // Reset error messages
      nameError.style.display = "none";
      emailError.style.display = "none";
      subjectError.style.display = "none";
      messageError.style.display = "none";
  
      const emailPattern = /\S+@\S+\.\S+/;
  
      let hasError = false; // Flag to track if there's any validation error
  
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
        // Show success modal
        successModal.style.display = "block";

        // Clear input fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";

        // Close the modal when clicking outside of it
        window.addEventListener("click", function(event) {
            if (event.target == successModal) {
                successModal.style.display = "none";
            }
        });
    }
});

// Close the modal when clicking on the close button
const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", function() {
    successModal.style.display = "none";
});
});
  

/*document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".form-box");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission for now
  
      // Fetch form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
  
      // Fetch error message containers
      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const subjectError = document.getElementById("subjectError");
      const messageError = document.getElementById("messageError");

      // Fetch other error message containers
  
      // Validate form fields
      if (name.length < 5) {
        nameError.textContent = "Name should be more than 5 characters.";
        nameError.style.display = "block"; // Display the error message
        return; // Exit function to prevent further processing
      }

      const emailPattern = /\S+@\S+\.\S+/;

      if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block"; // Display the error message
        return; // Exit function to prevent further processing
      }

      if (subject.length < 15) {
        subjectError.textContent = "Name should be more than 5 characters.";
        subjectError.style.display = "block"; // Display the error message
        return; // Exit function to prevent further processing
      }

      if (message.length < 25) {
        messageError.textContent = "Name should be more than 5 characters.";
        messageError.style.display = "block"; // Display the error message
        return; // Exit function to prevent further processing
      }

      // Similar validation and error message handling for other fields
  
      // If all validations pass, submit the form or perform further actions
      form.submit();
    });
  });
  

/*document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector(".form-box");
  
    form.addEventListener("submit", function(event) {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
      const nameError = document.getElementById('nameError');
  
      if (name.length < 5) {
        alert("Name should be more than 5 characters.");
        event.preventDefault();
        
      }
  
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
      }
  
      if (subject.length < 15) {
        alert("Subject should be more than 15 characters.");
        event.preventDefault();
      }
  
      if (message.length < 25) {
        alert("Message content should be more than 25 characters.");
        event.preventDefault();
      }
    });
  });
  
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }*/
  