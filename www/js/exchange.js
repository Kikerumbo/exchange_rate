'use strict';

const exchangeUrl = 'https://api.exchangerate-api.com/v4/latest/EUR';
let flagStarted = false;

const selectBox = [];
selectBox[0] = document.querySelector('select#currencyToConvert');
selectBox[1] = document.querySelector('select#currencyConverted');

// Get info from API
async function getAPIinfo(url, selectedBox) {
  const infoFromAPIArray = [];
  const objectWithExchangeRates = {};
  const infoFromAPI = await fetch(url);

  infoFromAPIArray[0] = await infoFromAPI.json();

  for (const currency in infoFromAPIArray[0].rates) {
    objectWithExchangeRates[currency] = infoFromAPIArray[0].rates[currency];
  }

  //console.log(objectWithExchangeRates);
  //console.log(selectBox);

  if (flagStarted === false) {
    addOptionsToSelects(objectWithExchangeRates, selectBox[0]);
    addOptionsToSelects(objectWithExchangeRates, selectBox[1]);
    flagStarted = true;
  }

  if (selectedBox) {
    AddValueToSelectOptions(objectWithExchangeRates, selectedBox);
  }
}

// Add the different currencies to the "selects".
async function addOptionsToSelects(objectWithExchangeRates, selectBox) {
  const fragment = document.createDocumentFragment();

  for (const currencyName in objectWithExchangeRates) {
    const selectOption = document.createElement('option');

    selectOption.textContent = `${currencyName}`;
    fragment.append(selectOption);
    selectBox.append(fragment);
  }
}

// Add values to the select options.
async function AddValueToSelectOptions(objectWithRates, selectedBox) {
  /*   for (const currencyName in objectWithRates) {
    const selectOption = document.createElement('option');

    selectOption.setAttribute('value', `${objectWithRates[currencyName]}`);
    fragment.append(selectOption);
    selectCurrency2.append(fragment);
  } */

  console.log(selectedBox);

  for (const currencyName in objectWithRates) {
    const selectOption = document.createElement('option');
    const fragment = document.createDocumentFragment();

    selectOption.setAttribute('value', `${objectWithRates[currencyName]}`);
    fragment.append(selectOption);
    selectedBox.append(fragment);
  }
}

// Do the conversion.
function doConversion(arrayOfRates) {
  const selectToConvert = document.querySelector('select#currencyToConvert');
  const selectConverted = document.querySelector('select#currencyConverted');
  const textBoxToConvert = document.querySelector('input#toConvert');
  const textBoxConverted = document.querySelector('input#converted');
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isNaN(textBoxToConvert.value)) {
      alert('It should be a number');
      textBoxToConvert.value = '';
      throw new Error('It should be a number!');
    } else {
      const textBoxToConvertValue = Number(textBoxToConvert.value);
      textBoxToConvert.value = '';

      const convertedCurrency = selectConverted.value * textBoxToConvertValue;

      textBoxConverted.value = `${convertedCurrency.toFixed(2)}`;

      console.log(`Converted value: ${convertedCurrency}`);
    }
  });
}

// *************************

getAPIinfo(exchangeUrl);

selectBox[0].addEventListener('change', (event) => {
  const eventCurrencySelected =
    selectBox[0].options[selectBox[0].selectedIndex].text;

  /* console.log(
    `Evento: ${selectBox[0].options[selectBox[0].selectedIndex].text}`
  ); */

  console.log(`Evento: ${eventCurrencySelected}`);

  const urlEvento = `https://api.exchangerate-api.com/v4/latest/${eventCurrencySelected}`;
  getAPIinfo(urlEvento, selectBox[0]);
});

selectBox[1].addEventListener('change', (event) => {
  const eventCurrencySelected =
    selectBox[0].options[selectBox[0].selectedIndex].text;

  const urlEvento = `https://api.exchangerate-api.com/v4/latest/${eventCurrencySelected}`;
  getAPIinfo(urlEvento, selectBox[1]);
});
