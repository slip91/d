function toggleAccordionLab() {
  const content = document.getElementById('accordionContentLab');
  const arrow = document.getElementById('arrow');
  content.classList.toggle('hidden');
  arrow.classList.toggle('rotate-180');
}

function closeMobileLabInfo() {
  const mobileLabInfo = document.getElementById('mobile_lab_info');
  const info_panel = document.getElementById('info_panel');
  if (mobileLabInfo) {
    mobileLabInfo.classList.add('hidden');
    info_panel.classList.add('hidden');
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const map = L.map('map', {
    zoomControl: false,
    attributionControl:false
  }).setView([51.958, 9.141], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  const locateButton = L.Control.extend({
    onAdd: function (map) {
      const container = L.DomUtil.create('div', 'leaflet-control-custom hidden sm:block');
      container.innerHTML = `<img src="/img/location.svg" alt="location">`;
      container.onclick = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords;
            map.setView([latitude, longitude], 13);
            L.marker([latitude, longitude]).addTo(map);
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Unable to retrieve your location.");
          }
        );
      };
      return container;
    },
  });

  new locateButton({position: 'topright'}).addTo(map);

  document.getElementById("close-popup-btn").addEventListener("click", () => {
    document.getElementById("modal_map").classList.add("hidden");
  });

  const labs = [
    {
      id: 1,
      name: "Lab 1",
      coordinates: [51.958, 9.141],
      address: "Hradešínská 1930/63, 101 Vinohrady",
      status: "Open now",
      schedule: [
        {day: "Monday", hours: "9 AM - 11 PM"},
        {day: "Tuesday", hours: "9 AM - 11 PM"},
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
        {day: "Monday", hours: "10 AM - 8 PM"},
        {day: "Tuesday", hours: "10 AM - 8 PM"},
      ],
      tests: ["COVID-19", "Flu"],
    },
  ];

  let selectedMarker = null;

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
      iconSize: [170, 69],
    });
    const marker = L.marker(lab.coordinates, {icon: customIcon}).addTo(map);
    selectedMarker = marker;
    marker.on("click", () => {
      updateLabInfo(lab);
    });
  });

  function updateLabInfo(lab) {
    const labInfo = document.getElementById("card1");
    labInfo.innerHTML = `
        <div class="flex gap-2">
          <div style="width: 40px; height: 40px; border-radius: 12px; background-color: #3ECAE3"></div>
          <div style="display: flex; text-align: center; align-items: center;">
            <h1 class="font-medium">${lab.name}</h1>
          </div>
        </div>
        <div class="flex w-full gap-2">
          <div style="display: flex; align-content: center; justify-content: center; align-items: center; gap: 5px">
            <div style="width: 18px"><img src="/img/clock.svg" style="height: 18px; width: 18px" alt="clock"></div>
            <p class="font-medium" style="font-size: 14px; color: #08C671; margin-top: 0; font-weight: 400">${lab.status}</p>
          </div>
          <button onclick="toggleAccordionLab()" class="p-2 focus:outline-none" style="cursor: pointer; margin-left: 13%">
            <svg id="arrow" class="w-5 h-6 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>
        <div id="accordionContentLab" class="mt-2 rounded-lg hidden transition-all duration-300 flex gap-4 flex-col w-full ml-[20px]">
          ${lab.schedule.map((item) => `
            <div class="flex gap-[20px] w-full">
              <div class="flex"><p>${item.day}</p></div>
              <div><p>${item.hours}</p></div>
            </div>
          `).join("")}
        </div>
        <div class="flex gap-[10px]">
          <div class="flex"><img src="/img/pin.svg"></div>
          <p class="text-sm text-gray-500 mt-2">Address: ${lab.address}</p>
        </div>
        <div style="width: 100%; height: 1px; border: 1px; background-color: #8080808C; margin-top: 10px;"></div>
        <div class="mt-4" style="display: flex; flex-direction: column; gap: 10px;">
          <p style="font-size: 18px; font-weight: 400">Analysis list</p>
          <div class="flex space-x-2 mt-2">
            ${lab.tests.map((test) => `
                        <div class="pt-[5px] py-0.5 px-2.5 border border-transparent text-sm transition-all shadow-sm"
               style="    display: flex;
    gap: 11px;
    border-radius: 24px;
    border-color: #3ECAE3;
    color: #3ECAE3;
    width: 83px;
    height: 33px;
    justify-content: center;">
            Syphilis
          </div>
            `).join("")}
          </div>
        </div>
        <button
          class="bg-white py-2 px-4 rounded-full border transition duration-300 w-[200px] lg:w-[95%] text-white w-auto"
          style="background-color: #3ECAE3; border-color: #3ECAE3; position: absolute; bottom: 10px; width: 95%; margin-left: 10px">
          Make an appointment
        </button>
      `;

    const mobileLabContent = document.getElementById("mobile_lab_content");
    mobileLabContent.innerHTML = labInfo.innerHTML;
    document.getElementById("mobile_lab_info").classList.remove("hidden");

    // Показываем правую панель на десктопе
    document.getElementById("info_panel").classList.remove("hidden");
  }

  // Скрываем правую панель, если маркер не выбран
  if (!selectedMarker) {
    document.getElementById("info_panel").classList.add("hidden");
  }
});
