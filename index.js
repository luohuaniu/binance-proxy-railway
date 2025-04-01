import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/price', async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol || (symbol !== 'BTCUSDT' && symbol !== 'ETHUSDT')) {
    return res.status(400).json({ error: 'Invalid symbol' });
  }

  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    const data = await response.json();
    res.json({ price: data.price });
  } catch (err) {
    res.status(500).json({ error: 'Binance fetch failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});
