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