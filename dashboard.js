async function loadDashboard() {
  const res = await fetch('/api/dashboard');
  const data = await res.json();
  document.getElementById('totalRooms').textContent = data.totalRooms ?? 0;
  document.getElementById('availableRooms').textContent = data.availableRooms ?? 0;
  document.getElementById('occupiedRooms').textContent = data.occupiedRooms ?? 0;
  document.getElementById('totalBookings').textContent = data.totalBookings ?? 0;
}

async function loadRecentBookings() {
  const res = await fetch('/api/bookings/recent');
  const list = await res.json();
  const tbody = document.getElementById('recentBookingsBody');
  tbody.innerHTML = '';
  list.forEach(b => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${b.bookingId}</td>
      <td>${b.customer?.name || ''}</td>
      <td>${b.room ? (b.room.roomType + ' #' + b.room.roomId) : ''}</td>
      <td>${b.checkInDate || ''}</td>
      <td>${b.checkOutDate || ''}</td>
    `;
    tbody.appendChild(tr);
  });
}

loadDashboard();
loadRecentBookings();
