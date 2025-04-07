
// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const galleryContainer = document.getElementById('gallery-container');
  const noResultsElement = document.getElementById('no-results');
  const tabButtons = document.querySelectorAll('.tab-button');
  let currentCategory = 'All';
  
  // Function to create gallery item HTML
  function createGalleryItem(item) {
    return `
      <div class="gallery-item">
        <a href="#" class="card">
          <img src="${item.src}" alt="${item.alt}">
          <div class="card-content">
            <h3 class="card-title">${item.title}</h3>
            <p class="card-description">${item.description}</p>
          </div>
        </a>
      </div>
    `;
  }
  
  // Function to filter gallery by category
  function filterGallery(category) {
    let filteredItems;
    
    if (category === 'All') {
      filteredItems = galleryItems;
    } else {
      filteredItems = galleryItems.filter(item => item.category === category);
    }
    
    // Clear the gallery container
    galleryContainer.innerHTML = '';
    
    // Show no results message if needed
    if (filteredItems.length === 0) {
      noResultsElement.classList.remove('hidden');
    } else {
      noResultsElement.classList.add('hidden');
      
      // Add filtered items to gallery
      filteredItems.forEach(item => {
        galleryContainer.innerHTML += createGalleryItem(item);
      });
    }
  }
  
  // Initialize gallery with all items
  filterGallery('All');
  
  // Add event listeners to tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active class
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter gallery by selected category
      const category = this.getAttribute('data-category');
      currentCategory = category;
      filterGallery(category);
    });
  });
});
