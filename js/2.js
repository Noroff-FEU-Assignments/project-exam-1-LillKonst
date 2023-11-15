const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";

function showError(message){
    const errorContainer = document.querySelector(".carousel");
    errorContainer.innerHTML = `<p> Error: ${message}</p>`;
}

async function getPosts() {
    showLoadingIndicator();
    try {
    const response = await fetch(tinyStoriesAPI); 
    if(!response.ok){
        throw new Error("Something went wrong");
    }
    const results = await response.json();
    return results;
    } catch (error) {
        throw error; 
    }
}

console.log (results);

async function displayPostList() {
    try {
    const posts = await getPosts();
    const carouselTrack = document.querySelector(".carousel__track");
    carouselTrack.innerHTML = "";

    for(i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postSlide = document.createElement("article");
            postSlide.classList.add("carousel__slide");
            postSlide.addEventListener("click", () => {
            window.location.href = `posts/post.html?id=${post.id}&title=${post.title.rendered}`;
            });
            carouselTrack.appendChild(postSlide);

           // const image = document.createElement("img");
           // image.src = post.images[0].src;
           // image.alt = post.description;
           // image.classList.add("");
           // postSlide.appendChild(image);

            const postTitle = document.createElement("h2");
            postTitle.classList.add("");
            postTitle.innerHTML = `${post.title.rendered}`;
            postSlide.appendChild(postTitle);

        }   
} catch (error) {
    showError(error.message);

    

}}

function showLoadingIndicator() {
    const PostList = document.querySelector(".carousel");
    PostList.innerHTML = "<li>Loading...</li>";
}

document.addEventListener("DOMContentLoaded", () => {
    displayPostList();
});