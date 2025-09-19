async function loadCustomers() {
  const res = await fetch('/api/customers');
  const customers = await res.json();
  const tbody = document.getElementById('customersBody');
  tbody.innerHTML = '';
  customers.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.customerId}</td>
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone}</td>
      <td>
        <button class="btn btn-outline" onclick="editCustomer(${c.customerId})">Edit</button>
        <button class="btn btn-danger" onclick="deleteCustomer(${c.customerId})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function createCustomer(e) {
  e.preventDefault();
  const body = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };
  await fetch('/api/customers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  e.target.reset();
  await loadCustomers();
}

async function deleteCustomer(id) {
  await fetch(`/api/customers/${id}`, { method: 'DELETE' });
  await loadCustomers();
}

async function editCustomer(id) {
  const res = await fetch(`/api/customers/${id}`);
  const c = await res.json();
  const name = prompt('Name', c.name);
  if (name === null) return;
  const email = prompt('Email', c.email);
  if (email === null) return;
  const phone = prompt('Phone', c.phone);
  if (phone === null) return;
  await fetch(`/api/customers/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, email, phone })});
  await loadCustomers();
}

document.getElementById('customerForm').addEventListener('submit', createCustomer);
loadCustomers();
