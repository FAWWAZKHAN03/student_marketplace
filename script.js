function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}

function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const city = document.getElementById("city").value;
  const password = document.getElementById("password").value;

  const isStudent = email.endsWith(".edu") || email.endsWith(".ac.in");

  const user = { name, email, city, password, isStudent };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Registered Successfully!");
  window.location.href = "dashboard.html";
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email === email && user.password === password) {
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

function loadDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return window.location.href = "index.html";

  document.getElementById("username").innerText = user.name;
  document.getElementById("badge").innerText =
    user.isStudent ? "🎓 Verified Student" : "Regular User";
}

function showSection(section) {
  ["overview", "post", "browse"].forEach(id =>
    document.getElementById(id).style.display = "none"
  );
  document.getElementById(section).style.display = "block";
}

function postItem() {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const user = JSON.parse(localStorage.getItem("user"));

  const items = JSON.parse(localStorage.getItem("items")) || [];

  items.push({ title, price, category, city: user.city });
  localStorage.setItem("items", JSON.stringify(items));

  alert("Item Posted!");
}

function filterItems() {
  const filterCity = document.getElementById("filterCity").value;
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const container = document.getElementById("items");
  container.innerHTML = "";

  items
    .filter(item => item.city.includes(filterCity))
    .forEach(item => {
      container.innerHTML += `
        <div class="card">
          <h3>${item.title}</h3>
          <p>₹${item.price}</p>
          <p>${item.category}</p>
          <p>${item.city}</p>
        </div>
      `;
    });
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
