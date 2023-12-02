const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";
const postsPerPage = 10;
let currentPage = 1;

function showLoadingIndicator() {
    const PostList = document.querySelector(".list-of-posts");
    PostList.innerHTML = "<p>Loading...</p>";
}

function showError(message){
    const errorContainer = document.querySelector(".list-of-posts");
    errorContainer.innerHTML = `<p> Error: ${message}</p>`;
}

async function getPosts(page) {
    try {
        const response = await fetch(`${tinyStoriesAPI}?per_page=${postsPerPage}&page=${page}`);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const results = await response.json(); console.log(results);
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

async function displayListOfPosts(posts) {
    try {
        const listOfPosts = document.querySelector(".list-of-posts");
        
        for(let i = 0; i < posts.length; i++) {
            const post = posts[i];
    
            const postMiniature = document.createElement("article");
            postMiniature.classList.add("post-miniature", "blog-min");
            postMiniature.addEventListener("click", () => {
                window.location.href = `posts/post.html?id=${post.id}&title=${post.title.rendered}`;
            });
            listOfPosts.appendChild(postMiniature);
    
            const readBtn = document.createElement("button");
            readBtn.textContent = "READ";
            readBtn.classList.add("read-btn");
            postMiniature.appendChild(readBtn); 
            
            const postTitle = document.createElement("h2");
            postTitle.classList.add("title-min");
            postTitle.innerHTML = `${post.title.rendered}`;
            postMiniature.appendChild(postTitle);
    
            const image = document.createElement("img");
            image.src = post.jetpack_featured_media_url;
            image.alt = post;
            image.classList.add("blog__img-min", "carousel__img");
            postMiniature.appendChild(image);

             const altText = await getAltTextForFeaturedImage(post.featured_media);
             image.alt = altText || "No alt text available";
 
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

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const initialPosts = await getPosts(currentPage);
        displayListOfPosts(initialPosts);
    } catch (error) {
        console.error(error);
    }
});

const loadMoreButton = document.getElementById('more-button');

loadMoreButton.addEventListener('click', async () => {
    try {
        currentPage++; 
        const moreData = await getPosts(currentPage);
        displayListOfPosts(moreData);
    } catch (error) {
        console.error(error);
    }
});
