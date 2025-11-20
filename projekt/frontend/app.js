const API = 'http://localhost/backend/api.php?path='; // prilagodi putanju prema svom serveru

// Dohvat putovanja
async function getTrips() {
  const res = await fetch(API + 'trips');
  const trips = await res.json();
  const el = document.getElementById('trips');
  el.innerHTML = trips.map(t => `
    <article class="card">
      <h3>${t.destination}</h3>
      <p>${t.description}</p>
      <p><strong>Datum:</strong> ${t.date}</p>
      <p><strong>Cijena:</strong> ${t.price} €</p>
      <button data-id="${t.id}" class="reserve">Rezerviraj</button>
    </article>
  `).join('');

  // Rezervacija
  document.querySelectorAll('.reserve').forEach(btn => {
    btn.addEventListener('click', async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) { alert('Prijavi se prvo.'); return; }
      const res = await fetch(API + 'reservations', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ user_id: Number(userId), trip_id: Number(btn.dataset.id) })
      });
      const data = await res.json();
      alert(data.message || data.error);
    });
  });
}

// Dohvat rezervacija korisnika
async function getReservations() {
  const userId = localStorage.getItem('userId');
  if (!userId) { alert('Prijavi se prvo.'); return; }
  const res = await fetch(API + 'reservations&user_id=' + userId);
  const reservations = await res.json();
  const el = document.getElementById('reservationList');
  el.innerHTML = reservations.map(r => `
    <div class="card">
      <h3>${r.destination}</h3>
      <p><strong>Datum:</strong> ${r.date}</p>
      <p><strong>Cijena:</strong> ${r.price} €</p>
    </div>
  `).join('');
}

// Navigacija
document.getElementById('loadTrips').addEventListener('click', (e) => { 
  e.preventDefault(); 
  showSection('trips'); 
  getTrips(); 
});
document.getElementById('showLogin').addEventListener('click', (e) => { 
  e.preventDefault(); 
  showSection('login'); 
});
document.getElementById('showRegister').addEventListener('click', (e) => { 
  e.preventDefault(); 
  showSection('register'); 
});
document.getElementById('showReservations').addEventListener('click', (e) => { 
  e.preventDefault(); 
  showSection('reservations'); 
  getReservations(); 
});

// Prijava
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPass').value;
  const res = await fetch(API + 'login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.user?.id) {
    localStorage.setItem('userId', data.user.id);
    alert('Prijavljen: ' + data.user.name);
    showSection('trips');
    getTrips();
  } else {
    alert(data.error || 'Greška');
  }
});

// Registracija
document.getElementById('regBtn').addEventListener('click', async () => {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPass').value;
  const res = await fetch(API + 'register', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  alert(data.message || data.error);
});

// Helper za prikaz sekcija
function showSection(id) {
  document.querySelectorAll('main > section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Inicijalni dohvat
getTrips();
