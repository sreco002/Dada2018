var PythonShell = require('python-shell');

PythonShell.run('HelloDada.py', function (err) {
  if (err) throw err;
  console.log('hello Dada I am Pythoning ;)');
});
