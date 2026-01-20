// Express backend for YouTube trailer search
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.get('/api/trailer', async (req, res) => {
  const { title } = req.query;
  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          q: `${title} official trailer`,
          key: YOUTUBE_API_KEY,
          maxResults: 1,
          type: 'video',
        },
      }
    );
    const videoId = response.data.items[0]?.id?.videoId;
    res.json({ videoId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trailer' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
