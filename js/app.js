document.addEventListener("DOMContentLoaded", (event) => {
  // initialize Leaflet
  var map = L.map('map').setView({lon: 0, lat: 0}, 2);

// add the OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    // attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);

// show the scale bar on the lower left corner
  L.control.scale().addTo(map);

// show a marker on the map
  L.marker({lon: 0, lat: 0}).bindPopup('The center of the world').addTo(map);
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


