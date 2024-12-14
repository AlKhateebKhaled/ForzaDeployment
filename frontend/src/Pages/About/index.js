import React, { useContext, useEffect } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../../App";

const AboutPage = () => {
  const { setIsLoading, isDarkMode } = useContext(AppContext);
  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    fetchData();

    return () => {
      setIsLoading(false);
    };
  }, [setIsLoading]);

  return (
    <div className={`about container mt-5 ${isDarkMode ? 'dark' : ''}`}>
      <div className="row">
        <div className="col text-center mb-4">
          <h2 className="display-4">About Us</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <p className="lead text-center">
            Welcome to Football Shirts, your premier destination for the latest
            and greatest football club shirts! We are passionate about football
            and committed to bringing you the best merchandise from your
            favorite teams.
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-10 mx-auto">
          <h3 className="mb-3">Our Mission</h3>
          <p>
            At Football Shirts, our mission is to provide fans with high-quality
            shirts that celebrate their favorite clubs. We believe in delivering
            not just products, but an experience that connects fans to their
            teams and enhances their passion for the game.
          </p>

          <h3 className="mt-4 mb-3">Why Choose Us?</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Quality Products:</strong> We source only the best
              materials to ensure that our shirts are comfortable, durable, and
              stylish.
            </li>
            <li className="list-group-item">
              <strong>Wide Selection:</strong> From home jerseys to away kits,
              we offer a variety of options for every fan.
            </li>
            <li className="list-group-item">
              <strong>Excellent Customer Service:</strong> Our dedicated team is
              here to assist you with any questions or concerns you may have.
            </li>
            <li className="list-group-item">
              <strong>Fast Shipping:</strong> We ensure that your orders are
              processed quickly and delivered to your doorstep without delay.
            </li>
          </ul>

          <h3 className="mt-5 mb-3">Join Our Community</h3>
          <p>
            Connect with us on social media and join our community of football
            enthusiasts. Share your love for the game and stay updated on our
            latest arrivals and promotions!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
