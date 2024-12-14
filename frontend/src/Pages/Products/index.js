import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    team: "",
    league: "",
    brand: "",
    season: "",
    type: "",
    maxPrice: "",
  });

  const { setShownProducts, selectedFilter, setIsLoading, isDarkMode } =
    useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://meraki-academy-project-4-lgda.onrender.com/products");
        let productsToSet = res.data.product;

        const filteredProducts = productsToSet.filter((product) => {
          const teamMatch = filters.team
            ? product.team.toLowerCase().includes(filters.team.toLowerCase())
            : true;
          const leagueMatch = filters.league
            ? product.League === filters.league
            : true;
          const brandMatch = filters.brand
            ? product.Brand === filters.brand
            : true;
          const seasonMatch = filters.season
            ? product.Season === filters.season
            : true;
          const typeMatch = filters.type ? product.Type === filters.type : true;
          const priceMatch = filters.maxPrice
            ? product.price <= parseFloat(filters.maxPrice)
            : true;

          const selectedFilterMatch = selectedFilter
            ? [
                product.team,
                product.League,
                product.Brand,
                product.Season,
                product.Type,
              ]
                .map((field) => field?.toLowerCase())
                .includes(selectedFilter.toLowerCase())
            : true;

          return (
            teamMatch &&
            leagueMatch &&
            brandMatch &&
            seasonMatch &&
            typeMatch &&
            priceMatch &&
            selectedFilterMatch
          );
        });

        setProducts(filteredProducts);
        setShownProducts(filteredProducts.length);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filters, selectedFilter]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      team: e.target.value,
    }));
  };

  return (
    <div className={`container ${isDarkMode ? "dark-mode" : ""}`}>
      <h2>Products</h2>
      <div
        className="search-section mb-4"
        style={{
          backgroundColor: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
        }}
      >
        <h5 style={{ color: isDarkMode ? "#fff" : "#000" }}>Search</h5>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              name="team"
              className={`form-control`}
              placeholder="Search by Team"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                backgroundColor: isDarkMode ? "#555" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
                border: `1px solid ${isDarkMode ? "#666" : "#ccc"}`,
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="filter-section mb-4"
        style={{
          backgroundColor: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
        }}
      >
        <h5 style={{ color: isDarkMode ? "#fff" : "#000" }}>Filters</h5>
        <div className="row">
          <div className="col-md-2">
            <select
              name="league"
              className="form-select"
              onChange={handleFilterChange}
              style={{
                backgroundColor: isDarkMode ? "#555" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
                border: `1px solid ${isDarkMode ? "#666" : "#ccc"}`,
              }}
            >
              <option value="">Select League</option>
              <option value="Premier League">Premier League</option>
              <option value="Serie A">Serie A</option>
              <option value="La Liga">La Liga</option>
              <option value="Bundesliga">Bundesliga</option>
            </select>
          </div>

          <div className="col-md-2">
            <select
              name="brand"
              className="form-select"
              onChange={handleFilterChange}
              style={{
                backgroundColor: isDarkMode ? "#555" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
                border: `1px solid ${isDarkMode ? "#666" : "#ccc"}`,
              }}
            >
              <option value="">Select Brand</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Puma">Puma</option>
              <option value="New Balance">New Balance</option>
              <option value="Kappa">Kappa</option>
            </select>
          </div>

          <div className="col-md-2">
            <select
              name="season"
              className="form-select"
              onChange={handleFilterChange}
              style={{
                backgroundColor: isDarkMode ? "#555" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
                border: `1px solid ${isDarkMode ? "#666" : "#ccc"}`,
              }}
            >
              <option value="">Select Season</option>
              <option value="22-23">22-23</option>
              <option value="23-24">23-24</option>
              <option value="24-25">24-25</option>
            </select>
          </div>

          <div className="col-md-2">
            <select
              name="type"
              className="form-select"
              onChange={handleFilterChange}
              style={{
                backgroundColor: isDarkMode ? "#555" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
                border: `1px solid ${isDarkMode ? "#666" : "#ccc"}`,
              }}
            >
              <option value="">Select Type</option>
              <option value="Home">Home</option>
              <option value="Away">Away</option>
              <option value="Third">Third</option>
              <option value="GK Home">GK</option>
            </select>
          </div>

          <div className="col-md-2">
            <input
              type="number"
              name="maxPrice"
              className={`form-control`}
              placeholder="Max Price"
              onChange={handleFilterChange}
              style={{
                backgroundColor: isDarkMode ? "#555" : "#fff",
                color: isDarkMode ? "#fff" : "#000",
                border: `1px solid ${isDarkMode ? "#666" : "#ccc"}`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <button
          className="categories-list__back-button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      <div>
        <div className="product-count">
          Showing{" "}
          <strong className="product-count__number">{products.length}</strong>{" "}
          Kits.
        </div>
        {selectedFilter && (
          <div className="filter-message">
            These Kits are filtered by:{" "}
            <strong className="filter-message__text">{selectedFilter}</strong>
          </div>
        )}
      </div>

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
