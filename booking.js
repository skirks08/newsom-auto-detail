document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("booking-modal");
    const closeBtn = document.querySelector(".close-btn");
    const serviceInput = document.getElementById("selected-service");
    const bookingForm = document.getElementById("booking-form");

    if (!modal || !closeBtn || !serviceInput || !bookingForm) {
        console.error("Booking modal or form element not found.");
        return;
    }

    // Add Event Listeners for "Book Now" Buttons
    const bookButtons = document.querySelectorAll(".book-now-btn");
    bookButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const service = e.target.getAttribute("data-service");
            serviceInput.value = service;
            modal.style.display = "flex";
        });
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission
    bookingForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = bookingForm.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.textContent = "Booking...";

        const name = document.getElementById("customer-name").value.trim();
        const email = document.getElementById("customer-email").value.trim();
        const date = document.getElementById("appointment-date").value;
        const time = document.getElementById("appointment-time").value;
        const service = document.getElementById("selected-service").value;

        const today = new Date().toISOString().split("T")[0];
        if (!name || !email || !date || !time || !service) {
            alert("⚠️ Please fill out all fields.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Confirm Booking";
            return;
        }

        if (date < today) {
            alert("⚠️ Appointment date cannot be in the past.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Confirm Booking";
            return;
        }

        const formData = { name, email, date, time, service };
        console.log("Sending formData:", formData);

        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbxcBq8aj3NyMQfF5MPRQoX7dtpk3xBNJ4zZBJop9IBtFcFmMgDlvBxyvsedtXC8BeTi/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                body: new URLSearchParams(formData).toString(),
            });

            const result = await response.json();
            console.log("Booking API result:", result);

            if (result.result === "success") {
                alert("✅ Appointment booked successfully!");
                bookingForm.reset();
                modal.style.display = "none";
            } else {
                alert("❌ Something went wrong. Please try again.");
                console.error(result.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error submitting form", error);
            alert("⚠️ Failed to send appointment. Check your internet or try again later.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Confirm Booking";
        }
    });
});

