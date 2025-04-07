document.addEventListener('DOMContentLoaded', function () {
  // Single Image Mood Board Display
  const moodBoardContainer = document.querySelector('.mood-board-single');
  if (moodBoardContainer) {
    const currentImage = document.querySelector('.mood-board-current-image');

    if (currentImage) {
      // Set the image source and alt text
      currentImage.src = "/images/pic01.jpg";
      currentImage.alt = "Mood Board Image";

      // Add click event for lightbox
      currentImage.addEventListener('click', function () {
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = document.querySelector('.lightbox-image');

        if (lightbox && lightboxImg) {
          lightboxImg.src = "/images/pic01.jpg";
          lightbox.classList.add('active');
        } else {
          console.error("Lightbox elements are missing from the DOM.");
        }
      });
    } else {
      console.error("No element with class 'mood-board-current-image' found.");
    }
  }

  // Dynamic Mood Board Collage
  const moodBoardCollage = document.querySelector('.mood-board-collage');
  if (moodBoardCollage) {
    moodboardImages.forEach(imagePath => {
      const imgElement = document.createElement('img');
      imgElement.src = imagePath;
      imgElement.alt = "Mood Board Collage Image";
      imgElement.classList.add('w-full', 'h-auto', 'rounded-lg', 'shadow-md');
      moodBoardCollage.appendChild(imgElement);
    });
  } else {
    console.error("No element with class 'mood-board-collage' found.");
  }
});
