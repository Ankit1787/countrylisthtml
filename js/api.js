const API =
  "https://restcountries.com/v3.1";

export async function getCountries() {

    const response = await fetch(
        `${API}/all?fields=name,flags,currencies,cca3,maps`
    );

    return await response.json();
}

export async function getCountryByCode(code) {

    const response = await fetch(
        `${API}/alpha/${code}`
    );

    const data = await response.json();

    return data[0];
}



export const getNeighboringCountries = async (borderCodes) => {
  
    const response = await fetch(
        `${API}/alpha?codes=${borderCodes.join(",")}&fields=flags,name,cca3`,
    );
  return await response.json();
 
};


export const getToday = () => {
  const date = new Date();

  const day = date.getDate();

  const month = date.toLocaleString("en", { month: "short" });

  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");

  const minutes = date.getMinutes().toString().padStart(2, "0");

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";

    switch (n % 10) {
      case 1:
        return "st";

      case 2:
        return "nd";

      case 3:
        return "rd";

      default:
        return "th";
    }
  };

  return `${day}${getOrdinal(day)} ${month} ${year}, ${hours}:${minutes}`;
};