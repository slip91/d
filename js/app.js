const labs = [
  {
    id: 1,
    name: "Lab 1",
    coordinates: [51.958, 9.141],
    address: "Hradešínská 1930/63, 101 Vinohrady",
    status: "Open now",
    schedule: [
      { day: "Monday", hours: "9 AM - 11 PM" },
      { day: "Tuesday", hours: "9 AM - 11 PM" },
    ],
    tests: ["Syphilis", "HIV"],
  },
  {
    id: 2,
    name: "Lab 2",
    coordinates: [51.96, 9.15],
    address: "Another Address, 102 Vinohrady",
    status: "Closed now",
    schedule: [
      { day: "Monday", hours: "10 AM - 8 PM" },
      { day: "Tuesday", hours: "10 AM - 8 PM" },
    ],
    tests: ["COVID-19", "Flu"],
  },
];

document.addEventListener("DOMContentLoaded", (event) => {
  // Инициализация карты
  var map = L.map('map').setView([51.958, 9.141], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);


  labs.forEach((lab) => {
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

    function updateLabInfo(lab) {
      console.log('open map', lab.name)
    }


    // Создаем маркер с кастомной иконкой
    const marker = L.marker(lab.coordinates, {
      icon: customIcon,
    }).addTo(map);

    marker.on("click", () => {
      updateLabInfo(lab);
    });

    updateLabInfo(labs[0]);
  });
});

document.getElementById("ok-btn").addEventListener("click", () => {
  document.getElementById("modal_map").classList.add("hidden");
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


