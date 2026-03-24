(function () {
  const user = requireAuth();
  if (!user) return;

  const payments = getPaymentsByUser(user.email);
  const budget = getBudgetByUser(user.email);

  const totalSpent = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const remaining = budget - totalSpent;

  document.getElementById('totalBudget').textContent = `$${budget.toFixed(2)}`;
  document.getElementById('totalSpent').textContent = `$${totalSpent.toFixed(2)}`;
  document.getElementById('remainingBudget').textContent = `$${remaining.toFixed(2)}`;
  document.getElementById('paymentCount').textContent = payments.length;

  const categoryMap = {};
  payments.forEach((p) => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + Number(p.amount);
  });

  const categoryList = document.getElementById('categoryList');
  categoryList.innerHTML = '';

  Object.keys(categoryMap).forEach((cat) => {
    const li = document.createElement('li');
    li.textContent = `${cat}: $${categoryMap[cat].toFixed(2)}`;
    categoryList.appendChild(li);
  });

  if (!Object.keys(categoryMap).length) {
    categoryList.innerHTML = "<li class='muted'>No payments yet.</li>";
  }
})();
