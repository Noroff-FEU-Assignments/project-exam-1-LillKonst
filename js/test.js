const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";



function showLoadingIndicator() {
    const PostList = document.querySelector(".list-of-posts");
    PostList.innerHTML = "<p>Loading...</p>";
}

function showError(message) {
    const errorContainer = document.querySelector(".list-of-posts");
    errorContainer.innerHTML = `<p> Error: ${message}</p>`;
}

const arrowBtns = document.querySelectorAll(".slider-box i")

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log(btn.id);
    })
})
async function getPosts(page, postsPerPage) {
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
    } catch (error) {
        showError(error.message);
    }
}

// Initial display of carousel on page load
document.addEventListener("DOMContentLoaded", () => {
    displayCarousel();
});

document.addEventListener("DOMContentLoaded", () => {
    displayCarousel(currentPage);
    updateButtonVisibility(); // Update button visibility initially
});