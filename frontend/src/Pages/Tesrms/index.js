import React, { useContext, useEffect } from "react";
import "./style.css";
import { AppContext } from "../../App";

const TermsOfService = () => {
  const { setIsLoading, isDarkMode } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    fetchData();
  }, [setIsLoading]);

  return (
    <div className={`terms-container ${isDarkMode ? "dark" : ""}`}>
      <h1>Terms of Service</h1>
      <p>
        <strong>Effective Date: [18 Oct. 2024]</strong>
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing our website, you confirm that you are at least 18 years old
        and agree to abide by these Terms. If you are using our services on
        behalf of an organization, you represent that you have the authority to
        bind that organization.
      </p>

      <h2>2. User Accounts</h2>
      <p>
        You may need to create an account to access certain features. You are
        responsible for maintaining the confidentiality of your account
        information and for all activities under your account. We reserve the
        right to suspend or terminate accounts for any violation of these Terms.
      </p>

      <h2>3. User Responsibilities</h2>
      <p>
        You agree not to use our services for any unlawful purposes or to engage
        in any conduct that restricts or inhibits any other user from using the
        website. Prohibited activities include but are not limited to
        harassment, spamming, and uploading harmful code.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        All content on this site is the property of [Your Website/App Name] or
        our licensors and is protected by copyright laws. You are granted a
        limited, non-exclusive license to use the site for personal,
        non-commercial use.
      </p>

      <h2>5. Dispute Resolution</h2>
      <p>
        Any disputes arising from these Terms will be governed by the laws of
        [Your State/Country]. You agree to resolve disputes through binding
        arbitration rather than in court.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        [Your Website/App Name] shall not be liable for any indirect,
        incidental, or consequential damages resulting from your use of our
        services.
      </p>

      <h2>7. Modification of Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. We will notify
        users of any significant changes via email or through a notice on our
        website.
      </p>

      <h2>8. Contact Information</h2>
      <p>
        If you have any questions about these Terms, please contact us at:{" "}
        <br />
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

export default TermsOfService;
