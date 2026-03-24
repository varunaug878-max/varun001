(function () {
  const user = requireAuth();
  if (!user) return;

  const form = document.getElementById('budgetForm');
  const input = document.getElementById('monthlyBudget');
  const msg = document.getElementById('budgetMsg');

  if (!form) return;

  input.value = getBudgetByUser(user.email) || '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = Number(input.value);
    if (amount < 0 || Number.isNaN(amount)) {
      msg.textContent = 'Please enter a valid budget.';
      return;
    }

    setBudgetByUser(user.email, amount);
    msg.textContent = 'Budget saved successfully.';
  });
})();
