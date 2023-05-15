const runCliCommand = require('./runCliCommand');

try {
  runCliCommand('db:migrate');
} catch (ex) {
  console.error(__filename, 'Error:', ex);
}
