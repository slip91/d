document.addEventListener("DOMContentLoaded", (event) => {
  // Инициализация карты
  var map = L.map('map').setView([51.958, 9.141], 13);

  // Добавляем слой OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-container">
        <img src="/img/storePin.svg" alt="Marker" class="marker-icon" />
        <div class="info-box">
          <h3 style="font-size: 20px; font-weight: 500; color: black">Laboratory</h3>
          <p style="font-weight: 400; font-size: 15px; color: #818181 ">Closes 11PM</p>
        </div>
      </div>
    `,
    iconSize: [170, 69], // Размер иконки (ширина, высота)
  });

  // Создаем маркер с кастомной иконкой
  const marker = L.marker([51.958, 9.141], {
    icon: customIcon,
  }).addTo(map);
});

module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-teal': '#3ECAE3', // Добавляем кастомный цвет
      },
    },
  },
  variants: {},
  plugins: [],
};


