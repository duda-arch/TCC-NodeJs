import { numberInFullConverterBR } from './writers/writeNumberInFullBR.js';
import { numberInFullConverterUS } from './writers/writeNumberInFullUS.js';
import { numberInFullConverterES } from './writers/writeNumberInFullES.js';

// Escreve valores monetários por extenso em PT-BR, EN-US e ES-ES
// languageCode: pt, en, es
function numberInFullConverter(number, languageCode) {
  let numberInFull = '';

  switch (languageCode) {
    case 'pt':
      numberInFull = numberInFullConverterBR(number);
      break;
    case 'en':
      numberInFull = numberInFullConverterUS(number);
      break;
    case 'es':
      numberInFull = numberInFullConverterES(number);
      break;
    default:
      numberInFull = 'Verify your input';
  }

  return numberInFull;
}

export { numberInFullConverter };
