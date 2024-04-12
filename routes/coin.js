const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Working from Coin");
});

router.get("/:coinName", async (req, res) => {
  try {
    const coinName = req.params.coinName;
    const coinData = await fetchCoin(coinName);
    const precio = coinData.data.priceUsd;
    res.send(`El precio en dólares de la moneda para el día de hoy es ${precio}`);
  } catch (error) {
    res.status(500).send(error.message );
  }
});

async function fetchCoin(coinName) {
  try {
      const url = `https://api.coincap.io/v2/assets/${coinName}`;
      const response = await fetch(url);
      const data = await response.json();

      if ("data" in data) {
          return data;
      } else {
          throw new Error("El nombre de la moneda no fue encontrado en la base de datos");
      }
  } catch (error) {
      console.error("Error fetching coin:", error);
      throw error;
  }
}

module.exports = router;