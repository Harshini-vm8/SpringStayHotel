async function loadRoomTypes() {
  const res = await fetch('/api/rooms/types');
  const types = await res.json();
  const sel = document.getElementById('roomType');
  sel.innerHTML = types.map(t => `<option value="${t}">${t}</option>`).join('');
}

async function loadRooms() {
  const res = await fetch('/api/rooms');
  const rooms = await res.json();
  const tbody = document.getElementById('roomsBody');
  tbody.innerHTML = '';
  rooms.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.roomId}</td>
      <td>${r.roomType}</td>
      <td>${r.price}</td>
      <td>${r.status}</td>
      <td>
        <button class="btn btn-outline" onclick="editRoom(${r.roomId})">Edit</button>
        <button class="btn btn-danger" onclick="deleteRoom(${r.roomId})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function createRoom(e) {
  e.preventDefault();
  const body = {
    roomType: document.getElementById('roomType').value,
    price: parseFloat(document.getElementById('price').value),
    status: document.getElementById('status').value
  };
  await fetch('/api/rooms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  e.target.reset();
  await loadRooms();
}

async function deleteRoom(id) {
  await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
  await loadRooms();
}

async function editRoom(id) {
  const res = await fetch(`/api/rooms/${id}`);
  const r = await res.json();
  const newPrice = prompt('Enter new price', r.price);
  if (newPrice === null) return;
  const newStatus = prompt('Enter status (AVAILABLE/OCCUPIED)', r.status);
  if (!['AVAILABLE','OCCUPIED'].includes(newStatus)) return alert('Invalid status');
  await fetch(`/api/rooms/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ roomType: r.roomType, price: parseFloat(newPrice), status: newStatus })});
  await loadRooms();
}

loadRoomTypes();
document.getElementById('roomForm').addEventListener('submit', createRoom);
loadRooms();
