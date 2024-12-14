import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { AppContext } from "../../App";
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { setIsLoading } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    fetchData();
  }, [setIsLoading]);

  const questionsAnswers = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all unused and undamaged items. If you are not satisfied with your purchase, please contact our support team for a return label.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to select countries. Please refer to our shipping policy for more details.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive an email with a tracking number and a link to track your shipment in real-time.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including Visa, MasterCard, PayPal, and Apple Pay.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {questionsAnswers.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => toggleFAQ(index)}
        >
          <div className="faq-question">
            {item.question}
            <span className="faq-icon">
              {activeIndex === index ? "-" : "+"}
            </span>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
