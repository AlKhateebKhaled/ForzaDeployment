const mongoose = require("mongoose");
const Product = require("./models/productSchema"); 
const DB_URI = "mongodb://localhost:27017/MERAKI";

const products = [
  {
    team: "Liverpool",
    description:
      "The Liverpool 2022-23 home kit features a classic red design with gold accents.",
    Season: "22-23",
    Type: "Home",
    Brand: "Nike",
    League: "Premier League",
    price: 85,
    stock: 100,
    categoryID: ["6702bc927d6fa9121dcc3a3a", "6702bad57d6fa9121dcc3a28"],
    imageURL:
      "https://cdn.footballkitarchive.com/2022/07/20/liverpool-2022-23-home.jpg",
  },
  {
    team: "Liverpool",
    description:
      "The Liverpool 2022-23 away kit showcases a stylish white design with subtle patterns.",
    Season: "22-23",
    Type: "Away",
    Brand: "Nike",
    League: "Premier League",
    price: 80,
    stock: 100,
    categoryID: ["6702bc927d6fa9121dcc3a3a", "6702bad57d6fa9121dcc3a28"],
    imageURL:
      "https://cdn.footballkitarchive.com/2022/07/20/liverpool-2022-23-away.jpg",
  },
  {
    team: "Liverpool",
    description:
      "The Liverpool 2022-23 third kit offers a modern look with a unique color palette.",
    Season: "22-23",
    Type: "Third",
    Brand: "Nike",
    League: "Premier League",
    price: 75,
    stock: 100,
    categoryID: ["6702bc927d6fa9121dcc3a3a", "6702bad57d6fa9121dcc3a28"],
    imageURL:
      "https://cdn.footballkitarchive.com/2022/07/20/liverpool-2022-23-third.jpg",
  },
  {
    team: "Liverpool",
    description:
      "The Liverpool 2023-24 home kit features a striking red design with a modern twist.",
    Season: "23-24",
    Type: "Home",
    Brand: "Nike",
    League: "Premier League",
    price: 85,
    stock: 100,
    categoryID: ["6702bc927d6fa9121dcc3a3a", "6702bad57d6fa9121dcc3a28"],
    imageURL:
      "https://cdn.footballkitarchive.com/2023/07/20/liverpool-2023-24-home.jpg",
  },
  {
    team: "Liverpool",
    description:
      "The Liverpool 2023-24 away kit offers a bold and stylish look with intricate details.",
    Season: "23-24",
    Type: "Away",
    Brand: "Nike",
    League: "Premier League",
    price: 80,
    stock: 100,
    categoryID: ["6702bc927d6fa9121dcc3a3a", "6702bad57d6fa9121dcc3a28"],
    imageURL:
      "https://cdn.footballkitarchive.com/2023/07/20/liverpool-2023-24-away.jpg",
  },
  {
    team: "Liverpool",
    description:
      "The Liverpool 2023-24 third kit features a vibrant design that stands out on the pitch.",
    Season: "23-24",
    Type: "Third",
    Brand: "Nike",
    League: "Premier League",
    price: 75,
    stock: 100,
    categoryID: ["6702bc927d6fa9121dcc3a3a", "6702bad57d6fa9121dcc3a28"],
    imageURL:
      "https://cdn.footballkitarchive.com/2023/07/20/liverpool-2023-24-third.jpg",
  },
  {
    team: "Liverpool",
    description:
      "The Liverpool 2024-25 home kit combines tradition with modern design elements.",
    Season: "24-25",
    Type: "Home",
    Brand: "Nike",
    League: "Premier League",
    price: 85,
    stock: 100,
    categoryID: ["6702bc927d6fa9121dcc3a3a", "6702bad57d6fa9121dcc3a28"],
    imageURL:
      "https://cdn.footballkitarchive.com/2024/07/20/liverpool-2024-25-home.jpg",
  },
  {
    team: "Liverpool",
    description:
      "The Liverpool 2024-25 away kit showcases a fresh design with contemporary styling.",
    Season: "24-25",
    Type: "Away",
    Brand: "Nike",
    League: "Premier League",
    price: 80,
    stock: 100,
    categoryID: ["6702bc927d6fa9121dcc3a3a", "6702bad57d6fa9121dcc3a28"],
    imageURL:
      "https://cdn.footballkitarchive.com/2024/07/20/liverpool-2024-25-away.jpg",
  },
  {
    team: "Liverpool",
    description:
      "The Liverpool 2024-25 third kit offers a unique color scheme with modern aesthetics.",
    Season: "24-25",
    Type: "Third",
    Brand: "Nike",
    League: "Premier League",
    price: 75,
    stock: 100,
    categoryID: ["6702bc927d6fa9121dcc3a3a", "6702bad57d6fa9121dcc3a28"],
    imageURL:
      "https://cdn.footballkitarchive.com/2024/07/20/liverpool-2024-25-third.jpg",
  },
];

async function addProducts() {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.insertMany(products);

    console.log("Products added successfully!");
  } catch (error) {
    console.error("Error adding products:", error);
  } finally {
    await mongoose.disconnect();
  }
}

addProducts();
