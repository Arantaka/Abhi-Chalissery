
# ABHILASH - Static Artist Portfolio

This is a static HTML, CSS, and JavaScript version of ABHILASH's artist portfolio website.

## Structure

- `/index.html` - Home page
- `/gallery.html` - Gallery page with category filtering
- `/about.html` - About the artist page
- `/mood-boards.html` - Mood boards page
- `/css/styles.css` - Main stylesheet
- `/js/` - JavaScript files
  - `main.js` - Common functionality
  - `gallery-data.js` - Gallery artwork data
  - `gallery.js` - Gallery filtering logic
  - `mood-board-data.js` - Mood board image data
  - `mood-boards.js` - Mood board layout logic

## Editing Instructions

### Adding New Artwork

1. Add your image files to the `/images/` directory
2. Update the `galleryItems` array in `/js/gallery-data.js` to include your new images with appropriate metadata

### Modifying Styles

Edit the `/css/styles.css` file to change colors, typography, and layout styles.

### Adding a New Page

1. Create a new HTML file based on the existing page structure
2. Link to the page from the navigation in all other pages

## Deployment

To deploy this static site, simply upload all files to your web hosting server while maintaining the directory structure.

