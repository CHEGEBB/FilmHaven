document.addEventListener("DOMContentLoaded", function () {
  // Toggle Dark Mode
  var darkModeSwitch = document.getElementById('modeSwitch');
  darkModeSwitch.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    updateSlider();
    updateBackgroundColor();
  });

  // Update the slider position based on the dark mode
  function updateSlider() {
    var slider = document.querySelector('.slider');
    if (document.body.classList.contains('dark-mode')) {
      slider.style.transform = 'translateX(100%)';
    } else {
      slider.style.transform = 'translateX(0)';
    }
  }

  // Update the background color based on the dark mode
  function updateBackgroundColor() {
    var body = document.body;
    if (body.classList.contains('dark-mode')) {
      body.style.backgroundColor = '#000'; // Change to your dark mode color
    } else {
      body.style.backgroundColor = 'hsl(225, 25%, 9%)'; // Change to your light mode color
    }
  }

  // Scroll to Top Button
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  scrollToTopBtn.addEventListener("click", function () {
    scrollToTop();
  });

  // Show/Hide Scroll to Top Button
  function toggleScrollToTopButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }

  // Scroll Event Listener
  window.onscroll = function () {
    toggleScrollToTopButton();
  };

  // Scroll to Top Function
  function scrollToTop() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      window.scrollBy(0, -50);
      requestAnimationFrame(scrollToTop);
    }
  }

  // Dropdown Functionality
  var dropdownBtn = document.querySelector('.dropbtn');
  var dropdownContent = document.querySelector('.dropdown-content');

  dropdownBtn.addEventListener('click', function () {
    dropdownContent.classList.toggle('show');
  });

  window.addEventListener('click', function (event) {
    if (!event.target.matches('.dropbtn')) {
      closeDropdowns();
    }
  });

  dropdownContent.addEventListener('click', function (event) {
    var clickedItem = event.target;
    if (clickedItem.classList.contains('dropdown-item')) {
      var itemName = clickedItem.textContent;
      alert('You clicked on: ' + itemName);
      closeDropdowns();
    }
  });

  function closeDropdowns() {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }

  // Subscribe Form Handling
  var subscribeForm = document.getElementById('subscribeForm');

  subscribeForm.addEventListener('submit', function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the email input value
    var emailInput = document.getElementById('emailInput').value;

    // Validate the email address
    if (isValidEmail(emailInput)) {
      alert('Subscription successful! Thank you for subscribing.');
    } else {
      alert('Please enter a valid email address.');
    }
  });

  // Email validation function
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Movie Modal Handling
  var modalContainer = document.getElementById('modalContainer');
  var closeModalBtn = document.getElementById('closeModalBtn');

  closeModalBtn.addEventListener('click', function () {
    modalContainer.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target === modalContainer) {
      modalContainer.style.display = 'none';
    }
  });

  // Event listener for "Download Now" links in movie cards
  document.querySelectorAll('.card-info a').forEach(function (downloadLink) {
    downloadLink.addEventListener('click', function (event) {
      event.preventDefault();

      var title = this.getAttribute('data-title');
      var description = this.getAttribute('data-description');
      var imageUrl = this.getAttribute('data-image');
      var trailerPath = `./trailers/${title}_trailer.mp4`;

      openModal(title, description, imageUrl, trailerPath);
    });
  });

  // Function to open the modal with movie details and trailer
  function openModal(title, description, imageUrl, trailerPath) {
    var modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = '';

    var modalImageContainer = document.createElement('div');
    modalImageContainer.classList.add('modal-image-container');

    var modalImage = document.createElement('img');
    modalImage.src = imageUrl;
    modalImage.alt = title;
    modalImage.classList.add('modal-image');

    var modalDetails = document.createElement('div');
    modalDetails.classList.add('modal-details');

    var titleElement = document.createElement('h3');
    titleElement.innerText = title;

    var descriptionElement = document.createElement('p');
    descriptionElement.innerText = description;

    var trailerIframe = document.createElement('iframe');
    trailerIframe.src = trailerPath;
    trailerIframe.width = '560';
    trailerIframe.height = '315';
    trailerIframe.frameBorder = '0';
    trailerIframe.allowFullscreen = true;

    var downloadButton = document.createElement('a');
    downloadButton.href = '#'; // Replace with the actual download link
    downloadButton.innerText = 'Download Now';
    downloadButton.classList.add('download-button');

    modalDetails.appendChild(titleElement);
    modalDetails.appendChild(descriptionElement);
    modalDetails.appendChild(downloadButton);

    modalImageContainer.appendChild(modalImage);
    modalImageContainer.appendChild(modalDetails);

    modalContent.appendChild(modalImageContainer);
    modalContent.appendChild(trailerIframe);

    modalContainer.style.display = 'flex';
  }

  // Get all download links and movie images
  const downloadLinks = document.querySelectorAll(".download-link");
  const movieImages = document.querySelectorAll(".cards img");

  // Get modal elements
  const trailerModal = document.getElementById("trailerModal");
  const trailerContent = document.getElementById("trailerContent");
  const trailerIframe = document.getElementById("trailerIframe");
  const closeTrailerBtn = document.getElementById("closeTrailerBtn");

  // Function to open trailer modal
  function openTrailerModal(title) {
    const trailerPath = `./trailers/${title}_trailer.mp4`;
    trailerIframe.src = trailerPath;
    trailerModal.style.display = "block";
  }

  // Function to close trailer modal
  function closeTrailerModal() {
    trailerIframe.src = "";
    trailerModal.style.display = "none";
  }

  // Attach click event to download links
  downloadLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const title = this.getAttribute("data-title");
      openTrailerModal(title);
    });
  });

  // Attach click event to movie images
  movieImages.forEach((image) => {
    image.addEventListener("click", function () {
      const title = this.parentElement.querySelector("h3").innerText;
      openTrailerModal(title);
    });
  });

  // Attach click event to close trailer button
  closeTrailerBtn.addEventListener("click", closeTrailerModal);

  // Close modal if clicked outside the content
  window.addEventListener("click", function (event) {
    if (event.target === trailerModal) {
      closeTrailerModal();
    }
  });

  // Close modal if pressed ESC key
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && trailerModal.style.display === "block") {
      closeTrailerModal();
    }
  });
});
