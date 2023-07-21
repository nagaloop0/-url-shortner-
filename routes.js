const express = require('express');
const router = express.Router();
const shortUrlController = require('./controllers/shortUrlController');

// Route for Method 1: Shorten Url
router.post('/shorten', async (req, res) => {
  const { destinationUrl, expirationDate } = req.body;
  try {
    const shortUrl = await shortUrlController.shortenUrl(
      destinationUrl,
      expirationDate
    );
    res.json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

// Route for Method 2: Update short url
router.put('/update', async (req, res) => {
  const { shortId, destinationUrl } = req.body;
  try {
    const success = await shortUrlController.updateShortUrl(
      shortId,
      destinationUrl
    );
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update short URL' });
  }
});

// Route for Method 3: Get Destination Url
router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  try {
    const destinationUrl = await shortUrlController.getDestinationUrl(shortId);
    if (destinationUrl) {
      res.redirect(destinationUrl);
    } else {
      res.status(404).json({ error: 'URL not found or expired' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve destination URL' });
  }
});

// Route for Method 4: Update Expiry
router.put('/updateexpiry', async (req, res) => {
  const { shortId, daysToAdd } = req.body;
  try {
    const success = await shortUrlController.updateExpiry(shortId, daysToAdd);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update URL expiry' });
  }
});

module.exports = router;
