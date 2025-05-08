document.addEventListener("DOMContentLoaded", function () {
  // Mở modal RSVP
  document.getElementById("rsvpBtn").addEventListener("click", function () {
    document.getElementById("rsvpModal").style.display = "block";
  });

  // Mở modal gift
  document.getElementById("giftBtn").addEventListener("click", function () {
    document.getElementById("giftModal").style.display = "block";
  });

  // Đóng modal khi bấm nút X
  document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      this.closest(".modal").style.display = "none";
    });
  });

  // Đóng modal khi bấm ra ngoài
  window.addEventListener("click", function (e) {
    document.querySelectorAll(".modal").forEach(modal => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  // Gửi form xác nhận RSVP
  document.querySelector(".rsvp-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const guests = document.getElementById("guests").value;
    const event = document.getElementById("event").value;

    if (!name) {
      alert("Vui lòng nhập họ tên.");
      return;
    }

    const data = {
      name,
      phone,
      guests,
      event
    };

    fetch("https://script.google.com/macros/s/AKfycbyotQWk6lYng_1Nj6eMedxeUO5xDIIFj2O0OI1wmheAHJtlo41Dt0QEH17263TBCxI7/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === "success") {
          alert("Cảm ơn bạn đã xác nhận tham dự!");
          document.querySelector(".rsvp-form").reset();
          document.getElementById("rsvpModal").style.display = "none";
        } else {
          alert("Gửi không thành công. Vui lòng thử lại sau.");
        }
      })
      .catch(error => {
        console.error("Lỗi:", error);
        alert("Đã xảy ra lỗi khi gửi xác nhận.");
      });
  });
});
