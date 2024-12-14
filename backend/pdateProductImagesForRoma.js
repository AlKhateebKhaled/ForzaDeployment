const mongoose = require('mongoose');
const Product = require('./models/productSchema'); // Adjust the path to your Product model
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration (use your own credentials)
cloudinary.config({
  cloud_name: 'drhborpt0',
  api_key: '793695168688557',
  api_secret: 'Ryzy28afKpGHARawaLVTm9W6KEE',
});

// Connect to your MongoDB
mongoose.connect('mongodb://localhost:27017/MERAKI', { useNewUrlParser: true, useUnifiedTopology: true });

// Update products for "Roma" with the correct image URL from Cloudinary
async function updateProductImagesForRoma() {
  try {
    // Fetch only products related to the team "Roma"
    const romaProducts = await Product.find({ team: 'Roma' });

    for (let product of romaProducts) {
      const searchQuery = `${product.team}_${product.Season}_${product.Type}`; // Search by team, season, and type

      // Fetch image details from Cloudinary using searchQuery
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: searchQuery, // This searches for images with this prefix
        max_results: 1,      // Limit to 1 result per search
      });

      if (result.resources.length > 0) {
        // Get the public ID of the first matching image
        const publicId = result.resources[0].public_id;

        // Construct the new image URL
        const newImageURL = cloudinary.url(publicId);

        // Update the product's imageURL in the database
        product.imageURL = newImageURL;
        await product.save();

        console.log(`Updated imageURL for ${product.team}: ${newImageURL}`);
      } else {
        console.log(`No image found for ${searchQuery}`);
      }
    }

    console.log('All Roma products updated successfully.');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error updating Roma product images:', err);
    mongoose.connection.close();
  }
}

// Call the function to update the images for Roma
updateProductImagesForRoma();
