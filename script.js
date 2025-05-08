// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBqiAvYD_7f1BfVOhq1m7KIb_U_hYP7NzA",
  authDomain: "vutringocanh.firebaseapp.com",
  databaseURL: "https://vutringocanh-default-rtdb.firebaseio.com",
  projectId: "vutringocanh",
  storageBucket: "vutringocanh.firebasestorage.app",
  messagingSenderId: "905602873917",
  appId: "1:905602873917:web:9f381692f54d1b4d444854",
  measurementId: "G-C53P6LVDXM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const giftModal = document.getElementById('giftModal');
    const rsvpModal = document.getElementById('rsvpModal');
    const giftBtn = document.getElementById('giftBtn');
    const rsvpBtn = document.getElementById('rsvpBtn');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    // Open Gift Modal
    giftBtn.addEventListener('click', function() {
        giftModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Open RSVP Modal
    rsvpBtn.addEventListener('click', function() {
        rsvpModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close Modals
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            giftModal.style.display = 'none';
            rsvpModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close when clicking outside modal content
    window.addEventListener('click', function(event) {
        if (event.target === giftModal) {
            giftModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === rsvpModal) {
            rsvpModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form Submissions
    const wishForm = document.querySelector('.wish-form');
    if (wishForm) {
        wishForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = this.querySelector('textarea').value.trim();
            
            if (message) {
                // Save to Firebase
                const newWishRef = database.ref('wishes').push();
                newWishRef.set({
                    message: message,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }).then(() => {
                    alert('Cảm ơn bạn đã gửi lời chúc mừng!');
                    giftModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    wishForm.reset();
                }).catch((error) => {
                    console.error('Error saving wish:', error);
                    alert('Có lỗi xảy ra khi gửi lời chúc. Vui lòng thử lại.');
                });
            } else {
                alert('Vui lòng nhập lời chúc của bạn');
            }
        });
    }
    
    const rsvpForm = document.querySelector('.rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('#name').value.trim();
            const phone = this.querySelector('#phone').value.trim();
            const guests = this.querySelector('#guests').value;
            const event = this.querySelector('#event').value;
            
            if (name) {
                // Save to Firebase
                const newRsvpRef = database.ref('rsvps').push();
                newRsvpRef.set({
                    name: name,
                    phone: phone,
                    guests: guests,
                    event: event,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }).then(() => {
                    alert('Cảm ơn bạn đã xác nhận tham dự! Chúng tôi rất mong được đón tiếp bạn.');
                    rsvpModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    rsvpForm.reset();
                }).catch((error) => {
                    console.error('Error saving RSVP:', error);
                    alert('Có lỗi xảy ra khi gửi xác nhận. Vui lòng thử lại.');
                });
            } else {
                alert('Vui lòng nhập tên của bạn');
            }
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.event-section, .couple-names, .map-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.event-section, .couple-names, .map-container').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Countdown timer
    const weddingDate = new Date('2025-05-31T16:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Ngày</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Giờ</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Phút</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${Math.floor(seconds)}</span>
                    <span class="countdown-label">Giây</span>
                </div>
            `;
        }
        
        // If the countdown is finished
        if (distance < 0) {
            clearInterval(countdownTimer);
            if (countdownElement) {
                countdownElement.innerHTML = "Đám cưới đã diễn ra! Cảm ơn mọi người đã đến chung vui!";
            }
        }
    }
    
    // Update the countdown every 1 second
    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
});
// Floating Hearts Animation
function createFloatingHearts() {
  const container = document.querySelector('.floating-hearts');
  
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    
    // Random position
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    
    // Random size
    const size = Math.random() * 15 + 10;
    
    // Random animation duration
    const duration = Math.random() * 15 + 10;
    
    // Random delay
    const delay = Math.random() * 5;
    
    heart.style.left = `${posX}px`;
    heart.style.top = `${posY}px`;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;
    
    container.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
      heart.remove();
    }, (duration + delay) * 1000);
  }
  
  // Create initial hearts
  for (let i = 0; i < 15; i++) {
    createHeart();
  }
  
  // Create new hearts periodically
  setInterval(createHeart, 1000);
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  // ... existing code ...
  
  // Add floating hearts animation
  createFloatingHearts();
  
  // Add keyframe animation for hearts
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});


// Giữ nguyên toàn bộ code xử lý kéo thả như trước
document.addEventListener('DOMContentLoaded', function() {
    const floatingGift = document.getElementById('floatingGift');
    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
    let isDragging = false;

    // Xử lý cảm ứng
    floatingGift.addEventListener('touchstart', function(e) {
        isDragging = true;
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        e.preventDefault();
    });

    floatingGift.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        const touch = e.touches[0];
        
        const deltaX = touch.clientX - mouseX;
        const deltaY = touch.clientY - mouseY;
        
        posX += deltaX;
        posY += deltaY;
        
        floatingGift.style.transform = `translate(${posX}px, ${posY}px)`;
        
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        e.preventDefault();
    });

    floatingGift.addEventListener('touchend', function() {
        isDragging = false;
    });

    // Xử lý chuột (tùy chọn)
    floatingGift.addEventListener('mousedown', function(e) {
        isDragging = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - mouseX;
        const deltaY = e.clientY - mouseY;
        
        posX += deltaX;
        posY += deltaY;
        
        floatingGift.style.transform = `translate(${posX}px, ${posY}px)`;
        
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
});