'use strict';

const exchangeUrl = 'https://api.exchangerate-api.com/v4/latest/EUR';
let flagStarted = false;

const selectBox = [];
selectBox[0] = document.querySelector('select#currencyToConvert');
selectBox[1] = document.querySelector('select#currencyConverted');

const form = document.querySelector('form');

// Get info from API
async function getAPIinfo(url, selectedBox) {
  const infoFromAPIArray = [];
  const objectWithExchangeRates = {};
  const infoFromAPI = await fetch(url);

  infoFromAPIArray[0] = await infoFromAPI.json();

  for (const currency in infoFromAPIArray[0].rates) {
    objectWithExchangeRates[currency] = infoFromAPIArray[0].rates[currency];
  }

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
async function addOptionsToSelects(objectWithExchangeRates, selectedBox) {
  const fragment = document.createDocumentFragment();

  for (const currencyName in objectWithExchangeRates) {
    const selectOption = document.createElement('option');

    selectOption.textContent = `${currencyName}`;
    fragment.append(selectOption);
  }
  selectedBox.append(fragment);
}

// Add values to the select options.
function AddValueToSelectOptions(objectWithExchangeRates) {
  const fragmentForValues = document.createDocumentFragment();

  selectBox[1].innerHTML = ' ';

  for (const currencyName in objectWithExchangeRates) {
    const selectOptionForValues = document.createElement('option');

    selectOptionForValues.textContent = `${currencyName}`;
    selectOptionForValues.setAttribute(
      'value',
      `${objectWithExchangeRates[currencyName]}`
    );
    fragmentForValues.append(selectOptionForValues);
  }
  selectBox[1].append(fragmentForValues);
}

// Do the conversion.
function doConversion(event) {
  const textBoxToConvert = document.querySelector('input#toConvert');
  const textBoxConverted = document.querySelector('input#converted');

  event.preventDefault();

  if (isNaN(textBoxToConvert.value)) {
    alert('It should be a number');
    textBoxToConvert.value = '';
    throw new Error('It should be a number!');
  } else {
    const textBoxToConvertValue = Number(textBoxToConvert.value);
    const originalCurrency = selectBox[0].value;
    textBoxToConvert.value = '';

    console.log(textBoxToConvertValue);
    console.log(originalCurrency);
    console.log(selectBox[1]);

    const convertedCurrency =
      selectBox[1][originalCurrency].value * textBoxToConvertValue;

    textBoxConverted.value = `${convertedCurrency.toFixed(2)}`;

    console.log(`Converted value: ${convertedCurrency}`);
  }
}

//*************************

getAPIinfo(exchangeUrl);

// EventListener for the selectBox 1
selectBox[0].addEventListener('change', (event) => {
  const eventCurrencySelected =
    selectBox[0].options[selectBox[0].selectedIndex].text;

  const urlEvento = `https://api.exchangerate-api.com/v4/latest/${eventCurrencySelected}`;
  getAPIinfo(urlEvento, selectBox[0]);
});

// EventListener for the selectBox 2
selectBox[1].addEventListener('change', (event) => {
  const eventCurrencySelected =
    selectBox[0].options[selectBox[1].selectedIndex].text;

  const urlEvento = `https://api.exchangerate-api.com/v4/latest/${eventCurrencySelected}`;
  getAPIinfo(urlEvento, selectBox[1]);
});

// EventListener for the button
form.addEventListener('submit', (event) => doConversion(event));
