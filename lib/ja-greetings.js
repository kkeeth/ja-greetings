import * as app from './app.js';

function run(yargs) {
  const argv = yargs.argv;

  const isExist = existCheck(argv);
  let key = convert(argv._[0]);

  // 'help' is top priority option
  if (argv.h) {
    showHelp(yargs);
  } else if (argv._.length >= 2) {
    showHelp(yargs, 'Error: Please input only one command\n');
  } else if (!isExist) {
    showHelp(yargs);
  } else {
    switch (key) {
      case 'all':
        greetAll(argv);
        break;
      default:
        greet(key, argv);
        break;
    }
  }
}

function greet(item, argv) {
  const greet = app.greet(item, argv);
  if (greet) console.log(greet);
}

function greetAll(argv) {
  const greetings = app.getGreetings();
  let greet = '';
  for (let key in greetings) {
    if (greetings[key] === 'all') continue;

    greet = app.greet(greetings[key], argv);
    if (greet) console.log(greet);
  }
}

function showHelp(yargs, text) {
  if (text) console.log(text);
  yargs.showHelp();
}

function existCheck(argv) {
  const greetings = app.getGreetings();
  const dialects = app.getDialects();
  const languages = app.getLanguages();
  const surrounds = app.getSurrounds();
  let isValid = false;

  // Check if the greeting command is valid
  for (let key in greetings) {
    if (greetings[key] === convert(argv._[0])) {
      isValid = true;
      break;
    }
  }

  // Validate each option independently
  if (argv.d && isValid) {
    isValid = dialects.includes(argv.d);
  }
  if (argv.l && isValid) {
    isValid = languages.includes(argv.l);
  }
  if (argv.s && isValid) {
    isValid = surrounds.includes(argv.s);
  }

  return isValid;
}

function convert(key) {
  const greetings = app.getGreetings();
  return greetings[key] || key;
}

export default {
  run: run,
};
