document.querySelector(".hamburger-icon").addEventListener("click", function() {
    document.querySelector(".menu").classList.toggle("active");
  });

  // Select the logo element
const logo = document.querySelector('.footer__logo');

// Add click event listener to the logo
logo.addEventListener('click', () => {
    // Scroll the page to the top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});