const tinyStoriesAPI = "https://rainydays-api.lillkonst.no/wp-json/wp/v2/posts";

function showError(message) {
  const errorContainer = document.querySelector(".blog-post__container");
  errorContainer.innerHTML = "<p> Error: " + message + "</p>";
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
      const response = await fetch(tinyStoriesAPI + "?tags=" + postTags[0] + "&per_page=4");
      if (!response.ok) {
        throw new Error("Related posts not found");
      }
      const relatedPosts = await response.json();

      const storiesBox = document.querySelector(".stories-box");

      relatedPosts.forEach(async (relatedPost) => {
        const postSlide = document.createElement("article");
        postSlide.classList.add("blog-min");

        const readBtn = document.createElement("button");
        readBtn.textContent = "READ POST";
        readBtn.classList.add("read-btn");
        postSlide.appendChild(readBtn); 

        const postTitle = document.createElement("h2");
        postTitle.classList.add("title-min");
        postTitle.innerHTML = relatedPost.title.rendered;
        postSlide.appendChild(postTitle);

        const image = document.createElement("img");
        image.src = relatedPost.jetpack_featured_media_url;
        image.classList.add("carousel__img");
        postSlide.appendChild(image);

        try {
          const altText = await getAltTextForFeaturedImage(relatedPost.featured_media);
          image.alt = altText || "No alt text available";
        } catch (error) {
          console.error("Error fetching image details:", error);
          image.alt = "No alt text available";
        }

        if (relatedPost.jetpack_featured_media_url) {
          image.src = relatedPost.jetpack_featured_media_url;
        } else {
          image.src = "placeholder.jpg"; // Replace with your placeholder image
        }

        postSlide.addEventListener("click", () => {
          window.location.href = "?id=" + relatedPost.id + "&title=" + relatedPost.title.rendered;
        });

        storiesBox.appendChild(postSlide);
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
    const response = await fetch(tinyStoriesAPI + "/" + postId + "?_embed&raw");
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
    postDate.innerHTML = postDetail.date;
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
      firstImage.removeAttribute("style");
      firstImage.classList.add("first-image");
    }

    const groupImages = Array.from(postContent.querySelectorAll("img"));
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("post__image-group");

    groupImages.slice(1).forEach((image) => {
      const clonedImage = image.cloneNode(true);
      clonedImage.removeAttribute("style");
      clonedImage.classList.add("post__images");
      imageContainer.appendChild(clonedImage);
      image.style.display = "none";

    });

    const lastParagraph = paragraphs[paragraphs.length - 1];
    postContent.insertBefore(imageContainer, lastParagraph);

    blogPostContainer.appendChild(postContent);
    blogPostContainer.appendChild(textContentContainer);
    postContent.insertBefore(lastParagraph, imageContainer.nextSibling);

    blogPostContainer.addEventListener('click', (event) => {
        const clickedElement = event.target;
        if (clickedElement.tagName === 'IMG') {
          const imageUrl = clickedElement.getAttribute('src');
          console.log("Image clicked. Image URL:", imageUrl);
          openModal(imageUrl);
        }
      });

      const postTags = postDetail.tags.map((tag) => tag);
      await displayRelatedPosts(postTags);
  } catch (error) {
    showError(error.message);
  }
}

function openModal(imageSrc) {
    const modal = document.getElementById("modal");
    const modalImg = document.querySelector(".modal-content");
  
    modal.style.display = "block";
    modalImg.src = imageSrc;
  
    document.querySelector(".close").addEventListener("click", () => {
      closeModal();
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }
  
  function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }

document.addEventListener("DOMContentLoaded", () => {
  fetchPostDetails();
});