(function () {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim().toLowerCase();
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('signupConfirmPassword').value;
      const msg = document.getElementById('signupMessage');

      if (password !== confirmPassword) {
        msg.textContent = 'Passwords do not match.';
        return;
      }

      const users = getUsers();
      if (users.find((u) => u.email === email)) {
        msg.textContent = 'User already exists.';
        return;
      }

      users.push({ name, email, password });
      setUsers(users);
      msg.textContent = 'Account created! Redirecting to login...';
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 900);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;
      const msg = document.getElementById('loginMessage');

      const users = getUsers();
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        msg.textContent = 'Invalid email or password.';
        return;
      }

      localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
      window.location.href = 'dashboard.html';
    });
  }
})();
