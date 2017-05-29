const express = require('express');
const app = express();

app.use(express.static('demo', { extentions: ['html'] }));
app.use('/dist', express.static('dist'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
