const
  rollup = require('rollup').rollup,
  babel = require('rollup-plugin-babel'),
  uglify = require('rollup-plugin-uglify'),
  del = require('del'),
  pkg = require('./package.json'),
  fs = require('fs');

[
  { format: 'iife', sourceMap: 'inline', moduleName: 'UJS' },
  { format: 'iife', sourceMap: 'inline', moduleName: 'UJS', suffix: '.min', min: true },
  { format: 'cjs', suffix: '.cjs' },
  { format: 'es', suffix: '.es' }
].reduce(function(promise, bundle) {
  var compileConf = {
    entry: 'src/ujs.js',
    external: Object.keys(pkg.dependencies),
    plugins: []
  }

  if(bundle.format !== 'es') compileConf.plugins.push(babel({ externalHelpers: true, presets: ['es2015-rollup'] }));
  if(bundle.min) compileConf.plugins.push(uglify());

  var writeConf = { dest: `./dist/ujs${ bundle.suffix || '' }.js` };
  if(bundle.sourceMap) writeConf.sourceMap = bundle.sourceMap;
  if(bundle.format) writeConf.format = bundle.format;
  if(bundle.moduleName) writeConf.moduleName = bundle.moduleName;

  return promise.then(() => rollup(compileConf)).then(bundle => bundle.write(writeConf))
}, del(['./dist/*']))

.then(function() {
  delete pkg.private;
  delete pkg.devDependencies;
  delete pkg.scripts;
  fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
  fs.writeFileSync('dist/LICENSE.txt', fs.readFileSync('LICENSE.txt', 'utf-8'), 'utf-8');
  fs.writeFileSync('dist/README.md', fs.readFileSync('README.md', 'utf-8'), 'utf-8');
})

.catch(err => console.error(err.stack));
