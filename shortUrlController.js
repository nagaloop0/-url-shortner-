const ShortUrl = require('../models/shortUrl');

// Method 1: Shorten Url
async function shortenUrl(destinationUrl, expirationDate) {
  try {
    const shortId = generateUniqueShortId(); // Implement the function to generate a unique short ID
    const shortUrl = new ShortUrl({
      shortId,
      destinationUrl,
      expirationDate,
    });
    await shortUrl.save();
    return `www.ppa.in/${shortId}`;
  } catch (error) {
    console.error('Error in shortenUrl:', error);
    throw new Error('Error while shortening URL');
  }
}

// Method 2: Update short url
async function updateShortUrl(shortId, destinationUrl) {
  try {
    const updatedUrl = await ShortUrl.findOneAndUpdate(
      { shortId },
      { destinationUrl },
      { new: true }
    );
    return !!updatedUrl;
  } catch (error) {
    console.error('Error in updateShortUrl:', error);
    throw new Error('Error while updating short URL');
  }
}

// Method 3: Get Destination Url
async function getDestinationUrl(shortId) {
  try {
    const shortUrl = await ShortUrl.findOne({ shortId });
    if (shortUrl && shortUrl.expirationDate > Date.now()) {
      return shortUrl.destinationUrl;
    }
    return null;
  } catch (error) {
    console.error('Error in getDestinationUrl:', error);
    throw new Error('Error while retrieving destination URL');
  }
}

// Method 4: Update Expiry
async function updateExpiry(shortId, daysToAdd) {
  try {
    const shortUrl = await ShortUrl.findOne({ shortId });
    if (shortUrl) {
      shortUrl.expirationDate = new Date(
        shortUrl.expirationDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
      );
      await shortUrl.save();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error in updateExpiry:', error);
    throw new Error('Error while updating URL expiry');
  }
}

module.exports = {
  shortenUrl,
  updateShortUrl,
  getDestinationUrl,
  updateExpiry,
};
