'use strict';

const exchangeUrl = 'https://api.exchangerate-api.com/v4/latest/EUR';

async function getAPIinfo() {
  const infoFromAPIArray = [];

  const infoFromAPI = await fetch(exchangeUrl);
  infoFromAPIArray[0] = await infoFromAPI.json();

  const exchangeRatesObjectKeys = Object.keys(infoFromAPIArray[0].rates);

  let onlyExchangeRates = Object.entries(infoFromAPIArray[0].rates);

  addOptionsToSelects(exchangeRatesObjectKeys);

  const selectValue = document.querySelector('select#currencyToConvert');
  console.log(selectValue.value);

  // console.log(infoFromAPI);
  // console.log(infoFromAPIArray[0].rates);
  //console.log(exchangeRatesObjectKeys);
  //console.log(onlyExchangeRates);
}

getAPIinfo();

async function addOptionsToSelects(array) {
  const selectCurrency = document.querySelector('select#currencyToConvert');

  for (const value of array) {
    const selectOption = document.createElement('option');
    selectOption.setAttribute('value', value);
    selectOption.textContent = `${value}`;
    selectCurrency.append(selectOption);
  }

  const selectCurrency2 = document.querySelector('select#currencyConverted');

  for (const value of array) {
    const selectOption = document.createElement('option');
    selectOption.setAttribute('value', value);
    selectOption.textContent = `${value}`;
    selectCurrency2.append(selectOption);
  }
}
