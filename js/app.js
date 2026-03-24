function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
  }
  return user;
}

function logoutHandler() {
  const btn = document.getElementById('logoutBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });
  }
}

function getPaymentsByUser(email) {
  return JSON.parse(localStorage.getItem(`payments_${email}`) || '[]');
}

function setPaymentsByUser(email, payments) {
  localStorage.setItem(`payments_${email}`, JSON.stringify(payments));
}

function getBudgetByUser(email) {
  return Number(localStorage.getItem(`budget_${email}`) || 0);
}

function setBudgetByUser(email, amount) {
  localStorage.setItem(`budget_${email}`, String(amount));
}

logoutHandler();
