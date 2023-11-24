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

async function displayRelatedPosts(postTags) {
  try {
    if (postTags.length > 0) {
      const response = await fetch(`${tinyStoriesAPI}?tags=${postTags[0]}&per_page=3`);
      if (!response.ok) {
        throw new Error("Related posts not found");
      }
      const relatedPosts = await response.json();

      const storiesBox = document.querySelector(".carousel__track");

      relatedPosts.forEach((relatedPost) => {
        const postSlide = document.createElement("article");
        postSlide.classList.add("carousel__slide");

        const postTitle = document.createElement("h2");
        postTitle.classList.add("carousel__title");
        postTitle.innerHTML = `${relatedPost.title.rendered}`;
        postSlide.appendChild(postTitle);

        const image = document.createElement("img");
        image.src = relatedPost.jetpack_featured_media_url;
        image.alt = relatedPost.description;
        image.classList.add("carousel__img");
        postSlide.appendChild(image);

        postSlide.addEventListener("click", () => {
          window.location.href = `?id=${relatedPost.id}&title=${relatedPost.title.rendered}`;
        });

        storiesBox.appendChild(postSlide); // Appending related posts inside stories-box
      });
    }
  } catch (error) {
    showError(error.message);
  }
}


async function fetchPostDetails() {
  const postId = getPostIdFromQuery();
  if (!postId) {
    showError("Blog post is not found");
    return;
  }

  try {
    const response = await fetch(`${tinyStoriesAPI}/${postId}?_embed&raw`);
    if (!response.ok) {
      throw new Error("Blog post is not found");
    }
    const postDetail = await response.json();
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

    const postContent = document.createElement("div");
    postContent.innerHTML = postDetail.content.rendered;
    postContent.classList.add("post__content");

    const textContentContainer = document.createElement("div");
    textContentContainer.classList.add("text-content");

    const firstParagraph = postContent.querySelectorAll("p");
    if (firstParagraph.length > 0) {
      firstParagraph[0].classList.add("post__intro");
    }

    const paragraphs = postContent.querySelectorAll("p");
    paragraphs.forEach((paragraphs) => {
      paragraphs.classList.add("post__paragraphs");
    });

    const firstImage = postContent.querySelector("img");
    if (firstImage) {
      firstImage.classList.add("first-image");
    }

    const groupImages = Array.from(postContent.querySelectorAll("img"));
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("post__image-group");

    groupImages.slice(1).forEach((image) => {
      const clonedImage = image.cloneNode(true);
      clonedImage.classList.add("post__images");
      imageContainer.appendChild(clonedImage);
      image.style.display = "none";
    });

    const lastParagraph = paragraphs[paragraphs.length - 1];
    postContent.insertBefore(imageContainer, lastParagraph);

    blogPostContainer.appendChild(postContent);
    blogPostContainer.appendChild(textContentContainer);
    postContent.insertBefore(lastParagraph, imageContainer.nextSibling);

    // Delegate click events to the blog post container for images
    blogPostContainer.addEventListener('click', (event) => {
        const clickedElement = event.target;
        if (clickedElement.tagName === 'IMG') {
          const imageUrl = clickedElement.getAttribute('src');
          console.log("Image clicked. Image URL:", imageUrl);
          openModal(imageUrl);
        }
      });

      const postTags = postDetail.tags.map((tag) => tag); // Extract tags from the currently displayed post
      await displayRelatedPosts(postTags); // Display related posts
  } catch (error) {
    showError(error.message);
  }
}

// Function to open the modal with the clicked image
function openModal(imageSrc) {
    const modal = document.getElementById('modal');
    const modalImg = document.querySelector('.modal-content');
  
    modal.style.display = 'block';
    modalImg.src = imageSrc;
  
    // Close modal when clicking on the close button
    document.querySelector('.close').addEventListener('click', () => {
      closeModal();
    });
  
    // Close modal when clicking outside the image
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }
  
  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
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

async function displayRelatedPosts(postTags) {
  try {
    if (postTags.length > 0) {
      const response = await fetch(`${tinyStoriesAPI}?tags=${postTags[0]}&per_page=3`);
      if (!response.ok) {
        throw new Error("Related posts not found");
      }
      const relatedPosts = await response.json();

      const relatedPostsContainer = document.createElement("div");
      relatedPostsContainer.classList.add("related-posts");

      const relatedPostsTitle = document.createElement("h3");
      relatedPostsTitle.textContent = "Related Posts:";
      relatedPostsContainer.appendChild(relatedPostsTitle);

      relatedPosts.forEach((relatedPost) => {
        const postLink = document.createElement("a");
        postLink.textContent = relatedPost.title.rendered;
        postLink.href = `?id=${relatedPost.id}&title=${relatedPost.title.rendered}`;
        postLink.classList.add("related-post-link");
        relatedPostsContainer.appendChild(postLink);
      });

      const blogPostContainer = document.getElementById("post-details");
      blogPostContainer.appendChild(relatedPostsContainer);
    }
  } catch (error) {
    showError(error.message);
  }
}

async function fetchPostDetails() {
  const postId = getPostIdFromQuery();
  if (!postId) {
    showError("Blog post is not found");
    return;
  }

  try {
    const response = await fetch(`${tinyStoriesAPI}/${postId}?_embed&raw`);
    if (!response.ok) {
      throw new Error("Blog post is not found");
    }
    const postDetail = await response.json();
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

    const postContent = document.createElement("div");
    postContent.innerHTML = postDetail.content.rendered;
    postContent.classList.add("post__content");

    blogPostContainer.appendChild(postContent);

    const postTags = postDetail.tags.map((tag) => tag); // Extract tags from the currently displayed post
    await displayRelatedPosts(postTags); // Display related posts
  } catch (error) {
    showError(error.message);
  }
}

// Function to open the modal with the clicked image
function openModal(imageSrc) {
  const modal = document.getElementById('modal');
  const modalImg = document.querySelector('.modal-content');

  modal.style.display = 'block';
  modalImg.src = imageSrc;

  // Close modal when clicking on the close button
  document.querySelector('.close').addEventListener('click', () => {
    closeModal();
  });

  // Close modal when clicking outside the image
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {
  fetchPostDetails();
});
*/