import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

searchInput.addEventListener(
  'input',
  debounce(() => {
    const name = searchInput.value;

    fetchCountries(name)
      .then(data => {
        const counties = data
          .map(country => {
            return `<li>${country.name.official}</li>`;
          })
          .join('');

        countryList.innerHTML = counties;
      })
      .catch(error => console.error(error));
  }),
  DEBOUNCE_DELAY
);
