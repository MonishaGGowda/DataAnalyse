document.addEventListener('DOMContentLoaded', function () {
    // Function to open the popup
    function openPopupFunction() {
        console.log("Inside popup");
        const popupForm = document.getElementById('popupForm');
        console.log(popupForm);
        if (popupForm) {
            popupForm.style.display = 'block';
        } else {
            console.error("Popup form not found in the DOM");
        }
    }

    // Attach the openPopupFunction to the global window object
    window.openPopupFunction = openPopupFunction;

    // Close the popup logic
    const closeBtn = document.getElementById('closeBtn');
    const popupForm = document.getElementById('popupForm');

    if (closeBtn && popupForm) {
        closeBtn.addEventListener('click', function () {
            popupForm.style.display = 'none';
        });
    }

    // Close the popup if the user clicks outside the form container
    window.addEventListener('click', function (event) {
        if (event.target === popupForm) {
            popupForm.style.display = 'none';
        }
    });
});
