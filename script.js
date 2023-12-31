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

        // Validate the email address (you can add more sophisticated validation)
        if (isValidEmail(emailInput)) {
            // Perform actions like sending data to the server or displaying a success message
            alert('Subscription successful! Thank you for subscribing.');
        } else {
            // Display an error message for invalid email
            alert('Please enter a valid email address.');
        }
    });

    // Email validation function (you can enhance this based on your requirements)
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
