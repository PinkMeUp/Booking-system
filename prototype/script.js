// ORIGINAL ADMIN CREDENTIALS only for now since were prototyping
const admins = [
    { email: "admin@salon.com", password: "123456" },
    { email: "manager@salon.com", password: "abcdef" }
];

// NEW: Special PinkMeUp admin credentials
const PINK_ADMIN_EMAIL = "pinkmeup01@gmail.com";
const PINK_ADMIN_PASSWORD = "pink01AdminUp";

const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();

    // Validate empty fields
    if (email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    // Basic email format check
    if (!email.includes("@") || 
       (!email.endsWith(".com") && !email.endsWith(".co.za"))) {
        alert("Enter a valid email");
        return;
    }

    // Check for special PinkMeUp admin → redirect to admindashboard.html
    if (email === PINK_ADMIN_EMAIL && password === PINK_ADMIN_PASSWORD) {
        window.location.href = "admindashboard.html";
        return;
    }

    // Original admin check (admin@salon.com or manager@salon.com) → dashboard.html
    const user = admins.find(admin => 
        admin.email.toLowerCase() === email.toLowerCase() &&
        admin.password === password
    );

    if (user) {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password");
    }
});

// Logout functionality (if logout button exists on page)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        window.location.href = "login.html";
    });
}