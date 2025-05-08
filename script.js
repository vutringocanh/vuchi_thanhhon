document.addEventListener('DOMContentLoaded', function () {
    // Get modal elements
    const giftModal = document.getElementById('giftModal');
    const rsvpModal = document.getElementById('rsvpModal');
    const giftBtn = document.getElementById('giftBtn');
    const rsvpBtn = document.getElementById('rsvpBtn');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Open Gift Modal
    giftBtn.addEventListener('click', function () {
        giftModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Open RSVP Modal
    rsvpBtn.addEventListener('click', function () {
        rsvpModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close Modals (both gift and rsvp)
    closeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            giftModal.style.display = 'none';
            rsvpModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside content
    window.addEventListener('click', function (event) {
        if (event.target === giftModal || event.target === rsvpModal) {
            giftModal.style.display = 'none';
            rsvpModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle Wish Form Submit
    const wishForm = document.querySelector('.wish-form');
    if (wishForm) {
        wishForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã gửi lời chúc mừng!');
            giftModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            wishForm.reset();
        });
    }

    // Handle RSVP Form Submit and send to Google Sheets
    const rsvpForm = document.querySelector('.rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const guests = document.getElementById('guests').value;
            const event = document.getElementById('event').value;

            if (!name) {
                alert("Vui lòng nhập họ và tên.");
                return;
            }

            const data = {
                name: name,
                phone: phone,
                guests: guests,
                event: event
            };

            const scriptURL = "https://script.google.com/macros/s/AKfycbxszqBmtSB7NU0VFYnbBmZeBAZqwxibXf66mbFOqdeGAoKBjgWdTHVi7_2LHdK3gr9iHg/exec";

            fetch(scriptURL, {
                method: 'POST',
                body: new URLSearchParams(data)
            })
            .then(response => {
                alert("Đã gửi xác nhận thành công!");
                rsvpModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                rsvpForm.reset();
            })
            .catch(error => {
                alert("Đã xảy ra lỗi khi gửi xác nhận. Vui lòng thử lại sau.");
                console.error("Error:", error);
            });
        });
    }
});
