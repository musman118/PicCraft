import Jimp from "jimp";

Jimp.read("./path/to/image.jpg")
  .then((image) => {
    // Do stuff with the image.
  })
  .catch((err) => {
    // Handle an exception.
  });

