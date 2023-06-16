const express = require('express');
const cors = require('cors');
const score = require('./score.js');

const PORT = process.env.PORT || 9091;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/score", score);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});