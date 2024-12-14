import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { AppContext } from "../../App";
import "./style.css";

const SubcategoryPage = () => {
  const { msg, setMsg, token, selectedFilter, setSelectedFilter } =
    useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchSubcategories = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://meraki-academy-project-4-lgda.onrender.com/categories/${id}`);
        const fetchedCategoryName = res.data.category.name;
        setSubcategories(res.data.category.subCategories);
        setCategoryName(fetchedCategoryName);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setMsg("Failed to load subcategories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubcategories();
  }, [id]);



  const handleSubcategoryClick = (subcategoryName) => {
    setSelectedFilter(subcategoryName);
    navigate(`/products`);
  };

  return (
    <div className="container mt-4">
     <div className="d-flex justify-content-center mb-4">
      <button className="categories-list__back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
      <h2>{categoryName}</h2>
      <div className="row">
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <div key={subcategory.id} className="col-md-6 mb-4">
              <Card
                className="category-card h-100 text-center"
                onClick={() => handleSubcategoryClick(subcategory.name)}
              >
                <Card.Body>
                  <Card.Title>{subcategory.name}</Card.Title>
                  <Card.Img
                    variant="top"
                    src={subcategory.imageURL}
                    alt={subcategory.name}
                    className="category-image"
                  />
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No subcategories found</p>
        )}
      </div>
    </div>
  );
};

export default SubcategoryPage;
