const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";
const postsPerPage = 3;
let currentPage = 1; // Initial page
const maxPages = 3; // Maximum pages in the carousel

function showLoadingIndicator() {
    // Function to display loading indicator
}

function showError(message) {
    // Function to display error message
}

async function getPosts(page, postsPerPage) {
    showLoadingIndicator();
    try {
        const response = await fetch(`${tinyStoriesAPI}?page=${page}&per_page=${postsPerPage}`);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const results = await response.json();
        return results;
    } catch (error) {
        throw error;
    }
}

async function getAltTextForFeaturedImage(imageId) {
    try {
        const response = await fetch(`https://rainydays-api.lillkonst.no/wp-json/wp/v2/media/${imageId}`);

        if (!response.ok) {
            throw new Error("Failed to fetch image details");
        }

        const imageData = await response.json();
        return imageData.alt_text;
    } catch (error) {
        console.error("Error fetching image details:", error);
        return null;
    }
}

async function displayCarousel(page) {
    try {
        const posts = await getPosts(page, postsPerPage);
        const carousel = document.querySelector(".carousel__track");
        carousel.innerHTML = "";
    
    for(i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postSlide = document.createElement("article");
            postSlide.classList.add("carousel__slide");
            postSlide.addEventListener("click", () => {
            window.location.href = `posts/post.html?id=${post.id}&title=${post.title.rendered}`;
            });
            carousel.appendChild(postSlide);

            const postTitle = document.createElement("h2");
            postTitle.classList.add("carousel__title");
            postTitle.innerHTML = `${post.title.rendered}`;
            postSlide.appendChild(postTitle);

            const image = document.createElement("img");
            image.src = post.jetpack_featured_media_url;
            image.classList.add("carousel__img");
            postSlide.appendChild(image);

              // Fetch and set alt text for the image
              const altText = await getAltTextForFeaturedImage(post.featured_media);
              image.alt = altText || "No alt text available"; // Set default alt text if none found
  
              // Set image source
              if (post.jetpack_featured_media_url) {
                  image.src = post.jetpack_featured_media_url;
              } else {
                  image.src = "placeholder.jpg"; // Replace with your placeholder image
              }

        }
        updateButtonVisibility();
    } catch (error) {
        showError(error.message);
    }
}

// Initial display of carousel on page load
document.addEventListener("DOMContentLoaded", () => {
    displayCarousel(currentPage);
});

// Next button event listener
const nextButton = document.getElementById("next-button"); // Replace 'next-button' with your button's ID

nextButton.addEventListener("click", () => {
    if (currentPage < maxPages) {
        currentPage++;
        displayCarousel(currentPage);
        updateButtonVisibility();
    }
});

// Previous button event listener
const previousButton = document.getElementById("prev-button"); // Replace 'previous-button' with your button's ID

previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayCarousel(currentPage);
        updateButtonVisibility();
    }
});

function updateButtonVisibility() {
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    // Hide prev button on page 1
    if (currentPage === 1) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "block";
    }

    // Hide next button on page maxPages
    if (currentPage === maxPages) {
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayCarousel(currentPage);
    updateButtonVisibility(); // Update button visibility initially
});


/*const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";
const postsPerPage = 3;
let currentPage = 1; // Initial page

function showLoadingIndicator() {
    // Function to display loading indicator
}

function showError(message) {
    // Function to display error message
}

async function getPosts(page, postsPerPage) {
    showLoadingIndicator();
    try {
        const response = await fetch(`${tinyStoriesAPI}?page=${page}&per_page=${postsPerPage}`);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const results = await response.json();
        return results;
    } catch (error) {
        throw error;
    }
}

async function displayCarousel(page) {
    try {
        const posts = await getPosts(page, postsPerPage);
        const carousel = document.querySelector(".carousel__track");
        carousel.innerHTML = "";
    
    for(i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postSlide = document.createElement("article");
            postSlide.classList.add("carousel__slide");
            postSlide.addEventListener("click", () => {
            window.location.href = `posts/post.html?id=${post.id}&title=${post.title.rendered}`;
            });
            carousel.appendChild(postSlide);

            const postTitle = document.createElement("h2");
            postTitle.classList.add("carousel__title");
            postTitle.innerHTML = `${post.title.rendered}`;
            postSlide.appendChild(postTitle);

            const image = document.createElement("img");
            image.src = post.jetpack_featured_media_url;
            image.alt = post.description;
            image.classList.add("carousel__img");
            postSlide.appendChild(image);

        }
    } catch (error) {
        showError(error.message);
    }
}

// Initial display of carousel on page load
document.addEventListener("DOMContentLoaded", () => {
    displayCarousel(currentPage);
});

// Next button event listener
const nextButton = document.getElementById("next-button"); // Replace 'next-button' with your button's ID

nextButton.addEventListener("click", () => {
    currentPage++;
    displayCarousel(currentPage);
});

// Previous button event listener
const previousButton = document.getElementById("prev-button"); // Replace 'previous-button' with your button's ID

previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayCarousel(currentPage);
    }
});



/*const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";
const postsPerPage = 9;

function showLoadingIndicator() {
    const PostList = document.querySelector(".list-of-posts");
    PostList.innerHTML = "<p>Loading...</p>";
}

function showError(message) {
    const errorContainer = document.querySelector(".list-of-posts");
    errorContainer.innerHTML = `<p> Error: ${message}</p>`;
}

async function getPosts(postsPerPage) {
    showLoadingIndicator();
    try {
        const response = await fetch(`${tinyStoriesAPI}?per_page=${postsPerPage}`);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const results = await response.json();
        return results;
    } catch (error) {
        throw error;
    }
}

async function displayCarousel() {
    try {
    const posts = await getPosts(postsPerPage);
    const carousel = document.querySelector(".carousel__track");
    carousel.innerHTML = "";
    
    for(i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postSlide = document.createElement("article");
            postSlide.classList.add("carousel__slide");
            postSlide.addEventListener("click", () => {
            window.location.href = `posts/post.html?id=${post.id}&title=${post.title.rendered}`;
            });
            carousel.appendChild(postSlide);

            const postTitle = document.createElement("h2");
            postTitle.classList.add("carousel__title");
            postTitle.innerHTML = `${post.title.rendered}`;
            postSlide.appendChild(postTitle);

            const image = document.createElement("img");
            image.src = post.jetpack_featured_media_url;
            image.alt = post.description;
            image.classList.add("carousel__img");
            postSlide.appendChild(image);

        }   
} catch (error) {
    showError(error.message);

}}

document.addEventListener("DOMContentLoaded", () => {
    displayCarousel();
});

*/