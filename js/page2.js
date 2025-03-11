function toggleAccordionLab() {
  console.log('toggleAccordionLab()');

  const content = document.getElementById('accordionContentLab');
  const content_mobile = document.getElementById('accordionContentLab_mobile');
  const arrow = document.getElementById('arrow');
  const arrow_mobile = document.getElementById('arrow_mobile');

  console.log('content.classList', content.classList);
  console.log('content.classList.contains(\'hidden\')', content.classList.contains('hidden'));


  if(content.classList.contains('hidden')) {
    content.classList.remove('hidden');
  } else {
    content.classList.add('hidden');
  }

  // content.classList.toggle('hidden');
  arrow.classList.toggle('rotate-180');

  if(content_mobile.classList.contains('hidden')) {
    content_mobile.classList.remove('hidden');
  } else {
    content_mobile.classList.add('hidden');
  }

  // content.classList.toggle('hidden');
  arrow_mobile.classList.toggle('rotate-180');
}

function closeMobileLabInfo() {
  const mobileLabInfo = document.getElementById('mobile_lab_info');
  const info_panel = document.getElementById('info_panel');

  console.log('mobile_lab_info', mobileLabInfo);

  if (mobileLabInfo) {
    mobileLabInfo.classList.add('hidden');
    info_panel.classList.add('hidden');
  }

  document.getElementById("mobile_lab_content").innerHTML = '';
  document.getElementById("card1").innerHTML = '';
}

window.labs = [
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

const map = L.map('map', {
  zoomControl: false,
  attributionControl:false
}).setView([51.958, 9.141], 13);
setTimeout(function () { map.invalidateSize() }, 400);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

const locateButton = L.Control.extend({
  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'leaflet-control-custom block lg: top-[0px]');
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

const getHtmlLabTab= (lab, idPostFixMobile = '') => {
  return `
        <div class="flex gap-2">
          <div style="width: 40px; height: 40px; border-radius: 12px; background-color: #3ECAE3"></div>
          <div style="display: flex; text-align: center; align-items: center;">
            <p style="font-size: 22px; font-weight: 500; line-height: 100%">${lab.name}</p>
          </div>
        </div>
        <div class="flex w-full gap-2">
          <div style="display: flex; align-content: center; justify-content: center; align-items: center; gap: 5px">
            <div style="width: 18px"><img src="/img/clock.svg" style="height: 18px; width: 18px" alt="clock"></div>
            <p class="font-medium" style="font-size: 14px; color: #08C671; margin-top: 0; font-weight: 400; line-height: 100%">${lab.status}</p>
          </div>
          <button onclick="toggleAccordionLab()" class="p-2 focus:outline-none" style="cursor: pointer; margin-left: 13%">
            <svg id="arrow${idPostFixMobile}" class="w-5 h-6 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>
        <div id="accordionContentLab${idPostFixMobile}" class="mt-2 rounded-lg hidden ">
            <div class="grid grid-cols-2" style="width: 80%; row-gap: 10px">
              ${lab.schedule.map((item) => `
                  <div class="flex" style="width: 50px">
                    <p style="font-size: 14px; font-weight: 400; line-height: 100%">
                        ${item.day}
                    </p>
                  </div>
                  <div>
                    <p style="font-size: 14px; font-weight: 400; line-height: 100%">
                        ${item.hours}
                    </p>
                  </div>
              `).join("")}
            </div>
        </div>
        <div class="flex gap-[10px]">
          <div class="flex"><img src="/img/pin.svg" alt="pin"></div>
          <p class="text-sm text-gray-500 mt-2">Address: ${lab.address}</p>
        </div>
        <div style="width: 100%; height: 1px; border: 1px; background-color: #8080808C; margin-top: 10px;"></div>
        <div class="mt-4" style="display: flex; flex-direction: column; gap: 10px;">
          <p style="font-size: 18px; font-weight: 400">Analysis list</p>
          <div class="flex space-x-2 mt-2">
            ${lab.tests.map((test) => `
                        <div class="pt-[5px] py-0.5 px-2.5 border border-transparent text-sm transition-all"
               style="
                display: flex;
    gap: 11px;
    border-radius: 24px;
    color: black;
    background-color: #C5EFF7;
    height: 33px;
    justify-content: center;">
            Syphilis
          </div>
            `).join("")}
          </div>
        </div>
        <button
          class="bg-white py-2 px-4 rounded-full border transition duration-300 text-white  w-[93%] md:w-[30%] lg:w-[30%]"
          style="background-color: #3ECAE3;position: absolute; bottom: 10px;"
          id="make_appointment_btn"
        >
          Make an appointment
        </button>
      `
}

function updateLabInfo(lab) {
  const labInfo = document.getElementById("card1");
  labInfo.innerHTML = getHtmlLabTab(lab);

  const mobileLabContent = document.getElementById("mobile_lab_content");
  mobileLabContent.innerHTML =  getHtmlLabTab(lab, '_mobile');
  document.getElementById("mobile_lab_info").classList.remove("hidden");

  // Показываем правую панель на десктопе
  document.getElementById("info_panel").classList.remove("hidden");
}

const initMap = (labs) => {
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  new locateButton({position: 'topright'}).addTo(map);

  document.getElementById("close-popup-btn").addEventListener("click", () => {
    document.getElementById("modal_map").classList.add("hidden");
  });

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
    const marker = L.marker(lab.coordinates, {icon: customIcon, data: lab }).addTo(map);
    selectedMarker = marker;
    marker.on("click", (e) => {
      updateLabInfo(e.target.options.data);
      return false;
    });
  });

  // Скрываем правую панель, если маркер не выбран
  if (!selectedMarker) {
    document.getElementById("info_panel").classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", (event) => {

  initMap(window.labs);
  let modal = document.getElementById('modal_map');
  let btn = document.getElementById('open-map');
  let button = document.getElementById('close-popup-btn');
  let button2 = document.getElementById('ok-btn');


  btn.onclick = function () {
    const tags =  Array.from(document.querySelectorAll('[data-tag]'));
    const clearTags= tags.filter((e) => e.checked).map(e => e.getAttribute('data-tag'));

    if(clearTags.length > 0) {
      const filteredLab= window.labs.filter((lab) =>
        clearTags.some((tag) => lab.tests.find(testLab => testLab === tag)));

      initMap(filteredLab);
    } else {
      initMap(window.labs);
    }
    // логика фильтрации


    modal.style.display = 'block';
    document.body.classList.add('no-scroll');
    setTimeout(function () { map.invalidateSize() }, 100);
  };

  button.onclick = function () {
    modal.style.display = 'none';
    document.body.classList.remove('no-scroll');
  };

  button2.onclick = function () {
    modal.style.display = 'none';
    document.body.classList.remove('no-scroll');
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.classList.remove('no-scroll');
    }
  }
});
