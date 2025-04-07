
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mobileMenu && !mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
      mobileMenu.classList.add('hidden');
    }
  });
  
  // Add active class to current page in navigation
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && currentPath.endsWith(linkPath)) {
      link.classList.add('active');
    }
  });
  
  // Social icon hover effects
  const socialIcons = document.querySelectorAll('.social-icon');
  
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      const svg = this.querySelector('svg');
      if (svg) {
        svg.classList.add('text-accent');
      }
    });
    
    icon.addEventListener('mouseleave', function() {
      const svg = this.querySelector('svg');
      if (svg) {
        svg.classList.remove('text-accent');
      }
    });
  });

  // Add lightbox functionality for gallery images
  setupLightbox();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// Simple animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('animate');
    }
  });
};

// Initialize animations if elements exist
if (document.querySelector('.animate-on-scroll')) {
  window.addEventListener('scroll', animateOnScroll);
  // Initial check
  animateOnScroll();
}

// Setup lightbox functionality
function setupLightbox() {
  // Create lightbox elements if they don't exist
  if (!document.querySelector('.lightbox')) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-image';
    
    const lightboxTitle = document.createElement('div');
    lightboxTitle.className = 'lightbox-title';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    
    // Add navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-prev';
    prevBtn.innerHTML = '&#10094;';
    prevBtn.setAttribute('aria-label', 'Previous image');
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-next';
    nextBtn.innerHTML = '&#10095;';
    nextBtn.setAttribute('aria-label', 'Next image');
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(lightboxTitle);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    document.body.appendChild(lightbox);
    
    // Add custom styles for better image viewing
    const style = document.createElement('style');
    style.textContent = `
      .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 20px;
        box-sizing: border-box;
        overflow-y: auto;
      }
      .lightbox.active {
        display: flex;
      }
      .lightbox-image {
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
        display: block;
        margin: 0 auto;
      }
      .lightbox-title {
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        text-align: center;
        color: white;
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
      }
      .lightbox-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: transparent;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 10;
      }
      .lightbox-close:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      .lightbox-prev, .lightbox-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.3);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        z-index: 10;
        transition: background 0.3s ease;
      }
      .lightbox-prev {
        left: 20px;
      }
      .lightbox-next {
        right: 20px;
      }
      .lightbox-prev:hover, .lightbox-next:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      .lightbox-prev.disabled, .lightbox-next.disabled {
        opacity: 0.3;
        cursor: default;
      }
    `;
    document.head.appendChild(style);
  }
  
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  
  let currentGalleryImages = [];
  let currentImageIndex = -1;
  
  // Close lightbox when clicking close button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    });
  }
  
  // Close lightbox when clicking outside the image
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
      }
    });
  }
  
  // Navigate to previous image
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxImage();
        updateNavigationButtons();
      }
    });
  }
  
  // Navigate to next image
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentImageIndex < currentGalleryImages.length - 1) {
        currentImageIndex++;
        updateLightboxImage();
        updateNavigationButtons();
      }
    });
  }
  
  // Close lightbox with escape key and navigate with arrow keys
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
      } else if (e.key === 'ArrowRight' && currentImageIndex < currentGalleryImages.length - 1) {
        currentImageIndex++;
        updateLightboxImage();
        updateNavigationButtons();
      } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxImage();
        updateNavigationButtons();
      }
    }
  });
  
  // Update lightbox image based on current index
  function updateLightboxImage() {
    const currentImage = currentGalleryImages[currentImageIndex];
    lightboxImg.src = currentImage.src;
    
    // Show image title and description if available
    if (lightboxTitle) {
      const title = getImageTitle(currentImage);
      if (title && title !== '') {
        lightboxTitle.innerHTML = `
          <div>${title}</div>
          <div class="small" style="font-size: 14px; opacity: 0.7; margin-top: 5px;">
            Image ${currentImageIndex + 1} of ${currentGalleryImages.length}
          </div>
        `;
        lightboxTitle.style.display = 'block';
      } else {
        lightboxTitle.style.display = 'none';
      }
    }
  }
  
  // Enable/disable navigation buttons based on current index
  function updateNavigationButtons() {
    if (currentImageIndex <= 0) {
      lightboxPrev.classList.add('disabled');
    } else {
      lightboxPrev.classList.remove('disabled');
    }
    
    if (currentImageIndex >= currentGalleryImages.length - 1) {
      lightboxNext.classList.add('disabled');
    } else {
      lightboxNext.classList.remove('disabled');
    }
  }
  
  // Get image title from various sources
  function getImageTitle(img) {
    return img.getAttribute('data-title') || 
           img.alt || 
           img.closest('.card')?.querySelector('.card-title')?.textContent || 
           img.closest('.gallery-item')?.querySelector('h3')?.textContent;
  }
  
  // Add click event to ALL gallery images, including those loaded dynamically
  function bindGalleryImages() {
    // Select all possible gallery images
    const galleryItems = document.querySelectorAll('.card img, .gallery-item img, .gallery-grid img, .mood-board-thumbnail img, .tabs-content img');
    
    // Update the currentGalleryImages array
    currentGalleryImages = Array.from(galleryItems);
    
    galleryItems.forEach((img, index) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (lightboxImg && lightbox) {
          currentImageIndex = index;
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent scrolling while lightbox is open
          
          // Update navigation buttons state
          updateNavigationButtons();
          
          // If there's a title associated with the image, show it
          if (lightboxTitle) {
            // Try to get title from parent element's data attribute, alt text, or nearest title element
            const title = getImageTitle(img);
            
            if (title && title !== '') {
              lightboxTitle.innerHTML = `
                <div>${title}</div>
                <div class="small" style="font-size: 14px; opacity: 0.7; margin-top: 5px;">
                  Image ${currentImageIndex + 1} of ${currentGalleryImages.length}
                </div>
              `;
              lightboxTitle.style.display = 'block';
            } else {
              lightboxTitle.style.display = 'none';
            }
          }
        }
      });
    });
  }
  
  // Initial binding
  bindGalleryImages();
  
  // Rebind after any tab change in the gallery (for category filtering)
  const tabButtons = document.querySelectorAll('.tab-button, .tabs-trigger');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Short delay to allow DOM to update with new images
      setTimeout(() => {
        bindGalleryImages();
      }, 100);
    });
  });
  
  // Specifically add click event to mood-board-thumbnail elements
  const moodBoardThumbnails = document.querySelectorAll('.mood-board-thumbnail');
  moodBoardThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function(e) {
      const img = this.querySelector('img');
      if (img && lightboxImg && lightbox) {
        currentImageIndex = index;
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Try to get a title for the lightbox
        if (lightboxTitle) {
          const title = img.getAttribute('data-title') || img.alt;
          if (title && title !== '' && !title.includes('inspiration')) {
            lightboxTitle.innerHTML = `
              <div>${title}</div>
              <div class="small" style="font-size: 14px; opacity: 0.7; margin-top: 5px;">
                Image ${currentImageIndex + 1} of ${moodBoardThumbnails.length}
              </div>
            `;
            lightboxTitle.style.display = 'block';
          } else {
            lightboxTitle.style.display = 'none';
          }
        }
      }
    });
  });
}
