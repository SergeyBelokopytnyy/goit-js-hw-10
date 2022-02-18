import './css/styles.css';
import countryCard from '../src/country-card.hbs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import getRefs from './get-refs.js';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

// console.dir(refs.inputSearch);

refs.inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const name = refs.inputSearch.value.trim();
  // console.log(name);
  fetchCountries(name).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  const markup = countryCard(country);
  refs.countryInfo.innerHTML = markup;
}

function onFetchError(error) {
  console.log(error);
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
