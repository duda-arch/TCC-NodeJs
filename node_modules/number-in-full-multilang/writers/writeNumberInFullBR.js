import {
  separateNumberClasses,
  fractionalParteOf,
  splitNumber,
  fractionalPartCounter,
  capitalizeFirstLetter,
  cutDoubleSpace,
} from '../helpers/helpersFunctions.js';

function numberInFullConverterBR(number) {
  // Trocar vírgula por ponto
  const stringNumber = number.toString().replace(',', '.');
  // Recuperar valor numérico
  const numericValue = parseFloat(stringNumber);
  // Separar parte inteira
  const integerNumber = Math.trunc(numericValue);

  let valueInFull = '';

  const {
    hundredsClass,
    thousandsClass,
    millionsClass,
    billionsClass,
  } = separateNumberClasses(integerNumber);

  const oneBillion = 1000000000;
  const oneMillion = 1000000;
  const upperLimit = 999 * oneBillion;

  const cents = fractionalParteOf(numericValue);
  let centsLength = null;

  // Escrever por extenso cada classe do número
  const billionsInFull =
    classesInFullBR(billionsClass) +
    (billionsClass > 1 ? ' bilhões ' : billionsClass != 0 ? ' bilhão ' : '');

  const millionsInFull =
    classesInFullBR(millionsClass) +
    (millionsClass > 1 ? ' milhões ' : millionsClass != 0 ? ' milhão ' : '');

  const thousandsInFull =
    (thousandsClass == 1 ? '' : classesInFullBR(thousandsClass)) +
    (thousandsClass > 0 ? ' mil ' : '');

  const hundredsInFull = classesInFullBR(hundredsClass);

  const brazilCurrency =
    integerNumber &&
    (integerNumber % oneBillion == 0 || integerNumber % oneMillion == 0
      ? ' de reais'
      : integerNumber > 1
      ? ' reais'
      : ' real');

  const centsInFull =
    (cents == 0 ? '' : ' e ') +
    classesInFullBR(cents) +
    (cents > 1 ? ' centavos' : cents == 1 ? ' centavo' : '');

  /* Só se usa o conectivo 'e' antes de uma classes se:
     ela é a última classe não-nula, tiver um número múltiplo de 100
     ou menor que 100
     e as classes anteiores (à esquerda) não forem todas nulas */
  const biMiConnective =
    billionsClass &&
    millionsClass &&
    (millionsClass % 100 == 0 || millionsClass < 100) &&
    thousandsClass + hundredsClass == 0
      ? ' e '
      : '';
  const miThousConnective =
    (billionsClass || millionsClass) &&
    thousandsClass &&
    (thousandsClass % 100 == 0 || thousandsClass < 100) &&
    hundredsClass == 0
      ? ' e '
      : '';

  const thousHundConnective =
    hundredsClass &&
    billionsClass + millionsClass + thousandsClass &&
    (hundredsClass % 100 == 0 || hundredsClass < 100)
      ? ' e '
      : '';

  let caseSelect = null;

  // Caso o valor esteja acima do limite de 999bilhões, mostrar aviso ao usuário
  if (integerNumber >= upperLimit) caseSelect = 1;

  // Caso sejam usados mais que dois dígitos após a vírgula,
  // mostrar aviso ao usuário
  // evitando comportamento inadequado para o caso de R$ 0,100
  if (cents) centsLength = fractionalPartCounter(number);

  if (centsLength > 2) caseSelect = 2;

  // Caso o valor seja nulo, o resultado será Zero real
  // Isso evita o surgimento de valor "undefined" para os centavos
  if (!numericValue) caseSelect = 3;

  switch (caseSelect) {
    case 1:
      valueInFull = 'Valor maior que 999 bilhões';
      break;
    case 2:
      valueInFull = 'Os centavos devem ter no máximo dois dígitos';
      break;
    case 3:
      valueInFull = 'Zero real';
      break;
    default:
      valueInFull =
        (integerNumber
          ? billionsInFull +
            biMiConnective +
            millionsInFull +
            miThousConnective +
            thousandsInFull +
            thousHundConnective +
            hundredsInFull +
            brazilCurrency
          : 'Zero real ') + centsInFull;
      valueInFull = cutDoubleSpace(valueInFull);
  }

  const capitalizedValueInFull = capitalizeFirstLetter(valueInFull).trim();

  return capitalizedValueInFull;
}

// Escreve por extenso números menores que 1000 em português brasleiro
function classesInFullBR(number) {
  const lessThanTwenty = [
    '',
    'um',
    'dois',
    'três',
    'quatro',
    'cinco',
    'seis',
    'sete',
    'oito',
    'nove',
    'dez',
    'onze',
    'doze',
    'treze',
    'quatorze',
    'quinze',
    'dezesseis',
    'dezessete',
    'dezoito',
    'dezenove',
  ];

  const tensAfterTwenty = [
    '',
    'vinte',
    'trinta',
    'quarenta',
    'cinquenta',
    'sessenta',
    'setenta',
    'oitenta',
    'noventa',
  ];

  const hundreds = [
    '',
    'cento',
    'duzentos',
    'trezentos',
    'quatrocentos',
    'quinhentos',
    'seiscentos',
    'setecentos',
    'oitocentos',
    'novecentos',
  ];

  let numberInFull = '';
  let { unitsPart, tensPart, hundredsPart } = splitNumber(number);

  // Se o número for múltiplo de 100
  if (!(number % 100)) {
    number == 100
      ? (numberInFull = 'cem')
      : (numberInFull = hundreds[hundredsPart]);
  } else {
    numberInFull = `${
      hundreds[hundredsPart] + (hundredsPart === 0 ? '' : ' e')
    } ${
      tensPart > 1
        ? tensAfterTwenty[tensPart - 1] +
          (unitsPart === 0 ? ' ' : ' e ') +
          lessThanTwenty[unitsPart]
        : tensPart == 0
        ? lessThanTwenty[unitsPart]
        : lessThanTwenty[unitsPart + 10]
    }`;
  }

  return numberInFull;
}

export { numberInFullConverterBR };
