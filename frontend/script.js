window.onload = function () {
  const authSection = document.getElementById("authSection");
  const appSection = document.getElementById("appSection");
  const authForm = document.getElementById("authForm");
  const authTitle = document.getElementById("authTitle");
  const authBtn = document.getElementById("authBtn");
  const togglePrompt = document.getElementById("togglePrompt");
  const toggleLink = document.getElementById("toggleLink");

  let isLogin = true;

  
  if (localStorage.getItem("loggedInUser")) {
    authSection.style.display = "none";
    appSection.style.display = "block";
  }


  toggleLink.addEventListener("click", function (e) {
    e.preventDefault();
    isLogin = !isLogin;
    authTitle.textContent = isLogin ? "Login" : "Register";
    authBtn.textContent = isLogin ? "Login" : "Register";
    togglePrompt.innerHTML = isLogin
      ? `Don't have an account? <a href="#" id="toggleLink">Register here</a>`
      : `Already have an account? <a href="#" id="toggleLink">Login here</a>`;
    toggleLink = document.getElementById("toggleLink"); 
  });

  
  authForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (isLogin) {
      const user = JSON.parse(localStorage.getItem("registeredUser"));
      if (user && user.username === username && user.password === password) {
        localStorage.setItem("loggedInUser", username);
        alert("✅ Logged in successfully!");
        location.reload();
      } else {
        alert("❌ Invalid credentials.");
      }
    } else {
      const newUser = { username, password };
      localStorage.setItem("registeredUser", JSON.stringify(newUser));
      alert("✅ Registered successfully! You can now log in.");
      isLogin = true;
      authTitle.textContent = "Login";
      authBtn.textContent = "Login";
      togglePrompt.innerHTML = `Don't have an account? <a href="#" id="toggleLink">Register here</a>`;
    }
  });
};

function checkStatus() {
  const url = document.getElementById('urlInput').value.trim();
  const result = document.getElementById('result');

  result.className = '';
  result.innerHTML = '';

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    result.textContent = '❌ Please enter a valid URL (must start with http:// or https://)';
    result.classList.add('error');
    return;
  }

  result.innerHTML = '<span class="loading">Checking status...</span>';
  result.classList.add('loading');

  fetch(url, { method: 'HEAD', mode: 'no-cors' })
    .then(() => {
      result.textContent = '✅ Website is UP!';
      result.classList.remove('loading');
      result.classList.add('success');
    })
    .catch(() => {
      result.textContent = '❌ Website might be DOWN or blocked by CORS.';
      result.classList.remove('loading');
      result.classList.add('error');
    });
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}
