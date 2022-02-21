import './css/styles.css';
import countryCard from '../src/templates/country-card.hbs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetch-countries.js';
import getRefs from './js/get-refs.js';
import countriesList from '../src/templates/countries-card.hbs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

// console.dir(refs.inputSearch);

refs.inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const name = refs.inputSearch.value.trim();
  if (name === '') {
    remove();
    return;
  }
  // console.log(name);
  fetchCountries(name).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  const countryCount = Object.keys(country).length;
  console.log(countryCount);
  if (countryCount > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (countryCount === 1) {
    remove();
    console.log(countryCount);
    const markup = countryCard(country);
    refs.countryInfo.innerHTML = markup;
  }
  if (countryCount >= 2 && countryCount <= 10) {
    remove();
    const markup = [];
    for (let count of country) {
      markup.push(countriesList(count));
    }
    refs.countryList.innerHTML = markup.join('');
  }
}

function onFetchError(error) {
  console.log(error);
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function remove() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
