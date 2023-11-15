const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";
let page = 1;
const postsPerPage = 9;

function showLoadingIndicator() {
    const PostList = document.querySelector(".list-of-posts");
    PostList.innerHTML = "<li>Loading...</li>";
}

function showError(message) {
    const errorContainer = document.querySelector(".list-of-posts");
    errorContainer.innerHTML = `<p> Error: ${message}</p>`;
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

async function displayListOfPosts() {
    try {
        const posts = await getPosts(page, postsPerPage);
        const listOfPosts = document.querySelector(".list-of-posts");

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];

            const postMiniature = document.createElement("article");
            postMiniature.classList.add("post-miniature", "blog-min");
            postMiniature.addEventListener("click", () => {
                window.location.href = `posts/post.html?id=${post.id}&title=${post.title.rendered}`;
            });

            const postTitle = document.createElement("h2");
            postTitle.classList.add("title-min");
            postTitle.innerHTML = `${post.title.rendered}`;
            postMiniature.appendChild(postTitle);

            const image = document.createElement("img");
            image.src = post.jetpack_featured_media_url;
            image.alt = post.description;
            image.classList.add("blog__img-min", "carousel__img");
            postMiniature.appendChild(image);

            listOfPosts.insertAdjacentHTML('beforeend', postMiniature.outerHTML);
        }
    } catch (error) {
        showError(error.message);
    }
}


 /*
async function displayListOfPosts() {
    try {
        const posts = await getPosts(page, postsPerPage);
        const listOfPosts = document.querySelector(".list-of-posts");

        for (let i = 0; i < posts.length; i++) {
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
            image.alt = post.description;
            image.classList.add("blog__img-min", "carousel__img");
            postMiniature.appendChild(image);
        }
    } catch (error) {
        showError(error.message);
    }
} */

const moreButton = document.getElementById("more-button");

moreButton.addEventListener("click", () => {
    page++;
    displayListOfPosts();
});

document.addEventListener("DOMContentLoaded", () => {
    displayListOfPosts();
});



/*

const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";

function showLoadingIndicator() {
    const PostList = document.querySelector(".list-of-posts");
    PostList.innerHTML = "<li>Loading...</li>";
}

function showError(message){
    const errorContainer = document.querySelector(".list-of-posts");
    errorContainer.innerHTML = `<p> Error: ${message}</p>`;
}

async function getPosts(page = 1, postsPerPage = 9) {
    showLoadingIndicator();
    try {
        const response = await fetch(tinyStoriesAPI);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const results = await response.json();
        return results;
    } catch (error) {
        throw error;
    }
}

getPosts()
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.error(error);
    });

    

async function displayListOfPosts() {
    try {
    const posts = await getPosts();
    const listOfPosts = document.querySelector(".list-of-posts");
    listOfPosts.innerHTML = "";
    
    for(i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postMiniature = document.createElement("article");
            postMiniature.classList.add("post-miniature", "blog-min");
            postMiniature.addEventListener("click", () => {
            window.location.href = `posts/post.html?id=${post.id}&title=${post.title.rendered}`;
            });
            listOfPosts.appendChild(postMiniature);

            const postTitle = document.createElement("h2");
            postTitle.classList.add("title-min", );
            postTitle.innerHTML = `${post.title.rendered}`;
            postMiniature.appendChild(postTitle);

            const image = document.createElement("img");
            image.src = post.jetpack_featured_media_url;
            image.alt = post.description;
            image.classList.add("blog__img-min", "carousel__img");
            postMiniature.appendChild(image);

        }   
} catch (error) {
    showError(error.message);

}}

document.addEventListener("DOMContentLoaded", () => {
    displayListOfPosts();
});

------------------------------------------------------------- */


/*
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



