'use strict';

const exchangeUrl = 'https://api.exchangerate-api.com/v4/latest/EUR';
let flagStarted = false;
let eventFlag = false;

const selectBox = [];
selectBox[0] = document.querySelector('select#currencyToConvert');
selectBox[1] = document.querySelector('select#currencyConverted');

const form = document.querySelector('form');

// Get info from API
async function getAPIinfo(url) {
  const infoFromAPIArray = [];
  const objectWithExchangeRates = {};
  const infoFromAPI = await fetch(url);

  infoFromAPIArray[0] = await infoFromAPI.json();

  for (const currency in infoFromAPIArray[0].rates) {
    objectWithExchangeRates[currency] = infoFromAPIArray[0].rates[currency];
  }

  if (flagStarted === false) {
    addOptionsToSelects(objectWithExchangeRates);
    addOptionsToSelects(objectWithExchangeRates);
    flagStarted = true;

    return;
  }

  return objectWithExchangeRates;
}

// Add the different currencies to the "selects".
function addOptionsToSelects(objectWithExchangeRates) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 2; i++) {
    for (const currencyName in objectWithExchangeRates) {
      const selectOption = document.createElement('option');

      selectOption.textContent = `${currencyName}`;
      fragment.append(selectOption);
    }
    selectBox[i].append(fragment);
  }
}

// Do the conversion.
async function doConversion(event) {
  const textBoxToConvert = document.querySelector('input#toConvert');
  const textBoxConverted = document.querySelector('input#converted');
  const sectionConversionP1 = document.querySelector(
    'section#conversion p#result'
  );
  const sectionConversionP2 = document.querySelector(
    'section#conversion p#rate'
  );

  event.preventDefault();

  // Save the currency name selected in the first <select>
  const eventCurrencySelected =
    selectBox[0].options[selectBox[0].selectedIndex].text;

  const urlEvento = `https://api.exchangerate-api.com/v4/latest/${eventCurrencySelected}`;
  const exchageRateArray = await getAPIinfo(urlEvento);

  // Check if the content of the <input> is a number, and if not, throw an error and empty it
  if (isNaN(textBoxToConvert.value)) {
    alert('It should be a number');
    textBoxToConvert.value = '';
    throw new Error('It should be a number!');
  } else {
    const textBoxToConvertValue = Number(textBoxToConvert.value);
    textBoxToConvert.value = '';

    let convertedCurrency =
      exchageRateArray[selectBox[1].value] * textBoxToConvertValue;
    convertedCurrency = convertedCurrency.toFixed(2);

    sectionConversionP1.textContent = `${textBoxToConvertValue} ${eventCurrencySelected} ===> ${convertedCurrency} ${selectBox[1].value}`;
    sectionConversionP2.textContent = `(1 ${eventCurrencySelected} = ${
      exchageRateArray[selectBox[1].value]
    } ${selectBox[1].value})`;
  }
}

//*************************

getAPIinfo(exchangeUrl);

// EventListener for the button
form.addEventListener('submit', (event) => doConversion(event));
