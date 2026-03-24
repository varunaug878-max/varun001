(function () {
  const user = requireAuth();
  if (!user) return;

  const form = document.getElementById('paymentForm');
  const tableBody = document.getElementById('paymentTableBody');

  function getEditId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  if (form) {
    const editId = getEditId();
    let payments = getPaymentsByUser(user.email);

    if (editId) {
      const item = payments.find((p) => p.id === editId);
      if (item) {
        document.getElementById('title').value = item.title;
        document.getElementById('amount').value = item.amount;
        document.getElementById('date').value = item.date;
        document.getElementById('category').value = item.category;
        document.getElementById('status').value = item.status;
        document.getElementById('notes').value = item.notes || '';
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const payload = {
        id: editId || crypto.randomUUID(),
        title: document.getElementById('title').value.trim(),
        amount: Number(document.getElementById('amount').value),
        date: document.getElementById('date').value,
        category: document.getElementById('category').value,
        status: document.getElementById('status').value,
        notes: document.getElementById('notes').value.trim()
      };

      if (editId) {
        payments = payments.map((p) => (p.id === editId ? payload : p));
      } else {
        payments.push(payload);
      }

      setPaymentsByUser(user.email, payments);
      window.location.href = 'payments.html';
    });
  }

  function renderTable() {
    if (!tableBody) return;

    const payments = getPaymentsByUser(user.email);
    const category = document.getElementById('filterCategory')?.value || '';
    const status = document.getElementById('filterStatus')?.value || '';

    let filtered = payments;
    if (category) filtered = filtered.filter((p) => p.category === category);
    if (status) filtered = filtered.filter((p) => p.status === status);

    tableBody.innerHTML = '';

    filtered.forEach((p) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.date}</td>
        <td>${p.title}</td>
        <td>${p.category}</td>
        <td>$${Number(p.amount).toFixed(2)}</td>
        <td>${p.status}</td>
        <td>
          <a href="payment-form.html?id=${p.id}">Edit</a>
          <button data-id="${p.id}" class="delete-btn">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const updated = getPaymentsByUser(user.email).filter((p) => p.id !== id);
        setPaymentsByUser(user.email, updated);
        renderTable();
      });
    });
  }

  document.getElementById('filterCategory')?.addEventListener('change', renderTable);
  document.getElementById('filterStatus')?.addEventListener('change', renderTable);

  renderTable();
})();
