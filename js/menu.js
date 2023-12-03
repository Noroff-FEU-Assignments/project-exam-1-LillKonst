document.querySelector(".hamburger-icon").addEventListener("click", function() {
    document.querySelector(".menu").classList.toggle("active");
  });

const logo = document.querySelector('.footer__logo');
logo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});