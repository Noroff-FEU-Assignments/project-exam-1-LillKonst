const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";

function showLoadingIndicator() {
    const PostList = document.querySelector(".list-of-posts");
    const loadingParagraph = document.createElement("p");
    loadingParagraph.textContent = "Loading...";
    loadingParagraph.classList.add("loading");
    PostList.appendChild(loadingParagraph);
}

function showError(message) {
    const errorContainer = document.querySelector(".list-of-posts");
    errorContainer.innerHTML = `<p> Error: ${message}</p>`;
}

async function getPosts() {
    showLoadingIndicator();
    try {
        const response = await fetch(`${tinyStoriesAPI}`);

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

async function displayCarousel() {
    try {
        const posts = await getPosts();
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

            const readBtn = document.createElement("button");
            readBtn.textContent = "READ POST";
            readBtn.classList.add("read-btn");
            postSlide.appendChild(readBtn); 

            const postTitle = document.createElement("h2");
            postTitle.classList.add("carousel__title");
            postTitle.innerHTML = `${post.title.rendered}`;
            postSlide.appendChild(postTitle);

            const image = document.createElement("img");
            image.src = post.jetpack_featured_media_url;
            image.classList.add("carousel__img");
            postSlide.appendChild(image);

              
            const altText = await getAltTextForFeaturedImage(post.featured_media);
            image.alt = altText || "No alt text available";
  
    
            if (post.jetpack_featured_media_url) {
                image.src = post.jetpack_featured_media_url;
            } else {
                image.src = "/images/placeholder.jpg"; 
            }

        }
    } catch (error) {
        showError(error.message);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    displayCarousel();
});

const carousel = document.querySelector(".carousel__track");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

function getPostWidth() {
    const post = carousel.querySelector(".carousel__slide");
    const postRect = post.getBoundingClientRect();
    return postRect.width;
}

leftBtn.addEventListener("click", () => {
    carousel.scrollLeft -= getPostWidth();
});

rightBtn.addEventListener("click", () => {
    carousel.scrollLeft += getPostWidth();
});

let isDragging = false;
let startPosition = 0;
let scrollLeft = 0;

carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPosition = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mouseup", () => {
    isDragging = false;
});

carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentPosition = e.pageX - carousel.offsetLeft;
    const distance = currentPosition - startPosition;
    carousel.scrollLeft = scrollLeft - distance;
});

document.addEventListener("DOMContentLoaded", () => {
    displayCarousel(currentPage);
});
