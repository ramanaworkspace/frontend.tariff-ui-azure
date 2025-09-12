const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'dist/tariff-calculation-ui/browser')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/tariff-calculation-ui/browser/index.html'));
});
app.listen(port, () => console.log(`Running on port ${port}`));
