document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("booking-modal");
    const closeBtn = document.querySelector(".closeBtn");
    const serviceInput = document.getElementById("selected-service");

    // Add Event Listeners for "Book Now" Buttons

    const bookButtons = document.querySelectorAll(".book-now-btn");
    bookButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const service = e.target.getAttribute("data-service");
            serviceInput.value = service;
            modal.classList.remove("hidden");
            modal.style.display = "flex";
        });
    });

    // Close modal

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if(e.target === modal) {
            modal.style.display = "none";
        }
    });
});

const bookingForm = document.getElementById("booking-form");

bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable button to prevent multiple submits 

    const submitBtn = bookingForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Booking...";

    // Gather form data

        const name = document.getElementById("customer-name").value.trim();
        const email = document.getElementById("customer-email").value.trim();
        const date = document.getElementById("appointment-date").value;
        const time = document.getElementById("appointment-time").value;
        const service = document.getElementById("selected-service").value;

    // Simple Validation

    const today = new Date().toISOString().split("T")[0];
    if (!name || !email || !date || !time || !service) {
        alert("⚠️ Please fill out all fields.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Book Appointment";
        return;
    }

    if (date < today) {
        alert("⚠️ Appointment date cannot be in the past.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Book Appointment";
        return;
    }

    const formData = { name, email, date, time, service };

    try {
        // Send data to fake API

        const response = await fetch("https://script.google.com/macros/s/AKfycbxupA_5I75YRDq5_HJTwjjCu_40PlqsiUsDI7cJLd_rUksPp1j9Cyd1HeVml2IgwyG5/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("✅ Appointment booked successfully!");
            bookingForm.reset();
            document.getElementById("booking-modal").style.display = "none";
        } else {
            alert("❌ Something went wrong. Please try again.");
        } 
    } catch (error) {
        console.error("Error submitting form", error);
        alert("⚠️ Failed to send appointment. Check your internet or try again later.");
    }
});