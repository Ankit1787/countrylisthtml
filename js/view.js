import { getToday } from "./api.js";

export function renderHome(countries) {
  const app = document.getElementById("app");

  app.innerHTML = `
      <h1>Countries</h1>


        <ul
            class="country-list"
            id="country-list"
        ></ul>
    `;

  const list = document.getElementById("country-list");
  console.log(countries, "countries");
  countries.forEach((country,index) => {
    const li = document.createElement("li");
    li.classList.add("country-item");

    li.innerHTML = `

      <div class="country-card">
            <div class="country-image-home">
              <img
                src="${country.flags?.png ?? ""}"
                alt="${country?.name?.common}"
                height="80"
                width="128"
              />
            </div>
            <div class="country-info">
              <div class="country-name">${country?.name?.common}</div>
              <div class="country-currency">
                Currency: ${country?.currencies ? Object.values(country.currencies)[0]?.name : "N/A"}
              </div>
              <div class="country-currency">
                Current date and time: ${getToday()}
              </div>
              <div class="country-actions">
<button
  class="button map-btn"
  data-index="${index}"
>
  Show Map
</button>
           <button
                     class="button detail-btn"
                    data-cca3="${country.cca3}"
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        `;

    list.appendChild(li);
  });
}

export function renderCountry(country, neighbour = []) {
  const app = document.getElementById("app");

  app.innerHTML = `
        <button id="back-btn">
            ← Back
        </button>

        <br><br>

       
        <div class="container">
    <div class="">
      <h2 class="container-heading">${country?.name?.common}</h2>
    </div>
    <div class="country-card">
      <div class="country-image">
        <img src="${country?.flags?.png}" alt="${country?.name?.common}" />
      </div>
      <div class="country-info">
        <div class="country-field">
          Native Name: <span>${country.name?.nativeName?.length > 0 ? Object.values(country.name?.nativeName)[0]?.common : ""}</span>
        </div>
        <div class="country-field">
          Capital: <span>${country?.capital?.length > 0 ? country?.capital[0] : ""}</span>
        </div>
        <div class="country-field">
          Population: <span>${country?.population}</span>
        </div>
        <div class="country-field">
          region: <span>${country?.region}</span>
        </div>
        <div class="country-field">
          Sub Region: <span>${country?.subregion}</span>
        </div>
        <div class="country-field">
          Area: <span>${country?.area}</span>
        </div>
        <div class="country-field">
          Country Code: <span>${country?.name?.common}</span>
        </div>
        <div class="country-field">
          Languages: <span>${country?.languages?.length > 0 ? Object.values(country.languages)?.join(",") : ""}</span>
        </div>
        <div class="country-field">
          Currencies: <span>${country?.currencies?.length > 0 ? Object.values(country.currencies)[0] : ""}</span>
        </div>
        <div class="country-field">
          Timezones: <span>${country?.timezones?.length > 0 ? country?.timezones[0] : ""}</span>
        </div>
      </div>
    </div>
    <div class="neighbours-container">
      <h2 class="neighbours-heading">Neighbour Countries</h2>
      <div id="neighbours" class="neighbours-details">
     
      </div>
    </div>
  </div>    `;
  console.log(neighbour, "neighbour");
  if (neighbour?.length > 0)
    document.getElementById("neighbours").innerHTML = neighbour
      .map(
        (item) => `
      <div class="neighbour-item">
        <img
          src="${item.flags.svg}"
          alt="${item.flags.alt || item.name.common}"
          class="neighbours-image neighbour-country"
          data-country="${item.cca3}"
        />
        <p>${item.name.common}</p>
      </div>
    `,
      )
      .join("");
}
export function renderMap(country) {
  const app = document.getElementById("app");

  app.innerHTML = `
    <button id="back-btn">
      ← Back
    </button>

    <h1>${country.name.common}</h1>

    <div class="country-image-home">
      <img
        src="${country.flags?.png}"
        alt="${country.name.common}"
        width="250"
      />
    </div>

    <div class="map-links">
      <p>
        <a href="${country.maps.googleMaps}" target="_blank">
          Open Google Maps
        </a>
      </p>

      <p>
        <a href="${country.maps.openStreetMaps}" target="_blank">
          Open OpenStreetMap
        </a>
      </p>
    </div>
  `;
}
