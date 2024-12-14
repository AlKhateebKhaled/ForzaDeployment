import React, { useContext, useEffect } from "react";
import "./style.css";
import { AppContext } from "../../App";

const PrivacyPolicy = () => {
  const { setIsLoading, isDarkMode, toggleDarkMode } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    fetchData();
  }, [setIsLoading]);

  return (
    <div className={`privacy-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
  
      <h1>Privacy Policy</h1>
      <p>
        <strong>Effective Date: [18 Oct. 2024]</strong>
      </p>

      <h2>1. Information Collection</h2>
      <p>
        We collect the following types of information: <br />-{" "}
        <strong>Personal Information:</strong> Such as your name, email address,
        phone number, and shipping address when you create an account or make a
        purchase. <br />- <strong>Usage Data:</strong> Information about how you
        use our website, including your IP address, browser type, and page
        views.
      </p>

      <h2>2. Use of Information</h2>
      <p>
        We may use your information for the following purposes: <br />
        - To provide and maintain our services <br />
        - To notify you about changes to our services <br />
        - To provide customer support <br />- To gather analysis or valuable
        information to improve our services.
      </p>

      <h2>3. Information Sharing</h2>
      <p>
        We do not sell or rent your personal information to third parties. We
        may share your information with service providers or as required by law.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We implement a variety of security measures to protect your personal
        information from unauthorized access. However, no method of transmission
        over the Internet is completely secure.
      </p>

      <h2>5. User Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal
        information, object to or restrict the processing of your information,
        and withdraw your consent at any time.
      </p>

      <h2>6. Cookies and Tracking Technologies</h2>
      <p>
        We use cookies to monitor activity on our website. You can instruct your
        browser to refuse all cookies or to indicate when a cookie is being
        sent.
      </p>

      <h2>7. Children’s Privacy</h2>
      <p>
        Our services are not intended for children under the age of 13. We do
        not knowingly collect personally identifiable information from anyone
        under the age of 13.
      </p>

      <h2>8. Changes to the Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time and will notify you
        of any changes by posting the new policy on this page.
      </p>

      <h2>9. Contact Information</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at: <br />
        Email:{" "}
        <a href="mailto:khaled.hkhateeb@gmale.com">
          khaled.hkhateeb@gmale.com
        </a>{" "}
        <br />
        Address: Shoumer Street, Zarqa, Jordan
      </p>
    </div>
  );
};

export default PrivacyPolicy;
