
const admins = [
    { email: "admin@salon.com", password: "123456" },
    { email: "manager@salon.com", password: "abcdef" }
];

const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();

   
    if (email === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    
    if (!email.includes("@") || 
       (!email.endsWith(".com") && !email.endsWith(".co.za"))) {
        alert("Enter a valid email");
        return;
    }

   
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


const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        window.location.href = "login.html";
    });
}