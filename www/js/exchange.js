'use strict';

const exchangeUrl = 'https://api.exchangerate-api.com/v4/latest/EUR';

async function getAPIinfo(url) {
  const infoFromAPIArray = [];
  const onlyExchangeRates = {};
  const infoFromAPI = await fetch(url);

  infoFromAPIArray[0] = await infoFromAPI.json();

  const exchangeRatesObjectKeys = Object.keys(infoFromAPIArray[0].rates);

  for (const currency in infoFromAPIArray[0].rates) {
    onlyExchangeRates[currency] = infoFromAPIArray[0].rates[currency];
  }

  addOptionsToSelects(onlyExchangeRates);
  doConversion(onlyExchangeRates);
}

getAPIinfo(exchangeUrl);

// Add the different currencies to the "selects".
async function addOptionsToSelects(objectWithRates) {
  const selectCurrency = document.querySelector('select#currencyToConvert');
  const selectCurrency2 = document.querySelector('select#currencyConverted');
  const fragment = document.createDocumentFragment();

  for (const currencyName in objectWithRates) {
    const selectOption = document.createElement('option');

    selectOption.setAttribute('value', `${objectWithRates[currencyName]}`);
    selectOption.textContent = `${currencyName}`;
    fragment.append(selectOption);
    selectCurrency.append(fragment);
  }

  for (const currencyName in objectWithRates) {
    const selectOption = document.createElement('option');

    selectOption.setAttribute('value', `${objectWithRates[currencyName]}`);
    selectOption.textContent = `${currencyName}`;
    fragment.append(selectOption);
    selectCurrency2.append(fragment);
  }
}

// Do the conversion.
async function doConversion(arrayOfRates) {
  const selectToConvert = document.querySelector('select#currencyToConvert');
  const textBoxToConvert = document.querySelector('input#toConvert');
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

      console.log(`Value sent by the textbox: ${textBoxToConvertValue}`);
      console.log(`Value sent by the select: ${selectToConvert.value}`);

      const convertedCurrency = selectToConvert.value * textBoxToConvertValue;

      console.log(`Converted value: ${convertedCurrency}`);
    }
  });
}
