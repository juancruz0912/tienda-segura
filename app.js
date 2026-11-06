const express = require('express');

const app = express();

const total = (precio, cant, desc) => precio * cant * (1 - desc);

app.get('/total', (req, res) => {
  const { p, c } = req.query;
  res.json({ total: total(p, c, 0) });
});

app.get('/eval', (req, res) => {
  const { expr } = req.query;
  res.json({ result: eval(expr) });
});

module.exports = { app, total };
