const tagSlug = "myStory";
const numberOfPosts = 3;

function showError(message) {
  console.error('Error:', message);
}

fetch(`https://rainydays-api.lillkonst.no/wp-json/wp/v2/tags?slug=${tagSlug}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Tag not found');
    }
    return response.json();
  })
  .then((tags) => {
    if (tags.length === 0) {
      throw new Error('Tag not found');
    }
    const tagId = tags[0].id; // Assuming the first tag retrieved is the desired one
    const apiURL = `https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts?_embed&tags=${tagId}&per_page=${numberOfPosts}`;

    return fetch(apiURL); // Fetch posts using the constructed apiURL
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error fetching posts');
    }
    return response.json();
  })
  .then((data) => {
    // Display the fetched posts
    displayPosts(data);
  })
  .catch((error) => {
    showError(error.message);
  });

function displayPosts(posts) {
  try {
    const carousel = document.querySelector(".carousel__track");
    carousel.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
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
    console.error(error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Fetching posts happens asynchronously, so no need to call displayPosts here; it's already called after fetching data
});




/*const tagSlug = "myStory";
const numberOfPosts = 3;

const apiURL = `https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts?_embed&tags=${tagSlug}&per_page=${numberOfPosts}`;

fetch(apiURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    return response.json();
  })
  .then((data) => {
    // Handle the fetched data (data contains the last three posts with the specific tag)
    console.log(data);
    // Process and display the data
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });


  async function displayPosts(numberOfPosts) {
    try {
        const posts = await getPosts(numberOfPosts);
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

document.addEventListener("DOMContentLoaded", () => {
    displayPosts(numberOfPosts);
});*/