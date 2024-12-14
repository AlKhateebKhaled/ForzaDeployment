import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import React, { useContext } from "react";
import "./style.css";
import image1 from "../../assets/seasonKit.jpg";
import image2 from "../../assets/awaykit.jpg";
import image3 from "../../assets/thirdKit.jpg";
import Footer from "../../components/Footer";
import { AppContext } from "../../App";

const featuredProducts = [
  {
    id: 1,
    name: "Real Madrid Home Jersey 2024/25",
    price: "$89.99",
    description:
      "Show your support for Los Blancos with the iconic Home Jersey. Designed for comfort and style, it's perfect for game days and casual wear alike.",
    imageUrl:
      "https://res.cloudinary.com/drhborpt0/image/upload/v1729222777/GENERICO_mwokbi.webp",
    filter: "Real Madrid",
  },
  {
    id: 2,
    name: "Premier League Official Jerseys 2024/25",
    description:
      "Grab the latest Premier League jerseys and cheer for your favorite team in style. Made from high-quality materials for ultimate comfort.",
    imageUrl:
      "https://res.cloudinary.com/drhborpt0/image/upload/v1729223402/Screenshot_1_nyyt8a.png",

    filter: "Premier League",
  },
  {
    id: 3,
    name: "Adidas Official Kits 2024/25",
    description:
      "Experience the perfect blend of performance and style with the latest Adidas kits. Whether on the field or off, these kits are designed to make a statement.",
    imageUrl:
      "https://res.cloudinary.com/drhborpt0/image/upload/v1729222777/adidas_24-25_teamwear_kits_3_ya0pby.jpg",
    filter: "Adidas",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const { setSelectedFilter, isDarkMode } = useContext(AppContext);

  const handleShopNowButton = () => {
    navigate("/categories");
  };

  const goToAboutPage = () => {
    navigate("/about");
  };

  const goToContactPage = () => {
    navigate("/contact");
  };

  const goToFAQPage = () => {
    navigate("/faq");
  };

  return (
    <div
      className={
        isDarkMode ? "home-container dark-mode" : "home-container light-mode"
      }
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/drhborpt0/image/upload/v1729400272/Real_Madrid_2024_25__1_vjvlfs.jpg"
            alt="2024/25 Season Kit"
          />

          <Carousel.Caption>
            <h3>
              Explore the latest arrivals and show your support for your
              favorite teams!
            </h3>
            <Button
              className="Carousel_btn"
              onClick={handleShopNowButton}
            >
              Shop Now
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/drhborpt0/image/upload/v1729400271/Y_unuayz.jpg"
            alt="Away Jersey 2024/25"
          />
          <Carousel.Caption>
            <h3>Get the latest away kit to cheer on your team.</h3>
            <Button className="Carousel_btn" onClick={handleShopNowButton}>
              Shop Now
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image3}
            alt="Third Jersey 2024/25"
          />
          <Carousel.Caption>
            <h3>Unique third kit for the true fans.</h3>
            <Button className="Carousel_btn" onClick={handleShopNowButton}>
              Shop Now
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="home-container">

      <div className={isDarkMode ? "featured-products mt-5 dark-mode" : "featured-products mt-5 light-mode"}>
  <h2 className="text-center mb-4">Featured Products</h2>
  <div className="row justify-content-center">
    {featuredProducts.map((product) => (
      <div className="col-md-4 text-center mb-4" key={product.id}>
        <div className={isDarkMode ? "product-card p-3 dark-mode" : "product-card p-3 light-mode"}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
          <h5 className="product-title">{product.name}</h5>
          <p className="product-price">{product.price}</p>
          <p className="product-description">{product.description}</p>
          <Button
            className={isDarkMode ? "btn-orange dark-mode" : "btn-orange"}
            onClick={() => {
              setSelectedFilter(product.filter);
              navigate("/products");
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    ))}
  </div>
</div>
</div>

      <div className="home-container">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
