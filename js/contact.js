/**
 * Contact Form Module with EmailJS Integration
 */
function initContact() {
    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');

    if (!contactForm) {
        console.warn("Contact form element not found in the DOM.");
        return;
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value.trim();
        var phoneElement = document.getElementById('phone');
        var phone = phoneElement ? phoneElement.value.trim() : "";

        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        var submitBtn = contactForm.querySelector('button[type="submit"]');
        var originalBtnContent = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

        // Send via FormSubmit
        fetch("https://formsubmit.co/ajax/luminousproductslimited@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
                _subject: "New Website Contact: " + subject
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if(data.success === "true" || data.success === true) {
                showSuccessState();
            } else if (data.message && data.message.includes("Activation")) {
                alert("Almost done! FormSubmit sent an activation email to luminousproductslimited@gmail.com. Please click the 'Activate Form' link in that email.");
                resetButton();
            } else {
                console.error("FormSubmit Error:", data);
                alert("Form Error: " + (data.message || "Failed to send message. Please try again later."));
                resetButton();
            }
        })
        .catch(function(error) {
            console.error('FormSubmit Failed...', error);
            alert("Failed to send message. Please check your connection and try again.");
            resetButton();
        });

        function showSuccessState() {
            contactForm.reset();
            formSuccess.classList.add('show');
            
            setTimeout(function () {
                formSuccess.classList.remove('show');
                resetButton();
            }, 5000);
        }

        function resetButton() {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });
}
window.initContact = initContact;
