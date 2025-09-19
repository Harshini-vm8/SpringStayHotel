async function loadCustomers() {
  const res = await fetch('/api/customers');
  const customers = await res.json();
  const sel = document.getElementById('customerSelect');
  sel.innerHTML = customers.map(c => `<option value="${c.customerId}">${c.name}</option>`).join('');
}

async function loadAvailableRooms() {
  const res = await fetch('/api/rooms');
  const rooms = await res.json();
  const available = rooms.filter(r => r.status === 'AVAILABLE');
  const sel = document.getElementById('roomSelect');
  sel.innerHTML = available.map(r => `<option value="${r.roomId}">${r.roomType} #${r.roomId}</option>`).join('');
}

async function loadBookings() {
  const res = await fetch('/api/bookings');
  const bookings = await res.json();
  const tbody = document.getElementById('bookingsBody');
  tbody.innerHTML = '';
  bookings.forEach(b => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${b.bookingId}</td>
      <td>${b.customer?.name || ''}</td>
      <td>${b.room ? (b.room.roomType + ' #' + b.room.roomId) : ''}</td>
      <td>${b.checkInDate || ''}</td>
      <td>${b.checkOutDate || ''}</td>
      <td>
        <button class="btn btn-danger" onclick="deleteBooking(${b.bookingId})">Cancel</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function createBooking(e) {
  e.preventDefault();
  const body = {
    customer: { customerId: parseInt(document.getElementById('customerSelect').value) },
    room: { roomId: parseInt(document.getElementById('roomSelect').value) },
    checkInDate: document.getElementById('checkInDate').value,
    checkOutDate: document.getElementById('checkOutDate').value
  };
  const resp = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!resp.ok) {
    const text = await resp.text();
    alert('Failed to book: ' + text);
    return;
  }
  e.target.reset();
  await loadAvailableRooms();
  await loadBookings();
}

async function deleteBooking(id) {
  await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
  await loadAvailableRooms();
  await loadBookings();
}

document.getElementById('bookingForm').addEventListener('submit', createBooking);
loadCustomers();
loadAvailableRooms();
loadBookings();
