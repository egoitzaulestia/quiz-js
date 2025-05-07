// js/init.js

// Helpers para cookies
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; expires=${expires}; path=/`;
};

const seedLocalStorage = async () => {
  // Si ya hemos hecho seed (cookie) o ya hay players, no hacemos nada
  if (getCookie('seeded') === 'true' || localStorage.getItem('players')) return;

  try {
    // Tiramos del JSON de semilla
    const res = await fetch('JSON/localStorage-data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const seed = await res.json();

    // Rellenamos el LocalStorage
    Object.entries(seed).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });

    // Marcamos con cookie que ya hicimos seed (365 días)
    setCookie('seeded', 'true', 365);
    console.log('✅ Seed inicial cargado');
  } catch (err) {
    console.error('⚠️ Error al cargar seed JSON:', err);
  }
};

seedLocalStorage();
