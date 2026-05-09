
// Two separate arrays keep staff/admin accounts apart from
//
// ROLES:
//   "owner"    → full admin dashboard  (admindashboard.html)
//   "manager"  → full admin dashboard  (admindashboard.html)
//   "customer" → customer dashboard    (customerdashboard.html)

const STAFF_USERS = [
  {
    id: "staff_001",
    role: "owner",
    name: "Phumuzile Moyo",
    email: "pinkmeup01@gmail.com",
    password: "pink01AdminUp"
  },
  {
    id: "staff_002",
    role: "manager",
    name: "Admin User",
    email: "admin@salon.com",
    password: "123456"
  },
  {
    id: "staff_003",
    role: "manager",
    name: "Manager User",
    email: "manager@salon.com",
    password: "abcdef"
  }
];

let CUSTOMERS = [
  {
    id: "cust_001",
    role: "customer",
    name: "Sarah Mokoena",
    email: "sarah@example.com",
    password: "sarah123"
  },
  {
    id: "cust_002",
    role: "customer",
    name: "Lerato Dlamini",
    email: "lerato@example.com",
    password: "lerato123"
  }
];
const ROLE_REDIRECT = {
  owner:    "admindashboard.html",
  manager:  "admindashboard.html",
  customer: "customerdashboard.html"
};

const loginForm = document.querySelector("form");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email    = document.querySelector('input[type="email"]').value.trim().toLowerCase();
    const password = document.querySelector('input[type="password"]').value.trim();

  
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    if (!email.includes("@")) {
      alert("Enter a valid email address.");
      return;
    }

    
    const staffMatch = STAFF_USERS.find(
      u => u.email.toLowerCase() === email && u.password === password
    );
    if (staffMatch) {
      sessionStorage.setItem("currentUser", JSON.stringify({
        id:    staffMatch.id,
        role:  staffMatch.role,
        name:  staffMatch.name,
        email: staffMatch.email
      }));
      window.location.href = ROLE_REDIRECT[staffMatch.role];
      return;
    }


    const customerMatch = CUSTOMERS.find(
      u => u.email.toLowerCase() === email && u.password === password
    );
    if (customerMatch) {
      sessionStorage.setItem("currentUser", JSON.stringify({
        id:    customerMatch.id,
        role:  customerMatch.role,
        name:  customerMatch.name,
        email: customerMatch.email
      }));
      window.location.href = ROLE_REDIRECT["customer"];
      return;
    }

    
    alert("Invalid email or password. Please try again.");
  });
}


const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}

function guardRoute(...allowedRoles) {
  const raw = sessionStorage.getItem("currentUser");
  if (!raw) {
    window.location.href = "login.html";
    return;
  }
  const user = JSON.parse(raw);
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    alert("Access denied. You do not have permission to view this page.");
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
}

function registerCustomer({ name, email, password }) {
  
  const staffEmailTaken = STAFF_USERS.some(
    u => u.email.toLowerCase() === email.toLowerCase()
  );
  if (staffEmailTaken) {
    return { ok: false, error: "This email is already in use. Please use a different email." };
  }

  
  const alreadyRegistered = CUSTOMERS.some(
    u => u.email.toLowerCase() === email.toLowerCase()
  );
  if (alreadyRegistered) {
    return { ok: false, error: "An account with this email already exists. Please log in." };
  }

  const newCustomer = {
    id:       "cust_" + Date.now(),
    role:     "customer",
    name:     name,
    email:    email.toLowerCase(),
    password: password
  };
  CUSTOMERS.push(newCustomer);

  
  sessionStorage.setItem("currentUser", JSON.stringify({
    id:    newCustomer.id,
    role:  newCustomer.role,
    name:  newCustomer.name,
    email: newCustomer.email
  }));

  return { ok: true, user: newCustomer };
}