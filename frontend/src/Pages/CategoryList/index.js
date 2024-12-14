import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import "./style.css";

const CategoriesList = () => {
  const navigate = useNavigate();
  const {
    setMsg,
    token,
    setSelectedFilter,
    isLoading,
    setIsLoading,
    isDarkMode,
  } = useContext(AppContext);

  const [categories, setCategories] = useState([]);
  const [brandCategories, setBrandCategories] = useState([]);
  const [typeCategories, setTypeCategories] = useState([]);
  const [seasonCategories, setSeasonCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://meraki-academy-project-4-lgda.onrender.com/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const mainCategories = [
          "Premier League",
          "Serie A",
          "La Liga",
          "Bundesliga",
        ];
        const filteredCategories = res.data.category.filter((category) =>
          mainCategories.includes(category.name)
        );

        setCategories(filteredCategories);

        const brandCategoriesList = [
          "Nike",
          "Adidas",
          "Puma",
          "New Balance",
          "Kappa",
        ];
        const filteredBrands = res.data.category.filter((category) =>
          brandCategoriesList.includes(category.name)
        );

        setBrandCategories(filteredBrands);

        const typeCategoriesList = ["Home", "Away", "Third", "GK Home"];
        const filteredTypes = res.data.category.filter((category) =>
          typeCategoriesList.includes(category.name)
        );

        setTypeCategories(filteredTypes);

        const seasonCategoriesList = ["24-25", "23-24", "22-23"];
        const filteredSeasons = res.data.category.filter((category) =>
          seasonCategoriesList.includes(category.name)
        );

        setSeasonCategories(filteredSeasons);
      } catch (err) {
        setMsg(err.response?.data?.message || "Error fetching categories");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  const handleCardClick = (categoryName) => {
    setSelectedFilter(categoryName);
    navigate("/products");
  };

  const handleAllKitsClick = () => {
    setSelectedFilter("");
    navigate("/products");
  };

  const handleLeagueCardClick = (categoryName, categoryId) => {
    setSelectedFilter(categoryName);
    navigate(`/categories/${categoryId}`);
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div
      className={`categories-list__container mt-4 ${
        isDarkMode ? "dark-mode" : ""
      }`}
    >
      <h2
        className={`categories-list__title mt-4 ${
          isDarkMode ? "dark-mode" : ""
        }`}
      >
        All Products
      </h2>
      <Card
        className={`categories-list__category-card h-100 text-center mb-4 ${
          isDarkMode ? "dark-mode" : ""
        }`}
        onClick={handleAllKitsClick}
      >
        <Card.Body>
          <Card.Title
            className={`categories-list__category-title mb-2 ${
              isDarkMode ? "dark-mode" : ""
            }`}
          >
            View All Kits
          </Card.Title>
        </Card.Body>
      </Card>

      <h2
        className={`categories-list__title mt-4 ${
          isDarkMode ? "dark-mode" : ""
        }`}
      >
        Leagues
      </h2>
      <div className="row">
        {categories.length > 0 ? (
          categories.map((mainCategory) => (
            <div key={mainCategory.id} className="col-md-6 mb-4">
              <Card
                className={`categories-list__category-card h-100 text-center ${
                  isDarkMode ? "dark-mode" : ""
                }`}
              >
                <Card.Body
                  onClick={() =>
                    handleLeagueCardClick(mainCategory.name, mainCategory._id)
                  }
                >
                  <Card.Title
                    className={`categories-list__category-title mb-2 ${
                      isDarkMode ? "dark-mode" : ""
                    }`}
                  >
                    {mainCategory.name}
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    src={mainCategory.imageURL}
                    alt={mainCategory.name}
                    className="categories-list__category-image small-logo"
                  />
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No league categories found</p>
        )}
      </div>

      <h2 className={`categories-list__title ${isDarkMode ? "dark-mode" : ""}`}>
        Brands
      </h2>
      <div className="row">
        {brandCategories.length > 0 ? (
          brandCategories.map((brandCategory) => (
            <div key={brandCategory.id} className="col-md-6 mb-4">
              <Card
                className={`categories-list__category-card h-100 text-center ${
                  isDarkMode ? "dark-mode" : ""
                }`}
              >
                <Card.Body onClick={() => handleCardClick(brandCategory.name)}>
                  <Card.Title
                    className={`categories-list__category-title mb-2 ${
                      isDarkMode ? "dark-mode" : ""
                    }`}
                  >
                    {brandCategory.name}
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    src={brandCategory.imageURL}
                    alt={brandCategory.name}
                    className="categories-list__category-image small-logo"
                  />
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No brand categories found</p>
        )}
      </div>

      <h2 className={`categories-list__title ${isDarkMode ? "dark-mode" : ""}`}>
        Types
      </h2>
      <div className="row">
        {typeCategories.length > 0 ? (
          typeCategories.map((typeCategory) => (
            <div key={typeCategory.id} className="col-md-6 mb-4">
              <Card
                className={`categories-list__category-card h-100 text-center ${
                  isDarkMode ? "dark-mode" : ""
                }`}
              >
                <Card.Body onClick={() => handleCardClick(typeCategory.name)}>
                  <Card.Title
                    className={`categories-list__category-title mb-2 ${
                      isDarkMode ? "dark-mode" : ""
                    }`}
                  >
                    {typeCategory.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No type categories found</p>
        )}
      </div>

      <h2 className={`categories-list__title ${isDarkMode ? "dark-mode" : ""}`}>
        Seasons
      </h2>
      <div className="row">
        {seasonCategories.length > 0 ? (
          seasonCategories.map((seasonCategory) => (
            <div key={seasonCategory.id} className="col-md-6 mb-4">
              <Card
                className={`categories-list__category-card h-100 text-center ${
                  isDarkMode ? "dark-mode" : ""
                }`}
              >
                <Card.Body onClick={() => handleCardClick(seasonCategory.name)}>
                  <Card.Title
                    className={`categories-list__category-title mb-2 ${
                      isDarkMode ? "dark-mode" : ""
                    }`}
                  >
                    {seasonCategory.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No season categories found</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
