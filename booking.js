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

    // Gather form data

    const formData = {
        name: document.getElementById("customer-name").value,
        email: document.getElementById("customer-email").value,
        date: document.getElementById("appointment-date").value,
        time: document.getElementById("appointment-time").value,
        service: document.getElementById("selected-service").value
    };

    try {
        // Send data to fake API

        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
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