app.get('/api/price', async (req, res) => {
  const symbol = req.query.symbol;

  const map = {
    BTCUSDT: 'bitcoin',
    ETHUSDT: 'ethereum',
  };

  const id = map[symbol];
  if (!id) return res.status(400).json({ error: 'Invalid symbol' });

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
    const data = await response.json();
    const price = data[id]?.usd;

    if (!price) return res.status(500).json({ error: 'No price from CoinGecko' });
    res.json({ price });
  } catch (err) {
    res.status(500).json({ error: 'CoinGecko fetch failed' });
  }
});
