const express = require('express');
const db = require('./conn.js');

const router = express.Router();

// Registrar um novo resultado
router.post("/", async (req, res) => {
    // seu código aqui
});


// Pegar os 10 melhores resultados
router.get("/", async (req, res) => {
    // seu código aqui
});

module.exports = router;
