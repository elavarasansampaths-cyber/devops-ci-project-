/**
 * Project: Automated Website Testing Using CI/CD with GitHub Actions
 * Description: Client-side logic for navigation, interactive pipeline visualizer,
 *              and validated contact form.
 * Author: Alex Johnson (DevOps & Web Developer Student)
 */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* ==========================================================================
       1. Mobile Navigation Toggle
       ========================================================================== */
    var navToggle = document.getElementById("navToggle");
    var siteNav = document.getElementById("siteNav");
    var navLinks = document.querySelectorAll(".nav-link");

    if (navToggle && siteNav) {
        navToggle.addEventListener("click", function () {
            var isOpen = siteNav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        // Close mobile navigation when a nav link is clicked
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                if (siteNav.classList.contains("open")) {
                    siteNav.classList.remove("open");
                    navToggle.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    /* ==========================================================================
       2. Active Navigation Highlight on Scroll
       ========================================================================== */
    var sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(function (section) {
            var sectionHeight = section.offsetHeight;
            var sectionTop = section.offsetTop - 120;
            var sectionId = section.getAttribute("id");
            var matchingLink = document.querySelector('.site-nav a[href="#' + sectionId + '"]');

            if (matchingLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(function (lnk) { lnk.classList.remove("active"); });
                    matchingLink.classList.add("active");
                }
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);

    /* ==========================================================================
       3. Interactive DevOps CI/CD Pipeline Visualizer
       ========================================================================== */
    var pipelineStepsData = {
        "1": {
            badge: "Step 1 of 6",
            title: "Developer: Local Code Editing",
            desc: "The developer writes and refines website source code (HTML, CSS, JS) on their local workstation using VS Code or any text editor. Changes remain local until committed to Git.",
            command: "# Edit source files locally\ncode index.html style.css script.js\n# Verify changes in your local web browser\nstart index.html  # on Windows"
        },
        "2": {
            badge: "Step 2 of 6",
            title: "Git: Staging & Version Commit",
            desc: "The developer records a clear snapshot of changes with an informative commit message, tracking the project history locally before publishing.",
            command: "# Review unstaged changes\ngit status\n# Stage all changes\ngit add .\n# Create a version commit\ngit commit -m \"feat: add responsive layout and navigation\""
        },
        "3": {
            badge: "Step 3 of 6",
            title: "GitHub: Remote Repository Push",
            desc: "The local Git commit is pushed to the remote GitHub repository on the main branch (or submitted via Pull Request for code review).",
            command: "# Push the committed code to the GitHub remote repository\ngit push origin main\n# GitHub receives the webhook payload immediately"
        },
        "4": {
            badge: "Step 4 of 6",
            title: "GitHub Actions: Event Trigger & Runner Allocation",
            desc: "GitHub detects the push or PR event and triggers the workflow defined in .github/workflows/ci.yml. An ephemeral, clean Ubuntu virtual environment is provisioned instantly.",
            command: "# Event Detected: push to refs/heads/main\n# Runner: ubuntu-latest\n# Permissions: contents: read\n# Workflow: Automated Website Testing CI"
        },
        "5": {
            badge: "Step 5 of 6",
            title: "Automated Checks: Real Quality Gate Execution",
            desc: "The CI runner executes the automated validation suite sequentially: checks core files exist, verifies stylesheet/script references, runs HTML linting via htmlhint, and checks JS syntax.",
            command: "# 1. Verify files exist (index.html, style.css, script.js, README.md)\n# 2. Check HTML references: href=\"style.css\" and src=\"script.js\"\n# 3. Validate HTML structure using maintained htmlhint\nnpx htmlhint index.html\n# 4. Validate JavaScript syntax\nnode --check script.js"
        },
        "6": {
            badge: "Step 6 of 6",
            title: "Status Feedback: Instant PASS or FAIL Notification",
            desc: "If any single check fails, the workflow immediately stops and alerts the developer with a red indicator and exact line numbers. If all checks pass, a green checkmark confirms code integrity.",
            command: "# Result: Status Code 0 (ALL CHECKS PASSED)\n# GitHub UI Badge: Green \u2714\n# Step summary generated for developers\n# Safe to proceed with confidence!"
        }
    };

    var stepButtons = document.querySelectorAll(".pipeline-step");
    var stepBadge = document.getElementById("stepDetailBadge");
    var stepTitle = document.getElementById("stepDetailTitle");
    var stepDesc = document.getElementById("stepDetailDesc");
    var stepCommand = document.getElementById("stepDetailCommand");

    if (stepButtons.length > 0 && stepBadge && stepTitle && stepDesc && stepCommand) {
        stepButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var stepNum = button.getAttribute("data-step");
                var data = pipelineStepsData[stepNum];

                if (data) {
                    // Update active state on buttons
                    stepButtons.forEach(function (btn) { btn.classList.remove("active"); });
                    button.classList.add("active");

                    // Update detail card content
                    stepBadge.textContent = data.badge;
                    stepTitle.textContent = data.title;
                    stepDesc.textContent = data.desc;
                    stepCommand.innerHTML = "<code>" + escapeHtml(data.command) + "</code>";
                }
            });
        });
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* ==========================================================================
       4. Contact Form Validation & User Feedback
       ========================================================================== */
    var contactForm = document.getElementById("contactForm");
    var formToast = document.getElementById("formToast");

    if (contactForm && formToast) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var nameInput = document.getElementById("userName");
            var emailInput = document.getElementById("userEmail");
            var subjectInput = document.getElementById("userSubject");
            var messageInput = document.getElementById("userMessage");

            var nameError = document.getElementById("nameError");
            var emailError = document.getElementById("emailError");
            var subjectError = document.getElementById("subjectError");
            var messageError = document.getElementById("messageError");

            // Reset previous error messages
            clearError(nameInput, nameError);
            clearError(emailInput, emailError);
            clearError(subjectInput, subjectError);
            clearError(messageInput, messageError);
            hideToast();

            var isValid = true;

            // Validate Name
            if (!nameInput.value.trim()) {
                setError(nameInput, nameError, "Please enter your name.");
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                setError(nameInput, nameError, "Name must be at least 2 characters.");
                isValid = false;
            }

            // Validate Email
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                setError(emailInput, emailError, "Please enter your email address.");
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                setError(emailInput, emailError, "Please enter a valid email address (e.g. name@example.com).");
                isValid = false;
            }

            // Validate Subject
            if (!subjectInput.value.trim()) {
                setError(subjectInput, subjectError, "Please provide a subject.");
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                setError(messageInput, messageError, "Please write your message.");
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                setError(messageInput, messageError, "Message must be at least 10 characters long.");
                isValid = false;
            }

            if (isValid) {
                // Simulated submission for assignment demo
                showToast("success", "\u2714 Thank you! Your message has been received. (Simulated submission for college demo)");
                contactForm.reset();
            } else {
                showToast("error", "\u2716 Please correct the highlighted errors above and try again.");
            }
        });
    }

    function setError(inputElem, errorElem, message) {
        if (inputElem) {
            inputElem.classList.add("is-invalid");
        }
        if (errorElem) {
            errorElem.textContent = message;
        }
    }

    function clearError(inputElem, errorElem) {
        if (inputElem) {
            inputElem.classList.remove("is-invalid");
        }
        if (errorElem) {
            errorElem.textContent = "";
        }
    }

    function showToast(type, message) {
        formToast.className = "form-toast " + type;
        formToast.textContent = message;
    }

    function hideToast() {
        formToast.className = "form-toast";
        formToast.textContent = "";
    }
});
