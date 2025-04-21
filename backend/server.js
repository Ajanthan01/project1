const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/check', async (req, res) => {
  const url = req.query.url;

  try {
    const response = await axios.get(url);
    res.json({ message: `Website is UP! Status: ${response.status}` });
  } catch (error) {
    res.json({ message: `Website is DOWN! Error: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
