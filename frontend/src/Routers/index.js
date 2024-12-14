import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import About from "../Pages/About";
import FAQ from "../Pages/FAQ";
import Contact from "../Pages/Contact";
import NotFound from "../Pages/NotFound";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import CategoriesList from "../Pages/CategoryList";
import Products from "../Pages/Products";
import ProductDetails from "../Pages/ProductDetails";
import SubcategoryPage from "../Pages/SubcategoryPage.js/index.js";
import WishList from "../Pages/WishList/index.js";
import Cart from "../Pages/Cart/index.js";
import Search from "../Pages/Search/index.js";
import ProfilePage from "../Pages/ProfilePage/index.js";
import TermsOfService from "../Pages/Tesrms/index.js";
import PrivacyPolicy from "../Pages/Privacy/index.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "faq", element: <FAQ /> },
      { path: "contact", element: <Contact /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "categories", element: <CategoriesList /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "categories/:id", element: <SubcategoryPage /> },
      { path: "wishlist", element: <WishList /> },
      { path: "cart", element: <Cart /> },
      { path: "search", element: <Search /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "terms", element: <TermsOfService /> },
      { path: "privacy", element: <PrivacyPolicy /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
