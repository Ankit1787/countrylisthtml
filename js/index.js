// const apiBaseUrl =
//   "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,cca3";
// let countries = [];
// const getToday = () => {
//   const date = new Date();

//   const day = date.getDate();

//   const month = date.toLocaleString("en", { month: "short" });

//   const year = date.getFullYear();

//   const hours = date.getHours().toString().padStart(2, "0");

//   const minutes = date.getMinutes().toString().padStart(2, "0");

//   const getOrdinal = (n) => {
//     if (n > 3 && n < 21) return "th";

//     switch (n % 10) {
//       case 1:
//         return "st";

//       case 2:
//         return "nd";

//       case 3:
//         return "rd";

//       default:
//         return "th";
//     }
//   };

//   return `${day}${getOrdinal(day)} ${month} ${year}, ${hours}:${minutes}`;
// };
// const fetchCountries = () => {
//   fetch(apiBaseUrl)
//     .then((res) => {
//       if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       countries = data;
//       const list = document.getElementById("country-list");
//       for (let country of countries) {
//         const countryItem = document.createElement("li");
//         countryItem.classList.add("country-item");
//         countryItem.innerHTML = `
//      <div class="country-card">
//             <div class="country-image">
//               <img
//                 src="${country.flags?.png ?? ""}"
//                 alt="${country.name.common}"
//                 height="80"
//                 width="128"
//               />
//             </div>
//             <div class="country-info">
//               <div class="country-name">${country.name.common}</div>
//               <div class="country-currency">
//                 Currency: ${country.currencies ? Object.values(country.currencies)[0]?.name : "N/A"}
//               </div>
//               <div class="country-currency">
//                 Current date and time: ${getToday()}
//               </div>
//               <div class="country-actions">
//                 <button  class="button map-btn">Show Map</button>
//                 <button
//                      class="button detail-btn"
//                 data-country="${country?.cca3}"
//                 >
//                   Detail
//                 </button>
//               </div>
//             </div>
//           </div>
//     `;
//         list.appendChild(countryItem);
//       }
//     })
//     .catch((err) => console.error(err));
// };
// const list = document.getElementById("country-list");

// function navigateTo(path) {
//   history.pushState({}, "", path);

//   console.log("Navigating to:", path);
//   router();

//   // Call your router here
// }
// list.addEventListener("click", (e) => {
//   const target = e.target;

//   if (target.classList.contains("detail-btn")) {
//     const countryName = target.dataset.cc3;

//     navigateTo(`/country/${countryName}`);
//   }
// });
// console.log("connected");
// fetchCountries();

import {
  getCountries,
  getCountryByCode,
  getNeighboringCountries,
} from "./api.js";

import { renderHome, renderCountry, renderMap } from "./view.js";

let countries = [];

async function init() {
  countries = await getCountries();

  renderHome(countries);
}

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("detail-btn")) {
    const code = e.target.dataset.cca3;

    const country = await getCountryByCode(code);
    const borders = country?.borders;
    let neighbour = [];

    history.pushState({ code }, "", `/country/${code}`);
    console.log(borders);
    if (borders?.length > 0) {
      neighbour = await getNeighboringCountries(borders);
    }
    renderCountry(country, neighbour);
  }

  if (e.target.id === "back-btn") {
    history.pushState({}, "", "/");

    renderHome(countries);
  }
  if (e.target.classList.contains("neighbour-country")) {
    const countryCode = e.target.dataset.country;

    const country = await getCountryByCode(countryCode);

    const borders = country?.borders;
    let neighbour = [];

    history.pushState({ countryCode }, "", `/country/${countryCode}`);
    console.log(borders);
    if (borders?.length > 0) {
      neighbour = await getNeighboringCountries(borders);
    }
    renderCountry(country, neighbour);
  }
   if (e.target.classList.contains("map-btn")) {

    const index = Number(e.target.dataset.index);

    const country = countries[index];

    renderMap(country);
  }
});

window.addEventListener("popstate", () => {
  renderHome(countries);
});

init();
