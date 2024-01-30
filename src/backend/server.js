// server.ts
const express = require('express');
const multer = require('multer');
const Jimp = require('jimp');
const path = require('path');

const app = express();
const port = 3001;

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Process the uploaded image using Jimp
    const imageBuffer = req.file.buffer;
    const image = await Jimp.read(imageBuffer);

    // Add your image processing logic here
    // For example, resizing the image to a fixed width
    image.resize(300, Jimp.AUTO);

    // Save the processed image
    const processedImagePath = path.join(__dirname, 'public', 'processed-image.jpg');
    await image.writeAsync(processedImagePath);

    // Provide the processed image URL for download
    res.json({ imageUrl: `/processed-image.jpg` });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
