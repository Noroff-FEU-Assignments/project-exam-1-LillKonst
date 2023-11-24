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
    
            const postTitle = document.createElement("h2");
            postTitle.classList.add("title-min");
            postTitle.innerHTML = `${post.title.rendered}`;
            postMiniature.appendChild(postTitle);
    
            const image = document.createElement("img");
            image.src = post.jetpack_featured_media_url;
            image.alt = post;
            image.classList.add("blog__img-min", "carousel__img");
            postMiniature.appendChild(image);
        }
        } catch (error) {
        showError(error.message);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const initialPosts = await getPosts(currentPage); // Fetch initial content
        displayListOfPosts(initialPosts); // Display the initial content
    } catch (error) {
        console.error(error);
    }
});

const loadMoreButton = document.getElementById('more-button');

loadMoreButton.addEventListener('click', async () => {
    try {
        currentPage++; // Increment page number for the next set of posts
        const moreData = await getPosts(currentPage); // Fetch more content
        displayListOfPosts(moreData); // Append the fetched content to the existing list
    } catch (error) {
        console.error(error);
    }
});
