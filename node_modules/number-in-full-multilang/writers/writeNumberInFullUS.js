import {
  separateNumberClasses,
  fractionalParteOf,
  splitNumber,
  fractionalPartCounter,
  capitalizeFirstLetter,
  cutDoubleSpace,
} from '../helpers/helpersFunctions.js';

function numberInFullConverterUS(number) {
  // Trocar vírgula por ponto
  const stringNumber = number.toString().replace(',', '.');
  // Recuperar valor numérico
  const numericValue = parseFloat(stringNumber);
  // Separar parte inteira
  const integerNumber = Math.trunc(numericValue);

  const oneBillion = 1000000000;
  const upperLimit = 999 * oneBillion;

  const {
    hundredsClass,
    thousandsClass,
    millionsClass,
    billionsClass,
  } = separateNumberClasses(integerNumber);

  const cents = fractionalParteOf(numericValue);
  let centsLength = null;

  const billionsInFull =
    classesInFullUS(billionsClass) + (billionsClass ? ' billion ' : '');

  const millionsInFull =
    classesInFullUS(millionsClass) + (millionsClass ? ' million ' : '');

  const thousandsInFull =
    classesInFullUS(thousandsClass) + (thousandsClass ? ' thousand ' : '');

  const hundredsInFull = classesInFullUS(hundredsClass);

  const centsInFull =
    (cents == 0 ? '' : ' and ') +
    classesInFullUS(cents) +
    (cents > 1 ? ' cents' : cents == 1 ? ' cent' : '');

  const UScurrency = integerNumber > 1 ? ' dollars' : ' dollar';

  let caseSelect = null;

  // Caso o valor esteja acima do limite de 999bilhões, mostrar aviso ao usuário
  if (integerNumber >= upperLimit) caseSelect = 1;

  // Caso sejam usados mais que dois dígitos após a vírgula,
  // mostrar aviso ao usuário
  // evitando comportamento inadequado para o caso de R$ 0,100
  if (cents) centsLength = fractionalPartCounter(number);

  if (centsLength > 2) caseSelect = 2;

  // Caso o valor seja nulo, a resultado será "Zero real"
  // Isso evita o surgimento de valor "undefined" para os centavos
  if (!numericValue) caseSelect = 3;

  let valueInFull = '';

  switch (caseSelect) {
    case 1:
      valueInFull = 'Value greater than 999 billion dollars ';
      break;
    case 2:
      valueInFull = 'The cents must be a maximum of two digits';
      break;
    case 3:
      valueInFull = 'Zero dollars';
      break;
    default:
      valueInFull =
        (integerNumber
          ? billionsInFull + millionsInFull + thousandsInFull + hundredsInFull
          : 'zero') +
        UScurrency +
        centsInFull;
      valueInFull = cutDoubleSpace(valueInFull);
  }

  const capitalizedValueInFull = capitalizeFirstLetter(valueInFull).trim();

  return capitalizedValueInFull;
}

// Escreve por extenso números menores que 1000 em EN-US
function classesInFullUS(number) {
  const lessThanTwenty = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];

  const tensAfterTwenty = [
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  let numberInFull = '';
  let { unitsPart, tensPart, hundredsPart } = splitNumber(number);

  const hundredsPartInFull = lessThanTwenty[hundredsPart];
  const tensPartInFull =
    tensPart > 1
      ? tensAfterTwenty[tensPart - 1]
      : tensPart == 1
      ? lessThanTwenty[unitsPart + 10]
      : '';
  const unitsPartInFull = lessThanTwenty[unitsPart];

  numberInFull =
    hundredsPartInFull +
    (hundredsPart == 0 ? '' : ' hundred ') +
    tensPartInFull +
    (unitsPart == 0 ? '' : tensPart > 1 ? '-' : '') +
    (tensPart > 1 || tensPart == 0 ? unitsPartInFull : '');

  return numberInFull;
}

export { numberInFullConverterUS };
