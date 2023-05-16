import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const inputValue = searchInput.value.trim();

  if (inputValue === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(inputValue)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      } else if (data.length >= 2 && data.length <= 10) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = createMarkupCountryList(data);
      } else {
        countryList.innerHTML = '';
        countryInfo.innerHTML = createMarkupCountryInfo(data);
      }
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log(err);
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}

function createMarkupCountryList(arr) {
  return arr
    .map(
      ({ name: { official }, flags: { svg, alt } }) => `
      <li class="country-item ">
          <div>
              <img class="flag" src="${svg}" alt="${alt}" />
              <h2>${official}</h2>
          </div>
      </li>
        `
    )
    .join('');
}

function createMarkupCountryInfo(arr) {
  return arr
    .map(
      ({
        name: { official },
        flags: { svg, alt },
        capital,
        languages,
        population,
      }) => `<li class="country-item">
        <div>
          <img class="flag" src="${svg}" alt="${alt}" />
          <h2>${official}</h2>
        </div>
        <p><span>capital: </span> ${capital}</p>
        <p><span>population: </span>${population}</p>
        <p><span>languages: </span>${Object.values(languages).join(', ')}</p>
      </li>`
    )
    .join('');
}

// getCountries('deutschland');
