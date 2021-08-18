# number-in-full-multilang

A lib to convert a number, that represents a value in Brazilian, American or Spanish currency, into the value in full in these countries languages(PT-BR, EN-US, ES-ES, respectively). Each one will be converted according to their respective currency: real (BRL), dollar (USD) and euro (EUR). For instance, if you choose portuguese (pt) in the function, you will obtain the number you insert written in full as a BRL value.

## Prerequisites

To run this project, you will need to have Git and Node installed in your machine.

## Installing

```
npm install number-in-full-multilang
```

The lib uses ES6 module. So, in order to use it, after installation, some configurations are required.

- **Node:** <br />

<p>Add</p>

```
"type": "module"
```

to the package.json file of your node project.</br>

- **HTML + JavaScript project:** <br />

<p>In the end of the body of the HTML document add</p>

```
<script type="module" src="./RELATIVE_PATH_TO_SCRIPT/SCRIPT_NAME.js"></script>
```

And, in your script file:

```
import { numberInFullConverter } from '../node_modules/number-in-full-multilang/index.js';
```

## Usage

```
import { numberInFullConverter } from 'number-in-full-multilang';

// numberInFullConverter(number, 'languageCode')

numberInFullConverter(01.10, 'en') // One dollar and ten cents
numberInFullConverter(01.10, 'es') // Un euro con diez céntimos
numberInFullConverter(01.10, 'pt') // Um real e dez centavos
```

## Options

| Language            | Currency | LanguageCode |
| ------------------- | -------- | ------------ |
| Portuguese (Brazil) | Real     | 'pt'         |
| English (USA)       | Dollar   | 'en'         |
| Spanish (Spain)     | Euro     | 'es'         |

### Separator (decimal point)

If you need to insert the number directly in your code, use '.' as decimal point (JavaScript requirement). But, if the number will be provided by the user in the frontend of an app, for instance, the function accepts '.' and ',' (used in some countries like Brazil) as separator.

## Built with

- JavaScript/Node

## Contributing

Did you find a bug? Would you like to add new languages? Do you have feedbacks? Contact me, submit a PR. All contributions are welcome!

## Author

Rubens Mario

## License

This code is licensed under the MIT license for Rubens Mario Moreira da Costa Filho.
