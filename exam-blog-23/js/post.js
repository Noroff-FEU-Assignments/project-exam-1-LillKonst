const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";

function showError(message) {
    const errorContainer = document.querySelector(".blog-post__container");
    errorContainer.innerHTML = `<p> Error: ${message}</p>`;
}

function getPostIdFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return id;
}

function getPostTitleFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("title");
}

async function fetchPostDetails() {
    const postId = getPostIdFromQuery();
    if (!postId) {
        showError("Blog post is not found");
        return;
    }

    try {
        const response = await fetch(`${tinyStoriesAPI}/${postId}`);
        if (!response.ok) {
            throw new Error("Blog post is not found");
        }
        const postDetail = await response.json();
console.log(postDetail)
        const titleElement = document.getElementById("title");
        const blogPostContainer = document.getElementById("post-details");

        titleElement.textContent = postDetail.title.rendered;

        const postTitle = document.createElement("h2");
        postTitle.textContent = postDetail.title.rendered;
        postTitle.classList.add("post__title");
        blogPostContainer.appendChild(postTitle);

        const postDate = document.createElement("p");
        postDate.textContent = postDetail.date;
        postDate.classList.add("post__date");
        blogPostContainer.appendChild(postDate);

        const image = document.createElement("img");
        image.src = postDetail.jetpack_featured_media_url;
        image.alt = postDetail.description;
        image.classList.add("post__image");
        blogPostContainer.appendChild(image);

        const postText = document.createElement("p");
        postText.textContent=postDetail.content.rendered;
        postText.classList.add("post__text");
        blogPostContainer.appendChild(postText);


    } catch (error) {
        showError(error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchPostDetails();
});


/*const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";

function showError(message) {
    const errorContainer = document.querySelector(".blog-post__container");
    errorContainer.innerHTML = `<p> Error: ${message}</p>`;
}

function getPostIdFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return id;
}

function getPostTitleFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("title");
}

async function fetchPostDetails() {
    const title = getPostTitleFromQuery();
    const postId = getPostIdFromQuery();
    if (!postId) {
        showError("Blog post is not found");
        return;
    }

    try {
        const response = await fetch(`${tinyStoriesAPI}/${postId}`);
        if (!response.ok) {
            throw new Error("Blog post is not found");
        }
        const postDetail = await response.json();

        const title = document.getElementById("title");
        const blogPostContainer = document.getElementById("post-details");

        console.log(postDetail)

        title.textContent = title; 



        const postTitle = document.createElement("title");
            postTitle = postDetail.title.rendered;
            postTitle.classList.add("post__title");
            blogPostContainer.appendChild(postTitle);

            console.log(postTitle)

        const postDate = document.createElement("p")
            postDate = postDetail.date;
            postDate.classlist.add("post__date");
            blogPostContainer.appendChild(postDate);


        const image = document.createElement("img");
            image.src = postDetail.jetpack_featured_media_url;
            image.alt = postDetail.description;
            image.classList.add("post__image");
            blogPostContainer.appendChild(image);

        
    } catch (error) {
        showError(error.message);
    }
}


document.addEventListener("DOMContentLoaded", () => {
fetchPostDetails();
});
 */
