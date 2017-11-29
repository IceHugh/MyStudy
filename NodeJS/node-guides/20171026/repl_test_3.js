const repl = require('repl');
const Translator = require('translator');
const translator = new Translator('./app/lang');
translator.language = 'en';
function myEval(cmd, context, filename, callback) {
  callback(null, translator.translate(cmd));
}

repl.start({ prompt: '> ', eval: myEval });