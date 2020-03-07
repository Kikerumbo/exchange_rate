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
