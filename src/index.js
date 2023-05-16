import './css/styles.css';
// import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const inputValue = e.currentTarget.value;
  getCountries(inputValue)
    .then(data => (countryList.innerHTML = createMarkup(data)))
    .catch(err => console.log(err));
}

function getCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

function createMarkup(arr) {
  if (arr.length >= 2 && arr.length <= 10) {
    return arr
      .map(
        ({
          name: { official },
          flags: { svg, alt },
        }) => `<li class="country-item">
        <div>
          <img class="flag" src="${svg}" alt="${alt}" />
          <h2>${official}</h2>
        </div>
      </li>`
      )
      .join('');
  } else {
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
}

// getCountries('deutschland');
