const runCliCommand = require('./runCliCommand');

try {
  runCliCommand('db:migrate:undo');
} catch (ex) {
  console.error(__line, __filename, 'Error:', ex);
}
