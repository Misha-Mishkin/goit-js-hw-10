export default function fetchCountries(name) {
    const BASE = 'https://restcountries.com/v3.1/name';
    const OPTIONS = '?fields=name,capital,population,flags,languages';
    return fetch(`${BASE}/${name}${OPTIONS}`).then(response => {
        if (!response.ok) {
    throw new Error(response.status);
        }
        return response.json();
    })
};


