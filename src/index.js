import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(evt) {
    evt.preventDefault();

    const searchRequest = refs.searchBox.value.trim();
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';

    if (searchRequest) {
        fetchCountries(searchRequest)
            .then(numInputSymbol)
            .catch(error => {
                return Notiflix.Notify.failure('Oops, there is no country with that name');
            })
    }

    function numInputSymbol(data) {
        if (data.length > 10) {
            return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
        markup(data);
    }
};

  function markup(data) {
    const markupData = data
      .map(({ flags: { svg }, name: { official } }) => {
        return `<li><img src="${svg}" alt="${official}" width="50" height="30"/>${official}</li>`;
      })
      .join('');

    if (data.length === 1) {
      const languages = Object.values(data[0].languages).join(', ');

      const markupInfo = `<ul>
      <li>Capital: ${data[0].capital}</li>
      <li>Population: ${data[0].population}</li>
      <li>Languages: ${languages}</li>
      </ul>`;

      refs.countryInfo.insertAdjacentHTML('afterbegin', markupInfo);
    }
    return refs.countryList.insertAdjacentHTML('afterbegin', markupData);
};


