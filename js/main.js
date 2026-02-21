// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
    var menuToggle = document.getElementById("menuToggle");
    var nav = document.getElementById("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("open");
        });

        // Close menu when a link is clicked
        var navLinks = nav.querySelectorAll(".nav-link");
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("open");
            });
        });
    }

    // Contact form handling
    var form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var userName = document.getElementById("name").value.trim();
            var userPhone = document.getElementById("phone").value.trim();

            if (!userName || !userPhone) {
                if (!userName) document.getElementById("name").focus();
                else document.getElementById("phone").focus();
                return;
            }

            // Show a simple confirmation
            var btn = form.querySelector(".btn");
            var originalText = btn.textContent;
            btn.textContent = "Gönderildi ✓";
            btn.disabled = true;

            setTimeout(function () {
                btn.textContent = originalText;
                btn.disabled = false;
                form.reset();
            }, 2000);
        });
    }
});
