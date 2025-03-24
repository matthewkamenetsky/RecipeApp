function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('show');
  }
  
  /*// Get the navbar, content, and menu elements
  const navbar = document.querySelector('nav');
  const content = document.querySelector('.content');
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  
  // Function to update padding-top
  function updateContentPadding() {
    const navbarHeight = navbar.offsetHeight;  // Get the height of the navbar
    content.style.paddingTop = `${navbarHeight}px`;  // Set the padding-top of content
  }
  
  // Call the function when the page loads
  updateContentPadding();
  
  // Event listener to toggle the menu
  menuIcon.addEventListener('click', function() {
    navLinks.classList.toggle('show');
    updateContentPadding();  // Update the content padding when the menu is toggled
  });
  updateContentPadding();
  // Update padding-top if the window is resized
  window.addEventListener('resize', updateContentPadding);*/