import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
  FaArrowLeft,
} from "react-icons/fa";
import "./login.css";
import API_URL from './config';

const SignInApp = ({onBack, onRegisterClick, onLoginSuccess}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the JWT token and user info
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("user", JSON.stringify(result.user));
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setErrorMessage(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Cannot connect to the server. Make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpRedirect = () => {
    if(onRegisterClick) onRegisterClick();
    // window.location.href = "/register.html"; // Redirect to register page
  };

  return (
      <div className="auth-container">
        <div className="auth-card">
          <button className="back-button" onClick={onBack}>
            <FaArrowLeft /> Back
          </button>
          
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your learning journey</p>
          </div>


          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email ID</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="input-field"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {errorMessage && (
              <div style={{
                background: 'rgba(231, 76, 60, 0.1)',
                border: '1px solid rgba(231, 76, 60, 0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#e74c3c',
                fontSize: '0.9rem',
                marginBottom: '12px',
                textAlign: 'center'
              }}>
                {errorMessage}
              </div>
            )}

            <div className="auth-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          <div className="social-auth">
            <button className="social-btn google">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  fill="#4285F4"
                  d="M16.51 7.39H9.18v3.34h4.23c-.18 1.06-.67 1.87-1.44 2.44-.77.57-1.78.86-3.06.86-2.35 0-4.35-1.58-5.06-3.74-.35-.98-.35-2.06 0-3.04.71-2.16 2.71-3.74 5.06-3.74 1.34 0 2.46.45 3.33 1.33l2.26-2.26C13.8 1.18 11.89.5 9.18.5c-2.37 0-4.5.9-6.12 2.38C1.44 4.36.5 6.56.5 9s.94 4.64 2.56 6.12c1.62 1.48 3.75 2.38 6.12 2.38 2.37 0 4.5-.9 6.12-2.38 1.62-1.48 2.56-3.68 2.56-6.12 0-.64-.06-1.12-.15-1.61z"
                />
              </svg>
              Google
            </button>
            <button className="social-btn facebook">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  fill="#4267B2"
                  d="M17 9a8 8 0 10-9.25 7.9v-5.6H5.44V9h2.31V7.02c0-2.32 1.35-3.6 3.41-3.6.99 0 1.84.07 2.12.1v2.43h-1.46c-1.13 0-1.35.54-1.35 1.32V9h2.69l-.43 2.3h-2.26V16.9A8 8 0 0017 9z"
                />
              </svg>
              Facebook
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <button
                className="auth-mode-toggle"
                onClick={handleSignUpRedirect}
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
  );
};

export default SignInApp;