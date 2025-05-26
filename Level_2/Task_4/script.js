// Switch tabs between login and register
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginTab.onclick = () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
  clearMessages();
};

registerTab.onclick = () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
  clearMessages();
};

function clearMessages() {
  document.getElementById('loginMessage').textContent = '';
  document.getElementById('registerMessage').textContent = '';
}

// Save users to localStorage (simple key-value store: username -> password)
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Register new user
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const message = document.getElementById('registerMessage');
  const users = getUsers();

  if (users[username]) {
    message.textContent = 'Username already exists!';
    return;
  }
  if (username.length < 3 || password.length < 4) {
    message.textContent = 'Username must be ≥3 chars, password ≥4 chars.';
    return;
  }

  users[username] = password;
  saveUsers(users);
  message.style.color = '#a8ff60';
  message.textContent = 'Registration successful! You can login now.';
  registerForm.reset();
});

// Login user
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const message = document.getElementById('loginMessage');
  const users = getUsers();

  if (users[username] && users[username] === password) {
    message.style.color = '#a8ff60';
    message.textContent = 'Login successful! Redirecting...';
    localStorage.setItem('loggedInUser', username);
    setTimeout(() => {
      window.location.href = 'secure.html';
    }, 1000);
  } else {
    message.style.color = '#f9d342';
    message.textContent = 'Invalid username or password.';
  }
});
