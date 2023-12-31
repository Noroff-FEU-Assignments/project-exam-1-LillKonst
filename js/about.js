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
      const carousel = document.querySelector(".mystory-container");
      carousel.innerHTML = "";
  
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
  
      for (let i = 0; i < posts.length; i++) {
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
  

        (async () => {
          try {
            const altText = await getAltTextForFeaturedImage(post.featured_media);
            image.alt = altText || "No alt text available";
            image.src = post.jetpack_featured_media_url || "/images/placeholder.jpg";
          } catch (error) {
            console.error("Error fetching alt text:", error);
            image.alt = "No alt text available";
            image.src = "/images/placeholder.jpg";
          }
        })();
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  
  const emailForm = document.querySelector(".subscribe-form");
  const confirmationMessage = document.querySelector(".confirmation-message");
  const emailError = document.querySelector(".error-message");
  
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const emailInput = document.getElementById("email");
    const email = emailInput.value;
    const emailPattern = /^\S+@\S+\.\S+$/;
  
    let hasError = false;
  
    if (!emailPattern.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      emailError.style.display = "block";
      hasError = true;
    } else {
      confirmationMessage.textContent = "Super! We'll send you a welcome mail.";
      confirmationMessage.style.display = "block";
      emailError.style.display = "none";
      hasError = false;
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    
  });
  