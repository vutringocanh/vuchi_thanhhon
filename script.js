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
            alert('Cảm ơn bạn đã gửi lời chúc mừng!');
            giftModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            wishForm.reset();
        });
    }
    
    // Google Apps Script URL (replace with your deployed web app URL)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwhoiIPcd69iaK-JB9ZfiFb4YkooxCQA2TnS3VKfmyQsiKn3Sh-EyzMrwuHQQJDphoj/exec';
    
    // RSVP Form Submission
    const rsvpForm = document.querySelector('.rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading indicator or disable submit button
            const submitButton = rsvpForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Đang gửi...';
            
            // Get form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const guests = document.getElementById('guests').value;
            const event = document.getElementById('event').value;
            
            // Prepare data for submission
            const formData = {
                name: name,
                phone: phone,
                guests: guests,
                event: event
            };
            
            // Send data to Google Apps Script
            fetch(scriptURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                mode: 'cors'
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    alert('Cảm ơn bạn đã xác nhận tham dự! Chúng tôi rất mong được đón tiếp bạn.');
                    rsvpModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    rsvpForm.reset();
                } else {
                    alert('Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.');
                    console.error('Error:', data.message);
                }
            })
            .catch(error => {
                alert('Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.');
                console.error('Error:', error);
            })
            .finally(() => {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
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
});