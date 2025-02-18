// Smooth Scrolling
const anchors = document.querySelectorAll('a[href^="#"]');

anchors.forEach(anchor => {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// AOS Animation Initialization
AOS.init({
  duration: 400, // Animation duration in milliseconds
  easing: 'ease-in-out', // Easing function for the animation
  once: true, // Animate elements only once
  offset: 120 // Distance from the top of the viewport before animation starts
});

// Image Popup Functionality (if applicable)
const imageContainers = document.querySelectorAll('.image-container');

imageContainers.forEach(container => {
  container.addEventListener('mouseover', () => {
    const popup = container.querySelector('.popup-content');
    if (popup) { 
      popup.style.display = 'block';
    }
  });

  container.addEventListener('mouseout', () => {
    const popup = container.querySelector('.popup-content');
    if (popup) { 
      popup.style.display = 'none';
    }
  });
});

// Contact Form Submission
const contactForm = document.querySelector('#contact form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(contactForm);

    // Create an object to hold the form data
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Send the form data to the server (using AJAX or Fetch API)
    fetch('/submit-contact-form', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        // Handle success (e.g., display a success message)
        alert('Message sent successfully!');
        contactForm.reset(); // Clear the form fields
      } else {
        // Handle error (e.g., display an error message)
        alert('Error sending message. Please try again later.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
  });
}

// Google Maps Initialization (if applicable)
function initMap() {
  const location = { lat: -1.2833, lng: 36.8167 }; // Replace with your specific coordinates

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15, // Adjust zoom level as needed
    center: location,
  });

  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}

// Initialize Google Maps (if applicable)
if (document.getElementById("map")) { 
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
  document.head.appendChild(script);
}